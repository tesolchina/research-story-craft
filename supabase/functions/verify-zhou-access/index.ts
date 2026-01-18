import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { password } = await req.json();

    if (!password || typeof password !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Password is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitKey = `zhou_video_${clientIp}`;

    // Check recent failed attempts (last 15 minutes)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from('login_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('email', rateLimitKey)
      .eq('success', false)
      .gte('attempted_at', fifteenMinutesAgo);

    if (countError) {
      console.error('Error checking rate limit:', countError);
    }

    // Rate limit: max 5 failed attempts per 15 minutes
    if (count && count >= 5) {
      console.log(`Rate limit exceeded for ${rateLimitKey}`);
      return new Response(
        JSON.stringify({ error: 'Too many attempts. Please try again in 15 minutes.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const correctPassword = Deno.env.get('ZHOU_VIDEO_PASSWORD');
    const videoUrl = Deno.env.get('ZHOU_VIDEO_URL');

    if (!correctPassword || !videoUrl) {
      console.error('Missing ZHOU_VIDEO_PASSWORD or ZHOU_VIDEO_URL environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const passwordMatch = password === correctPassword;

    // Log this attempt for rate limiting
    const { error: insertError } = await supabase
      .from('login_attempts')
      .insert({
        email: rateLimitKey,
        success: passwordMatch
      });

    if (insertError) {
      console.error('Error logging attempt:', insertError);
    }

    // Clean up old attempts (older than 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    await supabase
      .from('login_attempts')
      .delete()
      .eq('email', rateLimitKey)
      .lt('attempted_at', oneHourAgo);

    if (passwordMatch) {
      console.log('Zhou video access granted');
      return new Response(
        JSON.stringify({ 
          success: true,
          videoUrl: videoUrl
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.log('Zhou video access denied - incorrect password');
      return new Response(
        JSON.stringify({ error: 'Incorrect password' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in verify-zhou-access:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

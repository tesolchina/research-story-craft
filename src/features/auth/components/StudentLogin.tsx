import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

interface StudentLoginProps {
  onLogin: (uniqueId: string) => void;
  onBack: () => void;
}

export function StudentLogin({ onLogin, onBack }: StudentLoginProps) {
  const [uniqueId, setUniqueId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!uniqueId.trim()) {
      setError('Please enter your unique ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await supabase
        .from('mccp_students' as any)
        .select('unique_id')
        .eq('unique_id', uniqueId.toUpperCase().trim())
        .single();

      if (fetchError || !data) {
        setError('Invalid ID. Please check your unique ID and try again.');
        return;
      }

      onLogin((data as any).unique_id);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatInput = (value: string) => {
    // Remove non-alphanumeric except hyphens
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    return cleaned;
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="text-muted-foreground">
          Enter your unique ID to continue
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="unique-id">Unique ID</Label>
          <Input
            id="unique-id"
            value={uniqueId}
            onChange={(e) => setUniqueId(formatInput(e.target.value))}
            placeholder="e.g., 1979-SW-3W"
            className="text-center font-mono text-lg"
          />
          <p className="text-xs text-muted-foreground text-center">
            Format: XXXX-XX-XX (e.g., 1979-SW-3W)
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          className="w-full" 
          onClick={handleLogin}
          disabled={isLoading || !uniqueId.trim()}
        >
          {isLoading ? 'Verifying...' : 'Sign In'}
        </Button>
      </div>
    </div>
  );
}

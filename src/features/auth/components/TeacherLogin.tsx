import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

interface TeacherLoginProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

export function TeacherLogin({ onLogin, onBack }: TeacherLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.rpc('verify_teacher_login', {
        p_email: email.toLowerCase().trim(),
        p_password: password
      });

      if (loginError) {
        if (loginError.message.includes('Too many login attempts')) {
          setError('Too many login attempts. Please try again in 15 minutes.');
        } else {
          setError('Invalid email or password');
        }
        return;
      }

      if (!data) {
        setError('Invalid email or password');
        return;
      }

      onLogin(email.toLowerCase().trim());
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Teacher Sign In</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access teaching tools
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="your.email@university.edu"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          className="w-full" 
          onClick={handleLogin}
          disabled={isLoading || !email.trim() || !password.trim()}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, Copy, Check, AlertTriangle, Shield, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StudentRegistrationProps {
  onComplete: (uniqueId: string) => void;
  onBack: () => void;
}

interface MCCPStudentInsert {
  unique_id: string;
  last_4_digits: string;
  first_initial: string;
  last_initial: string;
  section: string | null;
  display_name: string;
}

export function StudentRegistration({ onComplete, onBack }: StudentRegistrationProps) {
  const [step, setStep] = useState(1);
  const [last4Digits, setLast4Digits] = useState('');
  const [firstInitial, setFirstInitial] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [section, setSection] = useState('');
  const [generatedId, setGeneratedId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomSuffix = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars.charAt(Math.floor(Math.random() * chars.length)) + 
           chars.charAt(Math.floor(Math.random() * chars.length));
  };

  const handleStep1Continue = () => {
    if (last4Digits.length === 4) {
      setStep(2);
    }
  };

  const handleStep2Continue = () => {
    if (firstInitial && lastInitial) {
      setStep(3);
    }
  };

  const insertStudent = async (data: MCCPStudentInsert) => {
    const { error } = await supabase
      .from('mccp_students' as any)
      .insert(data as any);
    return { error };
  };

  const handleGenerateId = async () => {
    setIsLoading(true);
    const suffix = generateRandomSuffix();
    const uniqueId = `${last4Digits}-${firstInitial.toUpperCase()}${lastInitial.toUpperCase()}-${suffix}`;
    
    try {
      const studentData: MCCPStudentInsert = {
        unique_id: uniqueId,
        last_4_digits: last4Digits,
        first_initial: firstInitial.toUpperCase(),
        last_initial: lastInitial.toUpperCase(),
        section: section || null,
        display_name: `${firstInitial.toUpperCase()}${lastInitial.toUpperCase()}`
      };

      const { error } = await insertStudent(studentData);

      if (error) {
        if (error.code === '23505') {
          // Duplicate, try again with new suffix
          const newSuffix = generateRandomSuffix();
          const newUniqueId = `${last4Digits}-${firstInitial.toUpperCase()}${lastInitial.toUpperCase()}-${newSuffix}`;
          
          const { error: retryError } = await insertStudent({
            ...studentData,
            unique_id: newUniqueId
          });
          
          if (retryError) throw retryError;
          setGeneratedId(newUniqueId);
        } else {
          throw error;
        }
      } else {
        setGeneratedId(uniqueId);
      }
      setStep(4);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(generatedId);
    setCopied(true);
    toast.success('ID copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    onComplete(generatedId);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 w-8 rounded-full transition-colors ${
              s <= step ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Step 1 of 3</p>
            <h1 className="text-2xl font-bold">Enter Student ID</h1>
            <p className="text-muted-foreground">
              Enter the <strong>last 4 digits</strong> of your student ID
            </p>
          </div>

          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={last4Digits}
              onChange={setLast4Digits}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Privacy Warning</AlertTitle>
            <AlertDescription>
              Only enter the last 4 digits - do NOT enter your full student ID for privacy protection.
            </AlertDescription>
          </Alert>

          <Button 
            className="w-full" 
            onClick={handleStep1Continue}
            disabled={last4Digits.length !== 4}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Step 2 of 3</p>
            <h1 className="text-2xl font-bold">Enter Your Initials</h1>
            <p className="text-muted-foreground">
              Enter the first letter of your first and last name
            </p>
            <p className="text-sm text-muted-foreground italic">
              Example: If your name is <strong>Yuxing Chen</strong>, enter <strong>Y</strong> and <strong>C</strong>
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-initial">First Name Initial</Label>
              <Input
                id="first-initial"
                maxLength={1}
                value={firstInitial}
                onChange={(e) => setFirstInitial(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                className="w-20 text-center text-2xl font-bold uppercase"
                placeholder="Y"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-initial">Last Name Initial</Label>
              <Input
                id="last-initial"
                maxLength={1}
                value={lastInitial}
                onChange={(e) => setLastInitial(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                className="w-20 text-center text-2xl font-bold uppercase"
                placeholder="C"
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleStep2Continue}
            disabled={!firstInitial || !lastInitial}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Step 3 of 3</p>
            <h1 className="text-2xl font-bold">Section (Optional)</h1>
            <p className="text-muted-foreground">
              Enter your class section if applicable
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Input
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value.toUpperCase())}
              placeholder="e.g., A01, B02"
              className="text-center"
            />
          </div>

          <Button 
            className="w-full" 
            onClick={handleGenerateId}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate My Unique ID'}
          </Button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-primary">Registration Complete!</h1>
            <p className="text-muted-foreground">
              Your unique ID has been generated
            </p>
          </div>

          <div className="p-6 bg-muted rounded-lg text-center space-y-4">
            <p className="text-sm text-muted-foreground">Your Unique ID</p>
            <p className="text-3xl font-mono font-bold tracking-wider">{generatedId}</p>
            <Button variant="outline" onClick={handleCopyId} className="gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy ID'}
            </Button>
          </div>

          <Alert className="bg-amber-500/10 border-amber-500/20">
            <Camera className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-500">Remember Your ID!</AlertTitle>
            <AlertDescription>
              Please take a screenshot or write down your ID. You will need it to log in next time.
            </AlertDescription>
          </Alert>

          <Alert className="bg-blue-500/10 border-blue-500/20">
            <AlertTriangle className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-500">Beta Mode</AlertTitle>
            <AlertDescription>
              This system is in beta. Please keep a backup of important work outside this platform.
            </AlertDescription>
          </Alert>

          <Alert className="bg-green-500/10 border-green-500/20">
            <Shield className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-500">Privacy Notice</AlertTitle>
            <AlertDescription>
              We only store the last 4 digits of your student ID to protect your privacy.
            </AlertDescription>
          </Alert>

          <Button className="w-full" onClick={handleComplete}>
            Continue to MCCP6020
          </Button>
        </div>
      )}
    </div>
  );
}

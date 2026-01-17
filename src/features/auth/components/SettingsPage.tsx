import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const AVATAR_OPTIONS = [
  '🎓', '📚', '✨', '🌟', '💡', '🎯', '🚀', '🌈',
  '🦊', '🐼', '🦋', '🌸', '🍀', '🌻', '🎨', '🎭'
];

export function SettingsPage() {
  const navigate = useNavigate();
  const { userType, studentId, teacherEmail, refreshStudentData, avatarEmoji } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarEmoji);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!studentId && !teacherEmail) {
      navigate('/mccp/auth');
      return;
    }

    const loadUserData = async () => {
      setIsLoading(true);
      try {
        if (userType === 'student' && studentId) {
          const { data, error } = await supabase
            .from('mccp_students' as any)
            .select('display_name, avatar_url')
            .eq('unique_id', studentId)
            .single();

          if (!error && data) {
            const studentData = data as any;
            setDisplayName(studentData.display_name || '');
            setSelectedAvatar(studentData.avatar_url || '🎓');
          }
        } else if (userType === 'teacher') {
          setDisplayName('Dr. Simon Wang');
          setSelectedAvatar('👨‍🏫');
        }
      } catch (err) {
        console.error('Error loading user data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [studentId, teacherEmail, userType, navigate]);

  const handleSave = async () => {
    if (userType !== 'student' || !studentId) {
      toast.info('Teacher profiles cannot be edited.');
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('mccp_students' as any)
        .update({
          display_name: displayName,
          avatar_url: selectedAvatar
        } as any)
        .eq('unique_id', studentId);

      if (error) throw error;
      
      await refreshStudentData();
      toast.success('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate('/mccp')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to MCCP6020
      </Button>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>

      {/* ID Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Your ID
          </CardTitle>
          <CardDescription>
            This is your unique identifier for MCCP6020
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="font-mono text-2xl font-bold tracking-wider">
              {userType === 'student' ? studentId : teacherEmail}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {userType === 'teacher' ? 'Teacher' : 'Student'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Display Name */}
      <Card>
        <CardHeader>
          <CardTitle>Display Name</CardTitle>
          <CardDescription>
            How you'll appear in discussions and activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="display-name">Name</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              disabled={userType === 'teacher'}
            />
          </div>
        </CardContent>
      </Card>

      {/* Avatar Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            Choose an avatar to represent you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 text-2xl">
              <AvatarFallback>{selectedAvatar || '🎓'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Current Avatar</p>
              <p className="text-sm text-muted-foreground">
                Select a new avatar below
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-8 gap-2">
            {AVATAR_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedAvatar(emoji)}
                disabled={userType === 'teacher'}
                className={`p-3 text-2xl rounded-lg transition-colors hover:bg-muted ${
                  selectedAvatar === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-muted/50'
                } ${userType === 'teacher' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      {userType === 'student' && (
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full gap-2"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../context/AuthContext';

export function UserMenu() {
  const navigate = useNavigate();
  const { 
    isAuthenticated, 
    isLoading, 
    userType, 
    studentId, 
    teacherEmail,
    displayName,
    avatarEmoji,
    signOut 
  } = useAuth();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="h-10 w-24 bg-muted animate-pulse rounded-md" />
    );
  }

  if (!isAuthenticated) {
    return (
      <Button onClick={() => navigate('/mccp/auth')} variant="outline">
        Sign In
      </Button>
    );
  }

  const handleSignOut = () => {
    setOpen(false);
    signOut();
    navigate('/mccp/auth');
  };

  const handleSettings = () => {
    setOpen(false);
    navigate('/mccp/settings');
  };

  const displayId = userType === 'student' ? studentId : teacherEmail;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 h-auto py-2 px-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-lg">{avatarEmoji}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs text-muted-foreground">ID: {displayId}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-xl">{avatarEmoji}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground font-mono">{displayId}</p>
              </div>
            </div>
            <Badge variant="secondary" className="w-fit">
              {userType === 'teacher' ? 'Teacher' : 'Student'}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

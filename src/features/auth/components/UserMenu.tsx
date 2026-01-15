import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/authUtils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function UserMenu() {
  const { user, profile, roles, isLoading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!user) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link to="/mccp/auth">Sign In</Link>
      </Button>
    );
  }

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'User';
  const initials = getInitials(profile?.display_name, user.email);
  const primaryRole = roles[0] || 'student';

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium">
            {displayName}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <div className="pt-1">
              <Badge variant="secondary" className="text-xs capitalize">
                {primaryRole}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/mccp/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(72, 'Password must be less than 72 characters');

export const displayNameSchema = z
  .string()
  .min(2, 'Display name must be at least 2 characters')
  .max(50, 'Display name must be less than 50 characters')
  .optional();

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  displayName: displayNameSchema,
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

export function getAuthErrorMessage(error: Error): string {
  const message = error.message.toLowerCase();

  if (message.includes('invalid login credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  if (message.includes('email not confirmed')) {
    return 'Please check your email and confirm your account before signing in.';
  }
  if (message.includes('user already registered')) {
    return 'An account with this email already exists. Please sign in instead.';
  }
  if (message.includes('password')) {
    return 'Password must be at least 6 characters long.';
  }
  if (message.includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (message.includes('network')) {
    return 'Network error. Please check your connection and try again.';
  }

  return error.message || 'An unexpected error occurred. Please try again.';
}

export function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name) {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return 'U';
}

// Context and Provider
export { AuthProvider, useAuth } from './context/AuthContext';

// Components
export { UserMenu } from './components/UserMenu';
export { AuthPage } from './components/AuthPage';
export { RoleSelection } from './components/RoleSelection';
export { StudentAccess } from './components/StudentAccess';
export { StudentRegistration } from './components/StudentRegistration';
export { StudentLogin } from './components/StudentLogin';
export { TeacherLogin } from './components/TeacherLogin';
export { SettingsPage } from './components/SettingsPage';

// Utils
export {
  signInSchema,
  signUpSchema,
  getAuthErrorMessage,
  getInitials,
} from './utils/authUtils';
export type { SignInFormData, SignUpFormData } from './utils/authUtils';

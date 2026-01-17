import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { RoleSelection } from './RoleSelection';
import { StudentAccess } from './StudentAccess';
import { StudentRegistration } from './StudentRegistration';
import { StudentLogin } from './StudentLogin';
import { TeacherLogin } from './TeacherLogin';
import { useAuth } from '../context/AuthContext';

type AuthStep = 
  | 'role-selection'
  | 'student-access'
  | 'student-registration'
  | 'student-login'
  | 'teacher-login';

export function AuthPage() {
  const [step, setStep] = useState<AuthStep>('role-selection');
  const navigate = useNavigate();
  const { loginAsStudent, loginAsTeacher, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/mccp');
    return null;
  }

  const handleRoleSelect = (role: 'teacher' | 'student') => {
    if (role === 'teacher') {
      setStep('teacher-login');
    } else {
      setStep('student-access');
    }
  };

  const handleStudentAccessSelect = (access: 'returning' | 'new') => {
    if (access === 'returning') {
      setStep('student-login');
    } else {
      setStep('student-registration');
    }
  };

  const handleStudentRegistrationComplete = async (uniqueId: string) => {
    await loginAsStudent(uniqueId);
    navigate('/mccp');
  };

  const handleStudentLogin = async (uniqueId: string) => {
    await loginAsStudent(uniqueId);
    navigate('/mccp');
  };

  const handleTeacherLogin = (email: string) => {
    loginAsTeacher(email);
    navigate('/mccp');
  };

  const handleBackToRoleSelection = () => {
    setStep('role-selection');
  };

  const handleBackToStudentAccess = () => {
    setStep('student-access');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2">
          <CardContent className="pt-6">
            {step === 'role-selection' && (
              <RoleSelection onSelectRole={handleRoleSelect} />
            )}
            
            {step === 'student-access' && (
              <StudentAccess 
                onSelectAccess={handleStudentAccessSelect}
                onBack={handleBackToRoleSelection}
              />
            )}
            
            {step === 'student-registration' && (
              <StudentRegistration
                onComplete={handleStudentRegistrationComplete}
                onBack={handleBackToStudentAccess}
              />
            )}
            
            {step === 'student-login' && (
              <StudentLogin
                onLogin={handleStudentLogin}
                onBack={handleBackToStudentAccess}
              />
            )}
            
            {step === 'teacher-login' && (
              <TeacherLogin
                onLogin={handleTeacherLogin}
                onBack={handleBackToRoleSelection}
              />
            )}
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          MCCP6020 • Advanced EAP • Spring 2026
        </p>
      </div>
    </div>
  );
}

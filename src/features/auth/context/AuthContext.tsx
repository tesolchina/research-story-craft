import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type UserType = 'student' | 'teacher' | null;

interface MCCPStudent {
  unique_id: string;
  display_name: string | null;
  avatar_url: string | null;
  section: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userType: UserType;
  studentId: string | null;
  teacherEmail: string | null;
  studentData: MCCPStudent | null;
  loginAsStudent: (uniqueId: string) => Promise<void>;
  loginAsTeacher: (email: string) => void;
  signOut: () => void;
  refreshStudentData: () => Promise<void>;
  isAuthenticated: boolean;
  displayName: string;
  avatarEmoji: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<UserType>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [teacherEmail, setTeacherEmail] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<MCCPStudent | null>(null);

  useEffect(() => {
    const storedStudentId = localStorage.getItem('mccp_student_id');
    const storedTeacherEmail = localStorage.getItem('mccp_teacher_email');
    const storedUserType = localStorage.getItem('mccp_user_type') as UserType;
    
    if (storedUserType === 'student' && storedStudentId) {
      setUserType('student');
      setStudentId(storedStudentId);
      fetchStudentData(storedStudentId);
    } else if (storedUserType === 'teacher' && storedTeacherEmail) {
      setUserType('teacher');
      setTeacherEmail(storedTeacherEmail);
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchStudentData = async (uniqueId: string) => {
    try {
      const { data, error } = await (supabase
        .from('mccp_students' as any)
        .select('unique_id, display_name, avatar_url, section')
        .eq('unique_id', uniqueId)
        .single() as any);

      if (!error && data) {
        setStudentData(data as MCCPStudent);
      }
    } catch (err) {
      console.error('Error fetching student data:', err);
    }
  };

  const refreshStudentData = useCallback(async () => {
    if (studentId) {
      await fetchStudentData(studentId);
    }
  }, [studentId]);

  const loginAsStudent = async (uniqueId: string) => {
    localStorage.setItem('mccp_student_id', uniqueId);
    localStorage.setItem('mccp_user_type', 'student');
    localStorage.removeItem('mccp_teacher_email');
    setStudentId(uniqueId);
    setUserType('student');
    setTeacherEmail(null);
    await fetchStudentData(uniqueId);
  };

  const loginAsTeacher = (email: string) => {
    localStorage.setItem('mccp_teacher_email', email);
    localStorage.setItem('mccp_user_type', 'teacher');
    localStorage.removeItem('mccp_student_id');
    setTeacherEmail(email);
    setUserType('teacher');
    setStudentId(null);
    setStudentData(null);
  };

  const signOut = () => {
    localStorage.removeItem('mccp_student_id');
    localStorage.removeItem('mccp_teacher_email');
    localStorage.removeItem('mccp_user_type');
    setStudentId(null);
    setTeacherEmail(null);
    setUserType(null);
    setStudentData(null);
    supabase.auth.signOut();
  };

  const isAuthenticated = userType !== null;
  const displayName = userType === 'teacher' 
    ? 'Dr. Simon Wang'
    : studentData?.display_name || studentId || '';
  const avatarEmoji = userType === 'teacher'
    ? '👨‍🏫'
    : studentData?.avatar_url || '🎓';

  return (
    <AuthContext.Provider
      value={{
        user, session, isLoading, userType, studentId, teacherEmail, studentData,
        loginAsStudent, loginAsTeacher, signOut, refreshStudentData,
        isAuthenticated, displayName, avatarEmoji,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cars_coach_sessions: {
        Row: {
          chat_history: Json | null
          completed_at: string | null
          created_at: string | null
          current_phase: string
          discipline: string
          id: string
          learning_report: Json | null
          mc_responses: Json | null
          paragraph_analysis: Json | null
          short_answers: Json | null
          started_at: string | null
          student_id: string
          tasks_completed: Json | null
          updated_at: string | null
        }
        Insert: {
          chat_history?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_phase?: string
          discipline: string
          id?: string
          learning_report?: Json | null
          mc_responses?: Json | null
          paragraph_analysis?: Json | null
          short_answers?: Json | null
          started_at?: string | null
          student_id: string
          tasks_completed?: Json | null
          updated_at?: string | null
        }
        Update: {
          chat_history?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_phase?: string
          discipline?: string
          id?: string
          learning_report?: Json | null
          mc_responses?: Json | null
          paragraph_analysis?: Json | null
          short_answers?: Json | null
          started_at?: string | null
          student_id?: string
          tasks_completed?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_queued: boolean
          sender_id: string | null
          sender_name: string
          sender_type: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_queued?: boolean
          sender_id?: string | null
          sender_name: string
          sender_type: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_queued?: boolean
          sender_id?: string | null
          sender_name?: string
          sender_type?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_participants: {
        Row: {
          display_name: string
          id: string
          is_teacher: boolean
          joined_at: string
          left_at: string | null
          session_id: string
          student_id: string
        }
        Insert: {
          display_name: string
          id?: string
          is_teacher?: boolean
          joined_at?: string
          left_at?: string | null
          session_id: string
          student_id: string
        }
        Update: {
          display_name?: string
          id?: string
          is_teacher?: boolean
          joined_at?: string
          left_at?: string | null
          session_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          agenda: Json | null
          context_prompt: string | null
          created_at: string
          created_by: string
          ended_at: string | null
          id: string
          is_student_led: boolean
          max_participants: number
          status: string
          topic: string
        }
        Insert: {
          agenda?: Json | null
          context_prompt?: string | null
          created_at?: string
          created_by: string
          ended_at?: string | null
          id?: string
          is_student_led?: boolean
          max_participants?: number
          status?: string
          topic: string
        }
        Update: {
          agenda?: Json | null
          context_prompt?: string | null
          created_at?: string
          created_by?: string
          ended_at?: string | null
          id?: string
          is_student_led?: boolean
          max_participants?: number
          status?: string
          topic?: string
        }
        Relationships: []
      }
      discussions: {
        Row: {
          created_at: string
          id: string
          is_teacher: boolean | null
          message: string
          parent_id: string | null
          section_id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_teacher?: boolean | null
          message: string
          parent_id?: string | null
          section_id: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_teacher?: boolean | null
          message?: string
          parent_id?: string | null
          section_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          attempted_at: string
          email: string
          id: string
          success: boolean
        }
        Insert: {
          attempted_at?: string
          email: string
          id?: string
          success?: boolean
        }
        Update: {
          attempted_at?: string
          email?: string
          id?: string
          success?: boolean
        }
        Relationships: []
      }
      mccp_students: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          first_initial: string
          id: string
          last_4_digits: string
          last_initial: string
          section: string | null
          unique_id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          first_initial: string
          id?: string
          last_4_digits: string
          last_initial: string
          section?: string | null
          unique_id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          first_initial?: string
          id?: string
          last_4_digits?: string
          last_initial?: string
          section?: string | null
          unique_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      student_insights: {
        Row: {
          category: string
          created_at: string | null
          id: string
          insight_text: string
          is_applied: boolean | null
          source_session_id: string | null
          source_task: string
          student_id: string
          student_notes: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          insight_text: string
          is_applied?: boolean | null
          source_session_id?: string | null
          source_task: string
          student_id: string
          student_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          insight_text?: string
          is_applied?: boolean | null
          source_session_id?: string | null
          source_task?: string
          student_id?: string
          student_notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_insights_source_session_id_fkey"
            columns: ["source_session_id"]
            isOneToOne: false
            referencedRelation: "cars_coach_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      student_pseudonyms: {
        Row: {
          created_at: string
          id: string
          last_4_digits: string
          pseudonym: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_4_digits: string
          pseudonym: string
        }
        Update: {
          created_at?: string
          id?: string
          last_4_digits?: string
          pseudonym?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string | null
          id: string
          name: string
          student_code: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          student_code: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          student_code?: string
        }
        Relationships: []
      }
      students_progress: {
        Row: {
          ai_feedback: string | null
          answer: Json | null
          created_at: string
          id: string
          is_correct: boolean | null
          score: number | null
          student_id: string
          task_id: string
          task_type: string
          updated_at: string
        }
        Insert: {
          ai_feedback?: string | null
          answer?: Json | null
          created_at?: string
          id?: string
          is_correct?: boolean | null
          score?: number | null
          student_id: string
          task_id: string
          task_type: string
          updated_at?: string
        }
        Update: {
          ai_feedback?: string | null
          answer?: Json | null
          created_at?: string
          id?: string
          is_correct?: boolean | null
          score?: number | null
          student_id?: string
          task_id?: string
          task_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          ai_frequency: number
          ai_tools_used: string
          ai_wishlist: string
          created_at: string
          field_of_study: string
          helpful_stages: string[]
          id: string
          student_id: string
          updated_at: string
          workflow_description: string
        }
        Insert: {
          ai_frequency: number
          ai_tools_used: string
          ai_wishlist: string
          created_at?: string
          field_of_study: string
          helpful_stages?: string[]
          id?: string
          student_id: string
          updated_at?: string
          workflow_description: string
        }
        Update: {
          ai_frequency?: number
          ai_tools_used?: string
          ai_wishlist?: string
          created_at?: string
          field_of_study?: string
          helpful_stages?: string[]
          id?: string
          student_id?: string
          updated_at?: string
          workflow_description?: string
        }
        Relationships: []
      }
      teacher_credentials: {
        Row: {
          created_at: string
          email: string
          id: string
          password_hash: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password_hash: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_student_names_for_discussions: {
        Args: { p_student_ids: string[] }
        Returns: {
          name: string
          student_code: string
        }[]
      }
      get_teacher_dashboard_data: {
        Args: { p_email: string; p_password: string }
        Returns: {
          ai_feedback: string
          answer: Json
          is_correct: boolean
          last_4_digits: string
          pseudonym: string
          score: number
          student_id: string
          task_id: string
          task_type: string
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_valid_student_code: {
        Args: { p_student_code: string }
        Returns: boolean
      }
      verify_teacher_login: {
        Args: { p_email: string; p_password: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "teacher" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher", "student"],
    },
  },
} as const

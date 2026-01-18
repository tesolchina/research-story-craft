export interface ChatSession {
  id: string;
  created_by: string;
  topic: string;
  agenda: string[];
  context_prompt: string | null;
  status: 'active' | 'paused' | 'ended';
  is_student_led: boolean;
  max_participants: number;
  created_at: string;
  ended_at: string | null;
}

// Context window constants (characters, approximate)
export const CONTEXT_WINDOW_MAX = 8000; // ~2000 tokens worth of context
export const CONTEXT_WARNING_THRESHOLD = 0.75; // 75% usage shows warning

export interface ChatMessage {
  id: string;
  session_id: string;
  sender_type: 'student' | 'teacher' | 'ai_expert' | 'ai_peer_john' | 'ai_peer_karen';
  sender_id: string | null;
  sender_name: string;
  content: string;
  is_queued: boolean;
  created_at: string;
}

export interface ChatParticipant {
  id: string;
  session_id: string;
  student_id: string;
  display_name: string;
  is_teacher: boolean;
  joined_at: string;
  left_at: string | null;
}

export type AIPersona = 'ai_expert' | 'ai_peer_john' | 'ai_peer_karen';

export const AI_PERSONA_INFO: Record<AIPersona, { name: string; title: string; avatar: string; color: string; mention: string }> = {
  ai_expert: {
    name: 'Dr Cooper',
    title: 'Research Expert',
    avatar: '👩‍🔬',
    color: 'text-purple-600',
    mention: '@DrCooper'
  },
  ai_peer_john: {
    name: 'John',
    title: 'Motivated Peer',
    avatar: '👨‍🎓',
    color: 'text-blue-600',
    mention: '@John'
  },
  ai_peer_karen: {
    name: 'Karen',
    title: 'Thoughtful Peer',
    avatar: '👩‍🎓',
    color: 'text-green-600',
    mention: '@Karen'
  }
};

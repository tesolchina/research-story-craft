import { supabase } from "@/integrations/supabase/client";

interface SurveyResponse {
  student_id: string;
  field_of_study: string;
  ai_frequency: number;
  ai_tools_used: string;
  helpful_stages: string[];
  workflow_description: string;
  ai_wishlist: string;
  created_at: string;
  updated_at: string;
}

interface StudentPseudonym {
  last_4_digits: string;
  pseudonym: string;
}

export async function fetchSurveyResponses(): Promise<{
  responses: SurveyResponse[];
  pseudonyms: Map<string, string>;
}> {
  // Fetch survey responses
  const { data: surveyData, error: surveyError } = await supabase
    .from('survey_responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (surveyError) {
    console.error('Error fetching survey responses:', surveyError);
    throw surveyError;
  }

  // Fetch pseudonyms for anonymization
  const { data: pseudonymData, error: pseudonymError } = await supabase
    .from('student_pseudonyms')
    .select('last_4_digits, pseudonym');

  if (pseudonymError) {
    console.error('Error fetching pseudonyms:', pseudonymError);
    throw pseudonymError;
  }

  const pseudonyms = new Map<string, string>();
  (pseudonymData as StudentPseudonym[])?.forEach((p) => {
    pseudonyms.set(p.last_4_digits, p.pseudonym);
  });

  return {
    responses: surveyData as SurveyResponse[],
    pseudonyms,
  };
}

export function convertSurveyToCSV(
  responses: SurveyResponse[],
  pseudonyms: Map<string, string>
): string {
  const headers = [
    'Pseudonym',
    'Student ID (Last 4)',
    'Discipline',
    'AI Frequency (1-5)',
    'AI Tools Used',
    'Helpful Stages',
    'Workflow Description',
    'AI Wishlist',
    'Submitted At',
  ];

  const escapeCSV = (value: string): string => {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const rows = responses.map((r) => [
    escapeCSV(pseudonyms.get(r.student_id) || 'Unknown'),
    escapeCSV(r.student_id),
    escapeCSV(r.field_of_study || ''),
    String(r.ai_frequency),
    escapeCSV(r.ai_tools_used || ''),
    escapeCSV(Array.isArray(r.helpful_stages) ? r.helpful_stages.join('; ') : ''),
    escapeCSV(r.workflow_description || ''),
    escapeCSV(r.ai_wishlist || ''),
    escapeCSV(new Date(r.created_at).toISOString()),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export async function exportSurveyResponsesAsCSV(): Promise<void> {
  const { responses, pseudonyms } = await fetchSurveyResponses();
  
  if (responses.length === 0) {
    throw new Error('No survey responses to export');
  }
  
  const csvContent = convertSurveyToCSV(responses, pseudonyms);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `survey_responses_${timestamp}.csv`;
  
  downloadCSV(csvContent, filename);
}

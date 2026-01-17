import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

interface SurveyResponse {
  id: string;
  student_id: string;
  field_of_study: string;
  ai_frequency: number;
  ai_tools_used: string;
  helpful_stages: string[];
  workflow_description: string;
  ai_wishlist: string;
  created_at: string;
}

const STAGE_LABELS: Record<string, string> = {
  brainstorming: 'Brainstorming',
  literature: 'Literature Review',
  drafting: 'Drafting',
  editing: 'Editing',
  translating: 'Translating',
  coding: 'Coding/Data',
  citation: 'Citation',
};

export function SurveyDashboard() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const userType = localStorage.getItem('mccp_user_type');

  useEffect(() => {
    if (userType !== 'teacher') {
      navigate('/mccp/auth');
      return;
    }
    fetchResponses();
  }, [userType, navigate]);

  const fetchResponses = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error: fetchError } = await (supabase
        .from('survey_responses' as any)
        .select('*')
        .order('created_at', { ascending: false }) as any);

      if (fetchError) throw fetchError;
      setResponses((data as SurveyResponse[]) || []);
    } catch (err) {
      console.error('Error fetching survey responses:', err);
      setError('Failed to load survey responses');
    } finally {
      setIsLoading(false);
    }
  };

  const getFrequencyLabel = (freq: number) => {
    const labels = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];
    return labels[freq - 1] || freq.toString();
  };

  const getFrequencyColor = (freq: number) => {
    if (freq <= 2) return 'bg-red-100 text-red-800';
    if (freq === 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const calculateStats = () => {
    if (responses.length === 0) return null;

    const avgFrequency = responses.reduce((sum, r) => sum + r.ai_frequency, 0) / responses.length;
    
    const stageCounts: Record<string, number> = {};
    responses.forEach(r => {
      r.helpful_stages.forEach(stage => {
        const cleanStage = stage.startsWith('other:') ? 'other' : stage;
        stageCounts[cleanStage] = (stageCounts[cleanStage] || 0) + 1;
      });
    });

    const topStages = Object.entries(stageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return { avgFrequency, stageCounts, topStages };
  };

  const exportToCSV = () => {
    const headers = ['Student ID', 'Field of Study', 'AI Frequency', 'AI Tools', 'Helpful Stages', 'Workflow', 'AI Wishlist', 'Submitted At'];
    const rows = responses.map(r => [
      r.student_id,
      r.field_of_study,
      r.ai_frequency.toString(),
      r.ai_tools_used,
      r.helpful_stages.join('; '),
      r.workflow_description,
      r.ai_wishlist,
      new Date(r.created_at).toLocaleString()
    ]);

    const csv = [headers, ...rows].map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey_responses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = calculateStats();

  if (userType !== 'teacher') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Survey Responses Dashboard
          </h2>
          <p className="text-muted-foreground">
            View and analyze student survey responses on AI-Collaborative Academic Writing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchResponses} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportToCSV} disabled={responses.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Responses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold">{responses.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. AI Usage Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.avgFrequency.toFixed(1)} / 5
              </div>
              <p className="text-sm text-muted-foreground">
                {getFrequencyLabel(Math.round(stats.avgFrequency))}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top Helpful Stages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {stats.topStages.map(([stage, count]) => (
                  <Badge key={stage} variant="secondary">
                    {STAGE_LABELS[stage] || stage} ({count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Responses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Responses</CardTitle>
          <CardDescription>
            {responses.length} student{responses.length !== 1 ? 's' : ''} completed the survey
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : responses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No survey responses yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Student ID</TableHead>
                    <TableHead>Field of Study</TableHead>
                    <TableHead className="text-center">AI Frequency</TableHead>
                    <TableHead>AI Tools</TableHead>
                    <TableHead>Helpful Stages</TableHead>
                    <TableHead>Workflow</TableHead>
                    <TableHead>AI Wishlist</TableHead>
                    <TableHead className="w-[120px]">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {responses.map((response) => (
                    <TableRow key={response.id}>
                      <TableCell className="font-mono text-xs">
                        {response.student_id}
                      </TableCell>
                      <TableCell>{response.field_of_study}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getFrequencyColor(response.ai_frequency)}>
                          {response.ai_frequency}/5
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate" title={response.ai_tools_used}>
                        {response.ai_tools_used}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {response.helpful_stages.slice(0, 3).map((stage, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {STAGE_LABELS[stage] || stage.replace('other: ', '')}
                            </Badge>
                          ))}
                          {response.helpful_stages.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{response.helpful_stages.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={response.workflow_description}>
                        {response.workflow_description}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={response.ai_wishlist}>
                        {response.ai_wishlist}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(response.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

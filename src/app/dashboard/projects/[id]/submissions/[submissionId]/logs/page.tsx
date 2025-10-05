"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase";
import { Json } from "@/lib/database.types";
import { DashboardHeader } from "@/components/dashboard/header";
import { ArrowLeft, Download, RefreshCw, FileText, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'ERROR' | 'WARNING' | 'DEBUG';
  message: string;
  data?: Json;
}

interface Submission {
  id: string;
  created_at: string;
  endpoints?: {
    id: string;
    name: string;
    path: string;
    project_id: string;
    projects?: {
      id: string;
      name: string;
    };
  };
}

export default function SubmissionLogsPage() {
  const { user, loading } = useAuth();
  const params = useParams();
  const { toast } = useToast();
  const projectId = params.id as string;
  const submissionId = params.submissionId as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissionData = useCallback(async () => {
    try {
      // Fetch submission with endpoint and project details
      const { data: submissionData, error: submissionError } = await supabase
        .from("submissions")
        .select(
          `
          id,
          created_at,
          endpoints!submissions_endpoint_id_fkey(
            id,
            name,
            path,
            project_id,
            projects!endpoints_project_id_fkey(
              id,
              name
            )
          )
        `
        )
        .eq("id", submissionId)
        .single();

      if (submissionError || !submissionData) {
        setError("Submission not found");
        return;
      }

      // Verify the submission belongs to the correct project
      if (submissionData.endpoints?.project_id !== projectId) {
        setError("Submission not found");
        return;
      }

      setSubmission(submissionData as Submission);
    } catch (err) {
      console.error("Error fetching submission:", err);
      setError("Failed to load submission");
    }
  }, [submissionId, projectId]);

  const fetchLogs = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError('Authentication required');
        return;
      }

      const response = await fetch(`/api/submissions/${submissionId}/logs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ format: 'json' })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch logs');
      }

      const data = await response.json();
      setLogs(data.logs || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError(err instanceof Error ? err.message : "Failed to load logs");
    }
  }, [submissionId]);

  const refreshLogs = async () => {
    setIsRefreshing(true);
    await fetchLogs();
    setIsRefreshing(false);
    toast({
      title: "Logs refreshed",
      description: "The latest logs have been loaded.",
    });
  };

  const downloadLogs = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to download logs.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(`/api/submissions/${submissionId}/logs`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download logs');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `submission-${submissionId.slice(0, 8)}-logs.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download started",
        description: "The log file is being downloaded.",
      });
    } catch (err) {
      console.error("Error downloading logs:", err);
      toast({
        title: "Download failed",
        description: "Failed to download the log file.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!user || loading) return;

    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchSubmissionData(), fetchLogs()]);
      setIsLoading(false);
    };

    loadData();
  }, [user, loading, fetchSubmissionData, fetchLogs]);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'SUCCESS':
        return 'bg-green-500';
      case 'ERROR':
        return 'bg-red-500';
      case 'WARNING':
        return 'bg-yellow-500';
      case 'DEBUG':
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getLevelBadgeVariant = (level: LogEntry['level']) => {
    switch (level) {
      case 'SUCCESS':
        return 'default';
      case 'ERROR':
        return 'destructive';
      case 'WARNING':
        return 'secondary';
      case 'DEBUG':
        return 'outline';
      default:
        return 'default';
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Loading logs...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || "Submission not found"}
            </h1>
            <Button asChild>
              <Link href={`/dashboard/projects/${projectId}/submissions/${submissionId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Submission
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title={`Logs - ${submission.id.slice(0, 8)}`}
        subtitle={`${submission.endpoints?.projects?.name} / ${submission.endpoints?.name}`}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshLogs}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadLogs}
              disabled={logs.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/dashboard/projects/${projectId}/submissions/${submissionId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Submission
              </Link>
            </Button>
          </div>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-black text-white border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <CardTitle className="text-white">Submission Processing Logs</CardTitle>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{logs.length} log entries</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {logs.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No logs available</p>
                <p className="text-sm">
                  Logs will appear here when the submission is processed with the new logging system.
                </p>
              </div>
            ) : (
              <div className="font-mono text-sm">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`border-l-3 p-4 border-b border-gray-800 last:border-b-0 ${
                      log.level === 'SUCCESS' ? 'border-l-green-500 bg-green-500/5' :
                      log.level === 'ERROR' ? 'border-l-red-500 bg-red-500/5' :
                      log.level === 'WARNING' ? 'border-l-yellow-500 bg-yellow-500/5' :
                      log.level === 'DEBUG' ? 'border-l-purple-500 bg-purple-500/5' :
                      'border-l-blue-500 bg-blue-500/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">
                          {log.timestamp}
                        </span>
                        <Badge
                          variant={getLevelBadgeVariant(log.level)}
                          className={`text-xs ${getLevelColor(log.level)} text-white`}
                        >
                          {log.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-white mb-2">
                      {log.message}
                    </div>
                    {log.data && (
                      <div className="bg-gray-900/50 p-3 rounded border border-gray-700 text-gray-300 text-xs overflow-x-auto">
                        <pre className="whitespace-pre-wrap">
                          {(() => {
                            if (typeof log.data === 'string') {
                              // Try to parse and re-format if it's a JSON string
                              try {
                                const parsed = JSON.parse(log.data);
                                return JSON.stringify(parsed, null, 2);
                              } catch {
                                // If parsing fails, return the string as-is
                                return log.data;
                              }
                            } else {
                              // If it's already an object, stringify it
                              return JSON.stringify(log.data, null, 2);
                            }
                          })()}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
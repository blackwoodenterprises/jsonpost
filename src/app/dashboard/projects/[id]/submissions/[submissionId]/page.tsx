"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  Globe,
  Mail,
  ExternalLink,
  Copy,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";

interface SubmissionData {
  [key: string]: unknown;
}

interface FileUpload {
  id: string;
  original_filename: string;
  stored_filename: string;
  file_path: string;
  file_size_bytes: number;
  mime_type: string;
  storage_bucket: string;
  created_at: string;
}

interface Submission {
  id: string;
  data: SubmissionData;
  ip_address: string;
  user_agent: string;
  created_at: string;
  endpoint_id: string;
  file_uploads?: FileUpload[];
  endpoints: {
    id: string;
    name: string;
    path: string;
    webhook_url: string | null;
    email_notifications: boolean;
    project_id: string;
    projects: {
      id: string;
      name: string;
    };
  };
}

interface WebhookLog {
  id: string;
  submission_id: string;
  webhook_url: string;
  status_code: number;
  response_body: string;
  created_at: string;
}

interface EmailLog {
  id: string;
  submission_id: string;
  recipient_email: string;
  status: "sent" | "failed";
  error_message: string | null;
  created_at: string;
}

export default function SubmissionDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const projectId = params.id as string;
  const submissionId = params.submissionId as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSubmissionData = useCallback(async () => {
    try {
      // Fetch submission with endpoint and project details
      const { data: submissionData, error: submissionError } = await supabase
        .from("submissions")
        .select(
          `
          *,
          file_uploads(*),
          endpoints!submissions_endpoint_id_fkey(
            id,
            name,
            path,
            webhook_url,
            email_notifications,
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

      setSubmission(submissionData);

      // Always fetch webhook logs (since we now support multiple webhooks)
      const { data: webhookData } = await supabase
        .from("webhook_logs")
        .select("*")
        .eq("submission_id", submissionId)
        .order("created_at", { ascending: false });

      if (webhookData) {
        setWebhookLogs(webhookData);
      }

      // Always fetch email logs (since we now support multiple email addresses)
      const { data: emailData } = await supabase
        .from("email_logs")
        .select("*")
        .eq("submission_id", submissionId)
        .order("created_at", { ascending: false });

      if (emailData) {
        setEmailLogs(emailData);
      }
    } catch {
      setError("Failed to load submission data");
    } finally {
      setIsLoading(false);
    }
  }, [submissionId, projectId]);

  useEffect(() => {
    if (!loading && !user) {
      router.push(
        "/auth/login?redirectTo=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    if (user && projectId && submissionId) {
      fetchSubmissionData();
    }
  }, [user, loading, projectId, submissionId, router, fetchSubmissionData]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "JSON data has been copied to your clipboard.",
      });
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      toast({
        title: "Copy failed",
        description: "Failed to copy JSON data to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubmission = async () => {
    if (!submission) return;
    
    setIsDeleting(true);
    try {
      console.log("Attempting to delete submission with ID:", submissionId);
      
      // Delete the submission from the database
      // CASCADE constraints will automatically delete related records
      const { data, error: deleteError } = await supabase
        .from("submissions")
        .delete()
        .eq("id", submissionId)
        .select();

      console.log("Delete result:", { data, deleteError });

      if (deleteError) {
        console.error("Delete error details:", deleteError);
        throw deleteError;
      }

      if (!data || data.length === 0) {
        console.warn("No rows were deleted. Submission may not exist or user may not have permission.");
        throw new Error("No submission was deleted. It may have already been removed or you may not have permission.");
      }

      console.log("Successfully deleted submission:", data);

      toast({
        title: "Submission deleted",
        description: "The submission and all associated data have been permanently deleted.",
      });

      // Navigate back to the endpoint detail page
      router.push(`/dashboard/projects/${projectId}/endpoints/${submission.endpoint_id}`);
    } catch (error) {
      console.error("Failed to delete submission:", error);
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Failed to delete the submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const formatJsonData = (data: unknown) => {
    return JSON.stringify(data, null, 2);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Loading submission...
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || "Submission not found"}
            </h1>
            <Button asChild>
              <Link href={`/dashboard/projects/${projectId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Project
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
        title={`Submission ${submission.id.slice(0, 8)}`}
        subtitle={submission.endpoints?.projects?.name}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/projects/${projectId}/endpoints/${submission.endpoint_id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Endpoint
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(true)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Submission Data */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Submission Data</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(formatJsonData(submission.data))
                    }
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy JSON
                  </Button>
                </div>
                <CardDescription>
                  Raw form data received from the submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {formatJsonData(submission.data)}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* File Uploads */}
            {submission.file_uploads && submission.file_uploads.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Uploaded Files ({submission.file_uploads.length})
                  </CardTitle>
                  <CardDescription>
                    Files uploaded with this form submission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {submission.file_uploads.map((file) => (
                      <div key={file.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center min-w-0">
                            <FileText className="h-8 w-8 mr-3 text-gray-500" />
                            <div className="min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {file.original_filename}
                              </h4>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                <span>{formatFileSize(file.file_size_bytes)}</span>
                                <span>{file.mime_type}</span>
                                <span>
                                  Uploaded {new Date(file.created_at).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={`/api/files/${file.id}/download`} target="_blank">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Webhook Logs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Webhook Delivery
                </CardTitle>
                <CardDescription>
                  Webhook delivery status and logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {webhookLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ExternalLink className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No webhook delivery logs found</p>
                    <p className="text-sm">
                      No webhooks configured or delivery may still be processing
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {webhookLogs.map((log) => (
                      <div key={log.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {log.status_code >= 200 &&
                            log.status_code < 300 ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-sm font-medium">
                              Status: {log.status_code}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(log.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          URL: {log.webhook_url}
                        </div>
                        {log.response_body && (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                            <pre className="text-xs overflow-x-auto">
                              {log.response_body}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Email Logs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Email notification delivery status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {emailLogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No email delivery logs found</p>
                    <p className="text-sm">
                      No email notifications configured or delivery may still be processing
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {emailLogs.map((log) => (
                      <div key={log.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {log.status === "sent" ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            <span className="text-sm font-medium">
                              {log.status === "sent" ? "Sent" : "Failed"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(log.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          To: {log.recipient_email}
                        </div>
                        {log.error_message && (
                          <div className="bg-red-50 dark:bg-red-900/20 rounded p-3">
                            <p className="text-sm text-red-700 dark:text-red-300">
                              Error: {log.error_message}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Info */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Submission ID
                  </div>
                  <div className="text-sm font-mono">{submission.id}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Endpoint
                  </div>
                  <div className="text-sm">
                    <Link
                      href={`/dashboard/projects/${projectId}/endpoints/${submission.endpoints?.id}`}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      {submission.endpoints?.name}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {submission.endpoints?.path}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Received
                  </div>
                  <div className="text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(submission.created_at).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    IP Address
                  </div>
                  <div className="text-sm font-mono">
                    {submission.ip_address}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    User Agent
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 break-all">
                    {submission.user_agent}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Attachments */}
            {submission.file_uploads && submission.file_uploads.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    File Attachments ({submission.file_uploads.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {submission.file_uploads.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center min-w-0 flex-1">
                        <FileText className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {file.original_filename}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatFileSize(file.file_size_bytes)}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="ml-2 flex-shrink-0"
                      >
                        <Link href={`/api/files/${file.id}/download`} target="_blank">
                          <Download className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link
                    href={`/dashboard/projects/${projectId}/endpoints/${submission.endpoints?.id}`}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    View Endpoint
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/dashboard/projects/${projectId}/submissions`}>
                    <Mail className="h-4 w-4 mr-2" />
                    All Submissions
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => copyToClipboard(submission.id)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy ID
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this submission? This action will
              permanently delete the submission and all data associated with it.
              Usage credits will still be counted. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSubmission}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Submission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

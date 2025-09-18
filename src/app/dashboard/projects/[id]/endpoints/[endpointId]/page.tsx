"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Settings,
  Trash2,
  Plus,
  Eye,
  Edit,
  Mail,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { SubmissionCard } from "@/components/dashboard/submission-card";
import { IntegrationExamples } from "@/components/dashboard/integration-examples";

interface Endpoint {
  id: string;
  name: string;
  description: string;
  method: string;
  path: string;
  email_notifications: boolean;
  webhook_url: string | null;
  redirect_url: string | null;
  success_message: string;
  error_message: string;
  created_at: string;
  email_addresses?: string[];
  webhook_urls?: string[];
}

interface Project {
  id: string;
  name: string;
}

interface Submission {
  id: string;
  data: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export default function EndpointDetailsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const endpointId = params.endpointId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(
        "/auth/login?redirectTo=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    if (user && projectId && endpointId) {
      fetchData();
    }
  }, [user, loading, router, projectId, endpointId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch project
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("id, name")
        .eq("id", projectId)
        .eq("user_id", user?.id)
        .single();

      if (projectError) throw projectError;
      setProject(projectData);

      // Fetch endpoint
      const { data: endpointData, error: endpointError } = await supabase
        .from("endpoints")
        .select("*")
        .eq("id", endpointId)
        .eq("project_id", projectId)
        .single();

      if (endpointError) throw endpointError;

      // Fetch email addresses for this endpoint
      const { data: emailAddresses } = await supabase
        .from('endpoint_emails')
        .select('email_address')
        .eq('endpoint_id', endpointId)
        .eq('is_active', true);

      // Fetch webhook URLs for this endpoint
      const { data: webhookUrls } = await supabase
        .from('endpoint_webhooks')
        .select('webhook_url')
        .eq('endpoint_id', endpointId)
        .eq('is_active', true);

      // Combine endpoint data with email addresses and webhook URLs
      const endpointWithExtras = {
        ...endpointData,
        email_addresses: emailAddresses?.map(e => e.email_address) || [],
        webhook_urls: webhookUrls?.map(w => w.webhook_url) || []
      };

      setEndpoint(endpointWithExtras);

      // Fetch recent submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from("submissions")
        .select("*")
        .eq("endpoint_id", endpointId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (submissionsError) throw submissionsError;
      setSubmissions(submissionsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const copyEndpointUrl = async () => {
    if (!endpoint) return;

    const url = `${window.location.origin}/api/submit/${projectId}/${endpoint.path}`;
    await navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const deleteEndpoint = async () => {
    if (!endpoint) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("endpoints")
        .delete()
        .eq("id", endpoint.id);

      if (error) throw error;

      router.push(`/dashboard/projects/${projectId}`);
    } catch (error) {
      console.error("Error deleting endpoint:", error);
      alert("Failed to delete endpoint. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !endpoint) return null;

  const endpointUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/api/submit/${projectId}/${endpoint.path}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title={endpoint.name}
        subtitle={endpoint.description}
        actions={
          <div className="flex space-x-3">
            <Link href={`/dashboard/projects/${projectId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {project?.name || "Project"}
              </Button>
            </Link>
            <Link
              href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/edit`}
            >
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Endpoint</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete &quot;{endpoint.name}&quot;?
                    This action cannot be undone and will permanently remove all
                    associated data and submissions.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={deleteEndpoint}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Endpoint"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Endpoint Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Endpoint Configuration</CardTitle>
                <CardDescription>
                  Configuration details for this endpoint
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Method
                    </label>
                    <div className="mt-1">
                      <Badge variant="secondary">{endpoint.method}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Path
                    </label>
                    <div className="mt-1 text-sm text-gray-900">
                      {endpoint.path}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Endpoint URL
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Input
                      value={endpointUrl}
                      readOnly
                      className="flex-1 font-mono text-sm bg-gray-50 border-gray-200"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyEndpointUrl}
                      className="shrink-0"
                    >
                      {copySuccess ? (
                        "Copied!"
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email Notifications
                    </label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          endpoint.email_notifications ? "default" : "secondary"
                        }
                      >
                        {endpoint.email_notifications ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <Link href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Configuration
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Email Addresses Section */}
                {endpoint.email_addresses && endpoint.email_addresses.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <label className="text-sm font-medium text-gray-500">
                        Email Addresses ({endpoint.email_addresses.length})
                      </label>
                    </div>
                    <div className="space-y-2">
                      {endpoint.email_addresses.map((email, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md"
                        >
                          <code className="flex-1 text-sm font-mono text-gray-700">
                            {email}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Webhook URLs Section */}
                {endpoint.webhook_urls && endpoint.webhook_urls.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Webhook className="h-4 w-4 text-gray-500" />
                      <label className="text-sm font-medium text-gray-500">
                        Webhook URLs ({endpoint.webhook_urls.length})
                      </label>
                    </div>
                    <div className="space-y-2">
                      {endpoint.webhook_urls.map((url, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={url}
                            readOnly
                            className="flex-1 font-mono text-sm bg-gray-50 border-gray-200"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(url, '_blank')}
                            className="shrink-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {endpoint.redirect_url && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Redirect URL
                    </label>
                    <div className="mt-1 text-sm text-gray-900">
                      <a
                        href={endpoint.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        {endpoint.redirect_url}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Integration Examples */}
            <IntegrationExamples 
              endpointUrl={endpointUrl}
              method={endpoint.method}
            />

            {/* Recent Submissions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>
                    Latest form submissions for this endpoint
                  </CardDescription>
                </div>
                {submissions.length > 0 && (
                  <Link
                    href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/submissions`}
                  >
                    <Button variant="outline" size="sm">
                      View All Submissions
                    </Button>
                  </Link>
                )}
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No submissions yet</p>
                    <p className="text-sm">
                      Submissions will appear here once your form receives data
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        projectId={projectId}
                        showEndpointInfo={false}
                        showActions={false}
                        variant="compact"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold">
                      {submissions.length}
                    </div>
                    <div className="text-sm text-gray-500">
                      Total Submissions
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {
                        submissions.filter((s) => {
                          const today = new Date();
                          const submissionDate = new Date(s.created_at);
                          return (
                            submissionDate.toDateString() ===
                            today.toDateString()
                          );
                        }).length
                      }
                    </div>
                    <div className="text-sm text-gray-500">Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Messages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Success Message
                  </label>
                  <div className="mt-1 text-sm text-gray-900 bg-green-50 p-2 rounded">
                    {endpoint.success_message}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Error Message
                  </label>
                  <div className="mt-1 text-sm text-gray-900 bg-red-50 p-2 rounded">
                    {endpoint.error_message}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

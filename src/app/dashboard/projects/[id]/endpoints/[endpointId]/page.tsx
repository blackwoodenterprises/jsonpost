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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Eye,
  Edit,
  Mail,
  Webhook,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Shield,
  Globe,
  FileUp,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { SubmissionCard } from "@/components/dashboard/submission-card";

import { Database } from "@/lib/database.types";

interface Endpoint {
  id: string;
  name: string;
  description: string | null;
  method: string;
  path: string;
  email_notifications: boolean | null;
  webhook_url: string | null;
  redirect_url: string | null;
  success_message: string | null;
  error_message: string | null;
  created_at: string | null;
  email_addresses?: string[];
  webhook_urls?: string[];
  allowed_domains: string[] | null;
  cors_enabled: boolean | null;
  require_api_key: boolean | null;
  file_uploads_enabled: boolean | null;
  allowed_file_types: string[] | null;
  max_file_size_mb: number | null;
  max_files_per_submission: number | null;
  json_validation_enabled: boolean | null;
  json_schema: Database["public"]["Tables"]["endpoints"]["Row"]["json_schema"];
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
  endpoints: {
    id: string;
    name: string;
    path: string;
    project_id: string;
    projects: {
      id: string;
      name: string;
    };
  };
  file_uploads?: Array<{
    id: string;
    original_filename: string;
    file_size_bytes: number;
    mime_type: string;
    created_at: string;
  }>;
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

  // Pagination state for submissions
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const totalPages = Math.ceil(totalSubmissions / pageSize);

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
  }, [user, loading, router, projectId, endpointId, currentPage, pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const fetchData = async () => {
    if (!user?.id) return; // Early return if user or user.id is not available
    
    try {
      setIsLoading(true);

      // Fetch project
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("id, name")
        .eq("id", projectId)
        .eq("user_id", user.id)
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
        .from("endpoint_emails")
        .select("email_address")
        .eq("endpoint_id", endpointId)
        .eq("is_active", true);

      // Fetch webhook URLs for this endpoint
      const { data: webhookUrls } = await supabase
        .from("endpoint_webhooks")
        .select("webhook_url")
        .eq("endpoint_id", endpointId)
        .eq("is_active", true);

      // Combine endpoint data with email addresses and webhook URLs
      const endpointWithExtras = {
        ...endpointData,
        email_addresses: emailAddresses?.map((e) => e.email_address) || [],
        webhook_urls: webhookUrls?.map((w) => w.webhook_url) || [],
      };

      setEndpoint(endpointWithExtras);

      // Fetch recent submissions for this endpoint
      const { count } = await supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .eq("endpoint_id", endpointId);

      setTotalSubmissions(count || 0);

      const { data: submissionsData, error: submissionsError } = await supabase
        .from("submissions")
        .select(
          `
          id,
          data,
          created_at,
          ip_address,
          user_agent,
          file_uploads(*),
          endpoints!inner(
            id,
            name,
            path,
            project_id,
            projects!inner(
              id,
              name
            )
          )
        `
        )
        .eq("endpoint_id", endpointId)
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      if (submissionsError) throw submissionsError;

      // Transform the data to match the expected interface
      const transformedSubmissions = (submissionsData || []).map(
        (submission) => ({
          ...submission,
          endpoints:
            Array.isArray(submission.endpoints) &&
            submission.endpoints.length > 0
              ? {
                  ...submission.endpoints[0],
                  projects:
                    Array.isArray(submission.endpoints[0].projects) &&
                    submission.endpoints[0].projects.length > 0
                      ? submission.endpoints[0].projects[0]
                      : { id: "", name: "" },
                }
              : {
                  id: "",
                  name: "",
                  path: "",
                  project_id: "",
                  projects: { id: "", name: "" },
                },
        })
      ) as Submission[];

      setSubmissions(transformedSubmissions);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title={endpoint.name}
        subtitle={endpoint.description || undefined}
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
        <div className="space-y-6">
          {/* Endpoint Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Endpoint Configuration</CardTitle>
                  <CardDescription>
                    Configuration details for this endpoint
                  </CardDescription>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link
                    href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/edit`}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Configuration
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Method
                    </label>
                    <div className="mt-1">
                      <Badge variant="secondary">{endpoint.method}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Path
                    </label>
                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                      {endpoint.path}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Endpoint URL
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <Input
                      value={endpointUrl}
                      readOnly
                      className="flex-1 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
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
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
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
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      JSON Validation
                    </label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          endpoint.json_validation_enabled
                            ? "default"
                            : "secondary"
                        }
                      >
                        {endpoint.json_validation_enabled
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Email Addresses Section */}
                {endpoint.email_addresses &&
                  endpoint.email_addresses.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Email Addresses ({endpoint.email_addresses.length})
                        </label>
                      </div>
                      <div className="space-y-2">
                        {endpoint.email_addresses.map((email, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
                          >
                            <code className="flex-1 text-sm font-mono text-gray-700 dark:text-gray-300">
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
                      <Webhook className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
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
                            className="flex-1 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(url, "_blank")}
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
                    <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                      <a
                        href={endpoint.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center"
                      >
                        {endpoint.redirect_url}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Security Settings Section */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Security Settings
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        API Key Required
                      </label>
                      <div className="mt-1">
                        <Badge
                          variant={
                            endpoint.require_api_key ? "default" : "secondary"
                          }
                        >
                          {endpoint.require_api_key
                            ? "Required"
                            : "Not Required"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        CORS Enabled
                      </label>
                      <div className="mt-1">
                        <Badge
                          variant={
                            endpoint.cors_enabled ? "default" : "secondary"
                          }
                        >
                          {endpoint.cors_enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Allowed Domains - Only show when CORS is enabled */}
                  {endpoint.cors_enabled && (
                    <div className="mt-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Allowed Domains
                        </label>
                      </div>
                      <div className="space-y-2">
                        {endpoint.allowed_domains &&
                        Array.isArray(endpoint.allowed_domains) &&
                        endpoint.allowed_domains.length > 0 ? (
                          endpoint.allowed_domains.map(
                            (domain: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
                              >
                                <code className="flex-1 text-sm font-mono text-gray-700 dark:text-gray-300">
                                  {domain.trim()}
                                </code>
                              </div>
                            )
                          )
                        ) : (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            No domains configured
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* File Upload Settings Section */}
                {endpoint.file_uploads_enabled && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <FileUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        File Upload Settings
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Max File Size
                        </label>
                        <div className="mt-1">
                          <Badge variant="secondary">
                            {endpoint.max_file_size_mb} MB
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Max Files per Submission
                        </label>
                        <div className="mt-1">
                          <Badge variant="secondary">
                            {endpoint.max_files_per_submission} files
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Allowed File Types */}
                    {endpoint.allowed_file_types &&
                      endpoint.allowed_file_types.length > 0 && (
                        <div className="mt-3">
                          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                            Allowed File Types
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.allowed_file_types.map((type, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Getting Started
                </CardTitle>
                <CardDescription>
                  Learn how to integrate this endpoint into your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ready to start collecting form submissions? Check out our
                    comprehensive documentation to learn how to integrate this
                    endpoint with your forms.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link
                        href="/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Documentation
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link
                        href="/quick-start"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Quick Start Guide
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link
                        href="/form-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileUp className="h-4 w-4 mr-2" />
                        Free HTML Form Generator
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                  <>
                    <div className="space-y-4">
                      {submissions.map((submission) => (
                        <SubmissionCard
                          key={submission.id}
                          submission={submission}
                          projectId={projectId}
                          showEndpointInfo={false}
                          showProjectLink={true}
                          showActions={true}
                          variant="default"
                        />
                      ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalSubmissions > 0 && (
                      <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-700">Show</span>
                          <Select
                            value={pageSize.toString()}
                            onValueChange={(value) =>
                              handlePageSizeChange(Number(value))
                            }
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="25">25</SelectItem>
                              <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm text-gray-700">
                            per page
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-700">
                            Showing {(currentPage - 1) * pageSize + 1} to{" "}
                            {Math.min(currentPage * pageSize, totalSubmissions)}{" "}
                            of {totalSubmissions} submissions
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                          </Button>
                          <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                          >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

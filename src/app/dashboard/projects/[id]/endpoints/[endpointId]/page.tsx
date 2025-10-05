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
  Code,
  Plus,
  X,
  Download,
  FormInput,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { SubmissionCard } from "@/components/dashboard/submission-card";
import { extractVariablePaths } from "@/lib/utils";

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
  allowed_domains: string[] | null;
  cors_enabled: boolean | null;
  require_api_key: boolean | null;
  file_uploads_enabled: boolean | null;
  allowed_file_types: string[] | null;
  max_file_size_mb: number | null;
  max_files_per_submission: number | null;
  json_validation_enabled: boolean | null;
  json_schema: Database["public"]["Tables"]["endpoints"]["Row"]["json_schema"];
  variable_paths?: string[];
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

  // Variable paths state
  const [variablePaths, setVariablePaths] = useState<string[]>([]);
  const [newVariablePath, setNewVariablePath] = useState("");
  const [isExtractingPaths, setIsExtractingPaths] = useState(false);

  const totalPages = Math.ceil(totalSubmissions / pageSize);

  // Cache key for this endpoint's data
  const cacheKey = `endpoint-detail-${endpointId}-${currentPage}-${pageSize}`;

  // Save endpoint data to localStorage
  const saveEndpointData = (data: {
    project: Project;
    endpoint: Endpoint;
    submissions: Submission[];
    totalSubmissions: number;
    variablePaths: string[];
  }) => {
    try {
      const cacheData = {
        ...data,
        timestamp: Date.now(),
        currentPage,
        pageSize,
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error saving endpoint data to cache:", error);
    }
  };

  // Load endpoint data from localStorage
  const loadEndpointData = () => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        const isExpired = Date.now() - data.timestamp > 5000; // 5 seconds cache

        if (!isExpired) {
          setProject(data.project);
          setEndpoint(data.endpoint);
          setSubmissions(data.submissions);
          setTotalSubmissions(data.totalSubmissions);
          setVariablePaths(data.variablePaths);
          setIsLoading(false);
          return true;
        }
      }
    } catch (error) {
      console.error("Error loading endpoint data from cache:", error);
    }
    return false;
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push(
        "/auth/login?redirectTo=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    if (user && projectId && endpointId) {
      // Try to load from cache first
      const loadedFromCache = loadEndpointData();
      if (!loadedFromCache) {
        fetchData();
      }
    }
  }, [user, loading, router, projectId, endpointId, currentPage, pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  // Add browser event listeners
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Check if cached data is older than 5 seconds when tab becomes visible
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const data = JSON.parse(cached);
          const isExpired = Date.now() - data.timestamp > 5000;
          if (isExpired && user && projectId && endpointId) {
            fetchData();
          }
        }
      }
    };

    const handleBeforeUnload = () => {
      // Save current state before page unload
      if (project && endpoint) {
        saveEndpointData({
          project,
          endpoint,
          submissions,
          totalSubmissions,
          variablePaths,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    project,
    endpoint,
    submissions,
    totalSubmissions,
    variablePaths,
    user,
    projectId,
    endpointId,
    cacheKey,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

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

      // Combine endpoint data with email addresses
      const endpointWithExtras = {
        ...endpointData,
        email_addresses: emailAddresses?.map((e) => e.email_address) || [],
        variable_paths: endpointData.variable_paths || [],
      };

      setEndpoint(endpointWithExtras);

      // Set variable paths from endpoint data
      setVariablePaths(endpointData.variable_paths || []);

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

      // Save fetched data to cache
      saveEndpointData({
        project: projectData,
        endpoint: endpointWithExtras,
        submissions: transformedSubmissions,
        totalSubmissions: count || 0,
        variablePaths: endpointData.variable_paths || [],
      });
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

  const addVariablePath = () => {
    if (
      newVariablePath.trim() &&
      !variablePaths.includes(newVariablePath.trim())
    ) {
      const updatedPaths = [...variablePaths, newVariablePath.trim()];
      setVariablePaths(updatedPaths);
      setNewVariablePath("");
      updateVariablePathsInDatabase(updatedPaths);
    }
  };

  const removeVariablePath = (pathToRemove: string) => {
    const updatedPaths = variablePaths.filter((path) => path !== pathToRemove);
    setVariablePaths(updatedPaths);
    updateVariablePathsInDatabase(updatedPaths);
  };

  const extractFromLatestSubmission = async () => {
    if (!endpoint) return;

    setIsExtractingPaths(true);
    try {
      // Fetch the latest submission for this endpoint
      const { data: latestSubmission, error } = await supabase
        .from("submissions")
        .select("data")
        .eq("endpoint_id", endpointId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error || !latestSubmission) {
        console.error("No submissions found or error:", error);
        return;
      }

      // Extract variable paths from the submission data
      const extractedPaths = extractVariablePaths(latestSubmission.data);

      // Replace existing paths with newly extracted paths (no merging)
      const newPaths = Array.from(new Set(extractedPaths)); // Remove duplicates within extracted paths
      setVariablePaths(newPaths);
      updateVariablePathsInDatabase(newPaths);
    } catch (error) {
      console.error("Error extracting paths from latest submission:", error);
    } finally {
      setIsExtractingPaths(false);
    }
  };

  const updateVariablePathsInDatabase = async (paths: string[]) => {
    try {
      const { error } = await supabase
        .from("endpoints")
        .update({ variable_paths: paths })
        .eq("id", endpointId);

      if (error) {
        console.error("Error updating variable paths:", error);
      }
    } catch (error) {
      console.error("Error updating variable paths:", error);
    }
  };

  const deleteAllVariablePaths = () => {
    setVariablePaths([]);
    updateVariablePathsInDatabase([]);
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
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
              <CardHeader>
                <div>
                  <CardTitle>Endpoint Configuration</CardTitle>
                  <CardDescription>
                    Configuration details for this endpoint
                  </CardDescription>
                </div>
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

                {/* Separator line and action buttons */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/form-builder`}
                      >
                        <FormInput className="h-4 w-4 mr-2" />
                        Form Builder
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/webhooks`}
                      >
                        <Webhook className="h-4 w-4 mr-2" />
                        Configure Webhooks
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/google-sheets`}
                      >
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Google Sheets Settings
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/autoresponder`}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Autoresponder Settings
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={`/dashboard/projects/${projectId}/endpoints/${endpointId}/edit`}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Configuration
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Variable Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Variable Paths
                </CardTitle>
                <CardDescription>
                  Define and manage variable paths extracted from JSON
                  submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add new variable path */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., user.email or order.items[0].sku"
                      value={newVariablePath}
                      onChange={(e) => setNewVariablePath(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addVariablePath();
                        }
                      }}
                    />
                    <Button onClick={addVariablePath} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Action buttons row */}
                  <div className="flex gap-2">
                    <Button
                      onClick={extractFromLatestSubmission}
                      disabled={isExtractingPaths}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isExtractingPaths
                        ? "Extracting..."
                        : "Extract From Latest Submission"}
                    </Button>

                    {/* Delete All button - only show when there are paths */}
                    {variablePaths.length > 0 && (
                      <Button
                        onClick={deleteAllVariablePaths}
                        variant="destructive"
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete All Variable Paths
                      </Button>
                    )}
                  </div>

                  {/* Display variable paths */}
                  {variablePaths.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Configured Paths ({variablePaths.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {variablePaths.map((path, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 px-2 py-1"
                          >
                            <code className="text-xs">{path}</code>
                            <button
                              onClick={() => removeVariablePath(path)}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Code className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No variable paths configured</p>
                      <p className="text-xs">
                        Add paths manually or extract them from your latest
                        submission
                      </p>
                    </div>
                  )}
                </div>
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
                        href="/free-html-form-generator"
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

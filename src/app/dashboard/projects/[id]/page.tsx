"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase";
import { DashboardHeader } from "@/components/dashboard/header";
import { SubmissionCard } from "@/components/dashboard/submission-card";
import { Database, Json } from "@/lib/database.types";
import {
  ArrowLeft,
  Plus,
  Globe,
  Mail,
  Settings,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string | null;
  user_id: string;
  api_key: string;
  updated_at: string | null;
}

interface Endpoint {
  id: string;
  name: string;
  path: string;
  description: string | null;
  method: string;
  created_at: string | null;
  submission_count: number;
}

interface Submission {
  id: string;
  data: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  endpoint_id: string;
  zapier_status: string | null;
  file_uploads?: Array<{
    id: string;
    original_filename: string;
    file_size_bytes: number;
    mime_type: string;
    created_at: string;
  }>;
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
}

export default function ProjectPage() {
  const { user } = useAuth();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state for submissions
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const totalPages = Math.ceil(totalSubmissions / pageSize);

  const fetchProjectData = useCallback(async () => {
    try {
      // Fetch project details
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .eq("user_id", user!.id)
        .single();

      if (projectError) {
        setError("Project not found");
        return;
      }

      setProject(projectData);

      // Fetch endpoints
      const { data: endpointsData, error: endpointsError } = await supabase
        .from("endpoints")
        .select(
          `
          id,
          name,
          path,
          description,
          method,
          created_at
        `
        )
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (!endpointsError && endpointsData) {
        // Get submission counts for each endpoint
        const endpointsWithCounts = await Promise.all(
          endpointsData.map(async (endpoint) => {
            const { count } = await supabase
              .from("submissions")
              .select("*", { count: "exact", head: true })
              .eq("endpoint_id", endpoint.id);

            return {
              ...endpoint,
              submission_count: count || 0,
            };
          })
        );
        setEndpoints(endpointsWithCounts);
      }

      // Fetch recent submissions - first get endpoints for this project, then get submissions
      const { data: projectEndpoints } = await supabase
        .from("endpoints")
        .select("id")
        .eq("project_id", projectId);

      if (projectEndpoints && projectEndpoints.length > 0) {
        const endpointIds = projectEndpoints.map((ep) => ep.id);

        // Get total count for pagination
        const { count } = await supabase
          .from("submissions")
          .select("*", { count: "exact", head: true })
          .in("endpoint_id", endpointIds);

        setTotalSubmissions(count || 0);

        // Get paginated submissions
        const { data: submissionsData, error: submissionsError } =
          await supabase
            .from("submissions")
            .select(
              `
            *,
            file_uploads(*),
            endpoints (
              id,
              name,
              path,
              project_id,
              projects (
                id,
                name
              )
            )
          `
            )
            .in("endpoint_id", endpointIds)
            .order("created_at", { ascending: false })
            .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

        console.log("Submissions query result:", {
          submissionsData,
          submissionsError,
        });

        if (!submissionsError && submissionsData) {
          console.log("Raw submissions data:", submissionsData);

          // Transform the data to match our interface
          const transformedSubmissions = submissionsData.map((submission) => {
            console.log("Processing submission:", submission);
            console.log("Submission endpoints:", submission.endpoints);

            return {
                ...submission,
                data: (submission.data as Record<string, unknown>) || {},
                ip_address: (submission.ip_address as string) || "",
                user_agent: submission.user_agent || "",
                created_at: submission.created_at || "",
                file_uploads: submission.file_uploads?.map(upload => ({
                  ...upload,
                  created_at: upload.created_at || ""
                })) || [],
                endpoints:
                  submission.endpoints &&
                  typeof submission.endpoints === "object" &&
                  !Array.isArray(submission.endpoints)
                    ? {
                        id: (submission.endpoints as { id?: string }).id || "",
                        name:
                          (submission.endpoints as { name?: string }).name ||
                          "Unknown Endpoint",
                        path:
                          (submission.endpoints as { path?: string }).path ||
                          "unknown",
                        project_id: (submission.endpoints as { project_id?: string }).project_id || "",
                        projects: {
                          id: (submission.endpoints as { projects?: { id?: string } }).projects?.id || "",
                          name: (submission.endpoints as { projects?: { name?: string } }).projects?.name || "Unknown Project"
                        }
                      }
                    : { 
                        id: "",
                        name: "Unknown Endpoint", 
                        path: "unknown",
                        project_id: "",
                        projects: {
                          id: "",
                          name: "Unknown Project"
                        }
                      },
              };
          });

          console.log("Transformed submissions:", transformedSubmissions);
          setRecentSubmissions(transformedSubmissions);
        }
      }
    } catch {
      setError("Failed to load project data");
    } finally {
      setLoading(false);
    }
  }, [projectId, user?.id, currentPage, pageSize]);

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

  useEffect(() => {
    if (user && projectId) {
      fetchProjectData();
    }
  }, [user, projectId, fetchProjectData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-red-600 mb-4">{error || "Project not found"}</p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title={project.name}
        subtitle={
          project.description ||
          `Created ${new Date(project.created_at || "").toLocaleDateString()}`
        }
        actions={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/projects/${project.id}/settings`}>
                <Settings className="h-4 w-4 mr-2" />
                Project Settings
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/dashboard/projects/${project.id}/endpoints/new`}>
                <Plus className="h-4 w-4 mr-2" />
                New Endpoint
              </Link>
            </Button>
          </>
        }
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Endpoints</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{endpoints.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Submissions
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {endpoints.reduce(
                  (sum, endpoint) => sum + endpoint.submission_count,
                  0
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Activity
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentSubmissions.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 5 submissions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Endpoints Section */}
          <Card>
            <CardHeader>
              <CardTitle>Endpoints</CardTitle>
              <CardDescription>Manage your project endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              {endpoints.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <Globe className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      No endpoints yet
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Create your first endpoint to start receiving form
                      submissions
                    </p>
                    <Button asChild size="sm">
                      <Link
                        href={`/dashboard/projects/${projectId}/endpoints/new`}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Endpoint
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {endpoints.map((endpoint) => (
                    <Card
                      key={endpoint.id}
                      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-blue-600"
                    >
                      <Link
                        href={`/dashboard/projects/${projectId}/endpoints/${endpoint.id}`}
                        className="block"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <Globe className="h-5 w-5 text-blue-600" />
                                <CardTitle className="text-lg">
                                  {endpoint.name}
                                </CardTitle>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {endpoint.method || "POST"}
                              </span>
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          {endpoint.description && (
                            <CardDescription className="mt-2">
                              {endpoint.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono">
                                {endpoint.path}
                              </code>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Mail className="h-3 w-3 text-gray-500" />
                                  <span className="text-gray-600 dark:text-gray-300">
                                    {endpoint.submission_count} submissions
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Created{" "}
                                  {new Date(
                                    endpoint.created_at || ""
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="text-xs text-blue-600 font-medium">
                                View Details →
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Submissions Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>
                Latest form submissions across all endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentSubmissions.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <Mail className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      No submissions yet
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Submissions will appear here once your forms start
                      receiving data
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="space-y-4">
                    {recentSubmissions.map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        projectId={projectId}
                        showEndpointInfo={true}
                        showProjectLink={false}
                        showActions={true}
                        variant="default"
                        className="relative"
                      />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalSubmissions > 0 && (
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            Show:
                          </span>
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
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="25">25</SelectItem>
                              <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {totalPages > 1 && (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handlePreviousPage}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              Page {currentPage} of {totalPages}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleNextPage}
                              disabled={currentPage === totalPages}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {totalPages > 1 && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Showing {(currentPage - 1) * pageSize + 1} to{" "}
                          {Math.min(currentPage * pageSize, totalSubmissions)}{" "}
                          of {totalSubmissions} submissions
                        </p>
                      )}
                    </div>
                  )}

                  <div className="text-center mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/dashboard/projects/${projectId}/submissions`}
                      >
                        View All Submissions
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

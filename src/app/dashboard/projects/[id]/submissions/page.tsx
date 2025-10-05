"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { SubmissionCard } from "@/components/dashboard/submission-card";



interface FileUpload {
  id: string;
  original_filename: string;
  file_size_bytes: number;
  mime_type: string;
  created_at: string;
}

interface Submission {
  id: string;
  data: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  endpoint_id: string;
  file_uploads?: FileUpload[];
  endpoints: {
    id: string;
    name: string;
    path: string;
  };
}

interface Project {
  id: string;
  name: string;
  description: string | null;
}

const ITEMS_PER_PAGE = 20;

export default function AllSubmissionsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination and filtering state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [endpoints, setEndpoints] = useState<
    Array<{ id: string; name: string; path: string }>
  >([]);

  const fetchProjectData = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("id, name, description")
        .eq("id", projectId)
        .eq("user_id", user!.id)
        .single();

      if (error || !data) {
        setError("Project not found");
        return;
      }

      setProject(data);
    } catch {
      setError("Failed to load project data");
    }
  }, [projectId, user]);

  const fetchEndpoints = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("endpoints")
        .select("id, name, path")
        .eq("project_id", projectId)
        .order("name");

      if (data) {
        setEndpoints(data);
      }
    } catch {
      console.error("Failed to fetch endpoints");
    }
  }, [projectId]);

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("submissions")
        .select(
          `
          *,
          file_uploads(*),
          endpoints!submissions_endpoint_id_fkey(
            id,
            name,
            path
          )
        `,
          { count: "exact" }
        )
        .eq("endpoints.project_id", projectId);

      // Apply endpoint filter
      if (selectedEndpoint !== "all") {
        query = query.eq("endpoint_id", selectedEndpoint);
      }

      // Apply date filter
      if (dateFilter !== "all") {
        const now = new Date();
        let startDate: Date;

        switch (dateFilter) {
          case "today":
            startDate = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate()
            );
            break;
          case "week":
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          default:
            startDate = new Date(0);
        }

        query = query.gte("created_at", startDate.toISOString());
      }

      // Apply search term (search in submission data)
      if (searchTerm) {
        query = query.textSearch("data", searchTerm);
      }

      // Apply pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      query = query.order("created_at", { ascending: false }).range(from, to);

      const { data, error, count } = await query;

      if (error) {
        setError("Failed to load submissions");
        return;
      }

      setSubmissions((data || []).map(submission => ({
        ...submission,
        data: (submission.data as Record<string, unknown>) || {},
        ip_address: (submission.ip_address as string) || "",
        user_agent: submission.user_agent || "",
        created_at: submission.created_at || "",
        file_uploads: submission.file_uploads?.map(upload => ({
          ...upload,
          created_at: upload.created_at || ""
        })) || []
      })));
      setTotalCount(count || 0);
    } catch {
      setError("Failed to load submissions");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, selectedEndpoint, dateFilter, searchTerm, currentPage]);

  useEffect(() => {
    if (!loading && !user) {
      router.push(
        "/auth/login?redirectTo=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    if (user && projectId) {
      fetchProjectData();
      fetchEndpoints();
    }
  }, [user, loading, projectId, router, fetchProjectData, fetchEndpoints]);

  useEffect(() => {
    if (user && projectId) {
      fetchSubmissions();
    }
  }, [user, projectId, fetchSubmissions]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleEndpointFilter = (value: string) => {
    setSelectedEndpoint(value);
    setCurrentPage(1);
  };

  const handleDateFilter = (value: string) => {
    setDateFilter(value);
    setCurrentPage(1);
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Loading submissions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || "Project not found"}
            </h1>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
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
        title="All Submissions"
        subtitle={project.name}
        actions={
          <Button variant="outline" asChild>
            <Link href={`/dashboard/projects/${projectId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Link>
          </Button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            <CardDescription>
              Filter and search through submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search in submission data..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Endpoint
                </label>
                <Select
                  value={selectedEndpoint}
                  onValueChange={handleEndpointFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All endpoints" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All endpoints</SelectItem>
                    {endpoints.map((endpoint) => (
                      <SelectItem key={endpoint.id} value={endpoint.id}>
                        {endpoint.name} ({endpoint.path})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Date Range
                </label>
                <Select value={dateFilter} onValueChange={handleDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedEndpoint("all");
                    setDateFilter("all");
                    setCurrentPage(1);
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Showing {submissions.length} of {totalCount} submissions
          </div>
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Submissions List */}
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Globe className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No submissions found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {searchTerm ||
                selectedEndpoint !== "all" ||
                dateFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "This project hasn't received any submissions yet."}
              </p>
              {searchTerm ||
              selectedEndpoint !== "all" ||
              dateFilter !== "all" ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedEndpoint("all");
                    setDateFilter("all");
                    setCurrentPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button asChild>
                  <Link href={`/dashboard/projects/${projectId}`}>
                    View Project Details
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                projectId={projectId}
                showEndpointInfo={true}
                showActions={true}
                variant="default"
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

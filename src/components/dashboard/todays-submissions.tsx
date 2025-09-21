"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmissionCard } from "./submission-card";
import { supabase } from "@/lib/supabase";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface Submission {
  id: string;
  data: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  endpoint_id: string;
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

interface TodaysSubmissionsProps {
  userId: string;
}

export function TodaysSubmissions({ userId }: TodaysSubmissionsProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchTodaysSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get today's date range
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

      // First, get the user's projects to filter submissions
      const { data: userProjects } = await supabase
        .from("projects")
        .select("id")
        .eq("user_id", userId);

      if (!userProjects || userProjects.length === 0) {
        setSubmissions([]);
        setTotalCount(0);
        return;
      }

      const projectIds = userProjects.map(p => p.id);

      // Get endpoints for user's projects
      const { data: userEndpoints } = await supabase
        .from("endpoints")
        .select("id")
        .in("project_id", projectIds);

      if (!userEndpoints || userEndpoints.length === 0) {
        setSubmissions([]);
        setTotalCount(0);
        return;
      }

      const endpointIds = userEndpoints.map(e => e.id);

      // Get total count for pagination
      const { count } = await supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .in("endpoint_id", endpointIds)
        .gte("created_at", startOfDay.toISOString())
        .lt("created_at", endOfDay.toISOString());

      setTotalCount(count || 0);

      // Get paginated submissions with endpoint and project info
      const { data: submissionsData, error } = await supabase
        .from("submissions")
        .select(`
          *,
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
        `)
        .in("endpoint_id", endpointIds)
        .gte("created_at", startOfDay.toISOString())
        .lt("created_at", endOfDay.toISOString())
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      if (error) {
        console.error("Error fetching today's submissions:", error);
        return;
      }

      setSubmissions(submissionsData || []);
    } catch (error) {
      console.error("Error fetching today's submissions:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, currentPage, pageSize]);

  useEffect(() => {
    if (userId) {
      fetchTodaysSubmissions();
    }
  }, [userId, currentPage, pageSize, fetchTodaysSubmissions]);

  const handlePageSizeChange = (newPageSize: string) => {
    setPageSize(parseInt(newPageSize));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Today&apos;s Submissions
        </h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Today&apos;s Submissions
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Show:</span>
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
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
      </div>

      {submissions.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No submissions today
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No form submissions have been received today yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              projectId={submission.endpoints.project_id}
              showEndpointInfo={true}
              showProjectLink={true}
              showActions={true}
              variant="default"
              className="relative"
            />
          ))}
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} submissions
              </p>
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
        </div>
      )}
    </div>
  );
}
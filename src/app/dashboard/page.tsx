"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase";
import {
  getUserUsage,
  getUserProfile,
  type UserUsage,
  type UserProfile,
} from "@/lib/billing";
import {
  getPlanById,
  getUsagePercentage,
} from "@/lib/plans";
import {
  DashboardSkeleton,
  DashboardStatsCardSkeleton,
  ProjectCardSkeleton,
} from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";
import { TodaysSubmissions } from "@/components/dashboard/todays-submissions";
import { Plus, FolderOpen, Globe, Mail, ChevronRight, TrendingUp } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string | null;
  endpoint_count: number;
  submission_count: number;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const router = useRouter();
  const [usage, setUsage] = useState<UserUsage | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [usageLoading, setUsageLoading] = useState(true);

  const fetchUsageData = useCallback(async () => {
    if (!user) return;

    try {
      setUsageLoading(true);
      const [usageData, profileData] = await Promise.all([
        getUserUsage(user.id),
        getUserProfile(user.id),
      ]);
      setUsage(usageData);
      setProfile(profileData);
    } catch (err) {
      console.error("Error fetching usage data:", err);
    } finally {
      setUsageLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchUsageData();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProjects = async () => {
    if (!user?.id) return; // Early return if user or user.id is not available
    
    try {
      // First get projects with endpoint counts
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select(
          `
          *,
          endpoints(count)
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (projectsError) {
        console.error("Error fetching projects:", projectsError);
        return;
      }

      // Then get submission counts for each project
      const projectsWithCounts = await Promise.all(
        (projectsData || []).map(async (project) => {
          // Get all endpoint IDs for this project
          const { data: endpoints } = await supabase
            .from("endpoints")
            .select("id")
            .eq("project_id", project.id);

          const endpointIds = endpoints?.map((e) => e.id) || [];

          // Count submissions for all endpoints in this project
          let submissionCount = 0;
          if (endpointIds.length > 0) {
            const { count } = await supabase
              .from("submissions")
              .select("*", { count: "exact", head: true })
              .in("endpoint_id", endpointIds);

            submissionCount = count || 0;
          }

          return {
            ...project,
            endpoint_count: project.endpoints?.[0]?.count || 0,
            submission_count: submissionCount,
          };
        })
      );

      setProjects(projectsWithCounts);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Dashboard"
        subtitle="Manage your form endpoints and view submission analytics"
        actions={
          <Button asChild>
            <Link href="/dashboard/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Link>
          </Button>
        }
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Usage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {usageLoading || !usage || !profile ? (
            <>
              <DashboardStatsCardSkeleton />
              <DashboardStatsCardSkeleton />
              <DashboardStatsCardSkeleton />
            </>
          ) : (
            <>
              {/* Projects Usage */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projects</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {usage.projects} /{" "}
                    {getPlanById(profile.plan).limits.projects === Infinity
                      ? "∞"
                      : getPlanById(profile.plan).limits.projects}
                  </div>
                  {getPlanById(profile.plan).limits.projects !== Infinity && (
                    <Progress 
                      value={getUsagePercentage(
                        usage.projects,
                        getPlanById(profile.plan).limits.projects
                      )} 
                      className="mb-2" 
                    />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {getPlanById(profile.plan).limits.projects === Infinity
                      ? "Unlimited projects"
                      : `${Math.round(getUsagePercentage(
                          usage.projects,
                          getPlanById(profile.plan).limits.projects
                        ))}% of limit used`}
                  </p>
                </CardContent>
              </Card>

              {/* Endpoints Usage */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Endpoints</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {usage.endpoints} /{" "}
                    {getPlanById(profile.plan).limits.endpoints === Infinity
                      ? "∞"
                      : getPlanById(profile.plan).limits.endpoints}
                  </div>
                  {getPlanById(profile.plan).limits.endpoints !== Infinity && (
                    <Progress 
                      value={getUsagePercentage(
                        usage.endpoints,
                        getPlanById(profile.plan).limits.endpoints
                      )} 
                      className="mb-2" 
                    />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {getPlanById(profile.plan).limits.endpoints === Infinity
                      ? "Unlimited endpoints"
                      : `${Math.round(getUsagePercentage(
                          usage.endpoints,
                          getPlanById(profile.plan).limits.endpoints
                        ))}% of limit used`}
                  </p>
                </CardContent>
              </Card>

              {/* Submissions Usage */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Submissions
                  </CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {usage.submissions} /{" "}
                    {getPlanById(profile.plan).limits.submissions === Infinity
                      ? "∞"
                      : getPlanById(profile.plan).limits.submissions}
                  </div>
                  {getPlanById(profile.plan).limits.submissions !== Infinity && (
                    <Progress 
                      value={getUsagePercentage(
                        usage.submissions,
                        getPlanById(profile.plan).limits.submissions
                      )} 
                      className="mb-2" 
                    />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {getPlanById(profile.plan).limits.submissions === Infinity
                      ? "Unlimited submissions"
                      : `${Math.round(getUsagePercentage(
                          usage.submissions,
                          getPlanById(profile.plan).limits.submissions
                        ))}% of limit used`}
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Projects
          </h2>
        </div>

        {/* Projects Grid */}
        {loadingProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Card className="text-center py-12 mb-8">
            <CardContent>
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get started by creating your first project and setting up form
                endpoints
              </p>
              <Button asChild>
                <Link href="/dashboard/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <Link href={`/dashboard/projects/${project.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <CardDescription>
                      {project.description || "No description provided"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Globe className="h-3 w-3" />
                          <span>{project.endpoint_count} endpoints</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{project.submission_count} submissions</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Created{" "}
                      {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'Unknown'}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {/* Today's Submissions Section */}
        <TodaysSubmissions userId={user.id} />
      </main>
    </div>
  );
}

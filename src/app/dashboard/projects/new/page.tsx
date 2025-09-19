"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase";
import { canCreateProject } from "@/lib/billing";
import { UpgradeModal } from "@/components/upgrade-modal";
import { ArrowLeft, FolderPlus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import type { LimitCheckResult } from "@/lib/billing";

export default function NewProjectPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [limitResult, setLimitResult] = useState<LimitCheckResult | null>(null);
  const router = useRouter();

  // Check project limits on component mount
  useEffect(() => {
    const checkLimits = async () => {
      if (user) {
        try {
          const result = await canCreateProject(user.id);
          setLimitResult(result);
          if (!result.allowed) {
            setShowUpgradeModal(true);
          }
        } catch (error) {
          console.error("Error checking project limits:", error);
        }
      }
    };

    checkLimits();
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user) {
      setError("You must be logged in to create a project");
      setLoading(false);
      return;
    }

    try {
      // Double-check limits before creating
      const limitCheck = await canCreateProject(user.id);
      if (!limitCheck.allowed) {
        setLimitResult(limitCheck);
        setShowUpgradeModal(true);
        setLoading(false);
        return;
      }

      // Create the project (user profile is automatically created by database trigger)
      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            name: formData.name,
            description: formData.description || null,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) {
        setError(error.message);
      } else {
        router.push(`/dashboard/projects/${data.id}`);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Create New Project"
        subtitle="Set up a new project to organize your form endpoints and submissions"
        actions={
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        }
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderPlus className="h-5 w-5 mr-2" />
              Project Details
            </CardTitle>
            <CardDescription>
              Provide basic information about your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., My Website Forms, Contact Forms, Newsletter Signup"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-gray-500">
                  Choose a descriptive name for your project
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Optional description of what this project is for..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
                <p className="text-sm text-gray-500">
                  Optional: Describe the purpose of this project
                </p>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !formData.name.trim()}
                >
                  {loading ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">What&apos;s Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  1
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Create Endpoints
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Set up form endpoints to receive submissions
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  2
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Configure Integrations
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Set up email notifications and webhooks
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  3
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Connect Your Forms
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Update your HTML forms to use the new endpoints
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Upgrade Modal */}
      {limitResult && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          limitType="projects"
          limitResult={limitResult}
        />
      )}
    </div>
  );
}

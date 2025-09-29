"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Trash2,
  AlertTriangle,
  Key,
  RefreshCw,
  Eye,
  EyeOff,
  FileSpreadsheet,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string | null;
  user_id: string;
  api_key?: string;
  google_sheets_access_token?: string | null;
  google_sheets_refresh_token?: string | null;
  google_sheets_token_expires_at?: string | null;
  google_sheets_connected_at?: string | null;
  google_sheets_user_email?: string | null;
  updated_at?: string | null;
}

export default function ProjectSettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRegeneratingKey, setIsRegeneratingKey] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isConnectingGoogleSheets, setIsConnectingGoogleSheets] = useState(false);
  const [isDisconnectingGoogleSheets, setIsDisconnectingGoogleSheets] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Delete confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const fetchProject = useCallback(async () => {
    if (!user) return; // Add guard clause to prevent execution when user is null
    
    try {
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .eq("user_id", user.id)
        .single();

      if (projectError) throw projectError;

      setProject({
        ...projectData,
        created_at: projectData.created_at || '',
        description: projectData.description || null
      });
      setFormData({
        name: projectData.name || "",
        description: projectData.description || "",
      });
    } catch (error) {
      console.error("Error fetching project:", error);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, router, user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      fetchProject();
    }

    // Handle OAuth callback parameters
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    
    if (success === 'google_sheets_connected') {
      // Refresh project data to show updated Google Sheets status
      setTimeout(() => {
        fetchProject();
      }, 1000);
    }
    
    if (error) {
      console.error('OAuth error:', error);
      // You could show a toast notification here
    }
  }, [user, loading, router, fetchProject, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("projects")
        .update({
          name: formData.name,
          description: formData.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", projectId);

      if (error) throw error;

      // Update local state
      setProject((prev) =>
        prev
          ? {
              ...prev,
              name: formData.name,
              description: formData.description,
            }
          : null
      );

      // Show success message (you could add a toast here)
      console.log("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConnectGoogleSheets = async () => {
    setIsConnectingGoogleSheets(true);
    try {
      // Redirect to Google OAuth
      const redirectUri = `${window.location.origin}/api/auth/google-sheets/callback`;
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const scope = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email';
      const state = projectId;
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `response_type=code&` +
        `access_type=offline&` +
        `prompt=consent&` +
        `state=${state}`;
      
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error connecting to Google Sheets:', error);
      setIsConnectingGoogleSheets(false);
    }
  };

  const handleDisconnectGoogleSheets = async () => {
    setIsDisconnectingGoogleSheets(true);
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          google_sheets_access_token: null,
          google_sheets_refresh_token: null,
          google_sheets_token_expires_at: null,
        })
        .eq('id', projectId);

      if (error) throw error;

      // Refresh project data
      await fetchProject();
    } catch (error) {
      console.error('Error disconnecting Google Sheets:', error);
    } finally {
      setIsDisconnectingGoogleSheets(false);
    }
  };

  const isGoogleSheetsConnected = () => {
    return project?.google_sheets_access_token && project?.google_sheets_refresh_token;
  };

  const isGoogleSheetsTokenExpired = () => {
    if (!project?.google_sheets_token_expires_at) return false;
    return new Date(project.google_sheets_token_expires_at) < new Date();
  };

  const handleDelete = async () => {
    if (deleteConfirmation !== project?.name) {
      alert("Please type the project name exactly to confirm deletion.");
      return;
    }

    if (
      !confirm(
        "Are you absolutely sure? This action cannot be undone and will delete all endpoints and submissions."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      // Delete project (cascading deletes will handle endpoints and submissions)
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRegenerateApiKey = async () => {
    if (
      !confirm(
        "Are you sure you want to regenerate the API key? This will invalidate the current key and may break existing integrations."
      )
    ) {
      return;
    }

    setIsRegeneratingKey(true);

    try {
      const { error } = await supabase.rpc("regenerate_project_api_key", {
        project_id: projectId,
      });

      if (error) throw error;

      // Refresh project data to get the new API key
      await fetchProject();

      console.log("API key regenerated successfully");
    } catch (error) {
      console.error("Error regenerating API key:", error);
    } finally {
      setIsRegeneratingKey(false);
    }
  };

  const copyApiKey = () => {
    if (project?.api_key) {
      navigator.clipboard.writeText(project.api_key);
    }
  };

  const maskApiKey = (key: string) => {
    if (!key) return "";
    return key.substring(0, 8) + "..." + key.substring(key.length - 4);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !project) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Project Settings"
        subtitle="Manage your project configuration and settings"
        actions={
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Link href={`/dashboard/projects/${projectId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {project.name}
            </Link>
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Update your project&apos;s basic information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="My Project"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe your project..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Google Sheets Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileSpreadsheet className="h-5 w-5 mr-2" />
                Google Sheets Integration
              </CardTitle>
              <CardDescription>
                Connect your project to Google Sheets to automatically send form submissions to spreadsheets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {isGoogleSheetsConnected() ? (
                    <>
                      <div className="flex items-center space-x-2">
                        {isGoogleSheetsTokenExpired() ? (
                          <XCircle className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            Google Sheets Connected
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {isGoogleSheetsTokenExpired() 
                              ? "Token expired - reconnect to continue using Google Sheets"
                              : "Your project can now write to Google Sheets"
                            }
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Google Sheets Not Connected
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Connect to enable Google Sheets integration for your endpoints
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex space-x-2">
                  {isGoogleSheetsConnected() ? (
                    <>
                      {isGoogleSheetsTokenExpired() && (
                        <Button
                          onClick={handleConnectGoogleSheets}
                          disabled={isConnectingGoogleSheets}
                          variant="outline"
                        >
                          <RefreshCw className={`h-4 w-4 mr-2 ${isConnectingGoogleSheets ? "animate-spin" : ""}`} />
                          {isConnectingGoogleSheets ? "Reconnecting..." : "Reconnect"}
                        </Button>
                      )}
                      <Button
                        onClick={handleDisconnectGoogleSheets}
                        disabled={isDisconnectingGoogleSheets}
                        variant="outline"
                      >
                        {isDisconnectingGoogleSheets ? "Disconnecting..." : "Disconnect"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleConnectGoogleSheets}
                      disabled={isConnectingGoogleSheets}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {isConnectingGoogleSheets ? "Connecting..." : "Connect Google Sheets"}
                    </Button>
                  )}
                </div>
              </div>
              
              {isGoogleSheetsConnected() && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Next steps:</strong> Go to your endpoint configuration pages and click &ldquo;Google Sheets Settings&rdquo; to connect specific endpoints to spreadsheets.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Key Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API Key Management
              </CardTitle>
              <CardDescription>
                Manage your project&apos;s API key for server-to-server
                integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>API Key</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={
                      showApiKey
                        ? project.api_key || ""
                        : maskApiKey(project.api_key || "")
                    }
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800 font-mono"
                    type={showApiKey ? "text" : "password"}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyApiKey}
                    disabled={!project.api_key}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Include this key in the X-API-Key header when API key
                  verification is enabled on endpoints
                </p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      Regenerate API Key
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Generate a new API key. This will invalidate the current
                      key.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRegenerateApiKey}
                    disabled={isRegeneratingKey}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${isRegeneratingKey ? "animate-spin" : ""}`}
                    />
                    {isRegeneratingKey ? "Regenerating..." : "Regenerate"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                  Delete Project
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                  Once you delete a project, there is no going back. This will
                  permanently delete:
                </p>
                <ul className="text-sm text-red-700 dark:text-red-300 list-disc list-inside mb-4 space-y-1">
                  <li>All endpoints in this project</li>
                  <li>All form submissions</li>
                  <li>All project data and settings</li>
                </ul>
                <div className="space-y-3">
                  <div>
                    <Label
                      htmlFor="delete-confirmation"
                      className="text-red-800 dark:text-red-200"
                    >
                      Type &quot;{project.name}&quot; to confirm deletion
                    </Label>
                    <Input
                      id="delete-confirmation"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder={project.name}
                      className="border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteConfirmation !== project.name || isDeleting}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleting ? "Deleting..." : "Delete Project"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

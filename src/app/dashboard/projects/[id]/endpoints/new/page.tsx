"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MultiInput } from "@/components/ui/multi-input";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";

interface Project {
  id: string;
  name: string;
  description: string;
}

// Helper function to format database errors into user-friendly messages
const formatDatabaseError = (error: unknown): string => {
  if (!error || typeof error !== "object" || !("message" in error)) {
    return "An unexpected error occurred. Please try again.";
  }

  const message = (error as { message: string }).message.toLowerCase();

  // Handle duplicate key constraint for endpoint paths
  if (
    message.includes("duplicate key value violates unique constraint") &&
    message.includes("idx_endpoints_project_path")
  ) {
    return "An endpoint with this path already exists in this project. Please choose a different path or name.";
  }

  // Handle other common database constraints
  if (message.includes("duplicate key value violates unique constraint")) {
    return "This value already exists. Please choose a different one.";
  }

  if (message.includes("foreign key constraint")) {
    return "Invalid reference. Please check your input and try again.";
  }

  if (message.includes("not null constraint")) {
    return "Required field is missing. Please fill in all required fields.";
  }

  if (message.includes("check constraint")) {
    return "Invalid value provided. Please check your input.";
  }

  // Return the original message if no specific pattern matches
  return (error as { message: string }).message || "Failed to create endpoint";
};

export default function NewEndpointPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    method: "POST",
    path: "",
    email_notifications: true,
    email_addresses: [] as string[],
    webhook_urls: [] as string[],
    redirect_url: "",
    success_message: "Thank you for your submission!",
    error_message: "There was an error processing your submission.",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push(
        "/auth/login?redirectTo=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    if (user && projectId) {
      const fetchProject = async () => {
        try {
          const { data, error } = await supabase
            .from("projects")
            .select("id, name, description")
            .eq("id", projectId)
            .eq("user_id", user?.id)
            .single();

          if (error) throw error;
          setProject(data);
        } catch (error) {
          console.error("Error fetching project:", error);
          router.push("/dashboard");
        }
      };

      fetchProject();
    }
  }, [user, loading, projectId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Generate endpoint path if not provided
      const endpointPath =
        formData.path || formData.name.toLowerCase().replace(/\s+/g, "-");

      // Create the endpoint first
      const { data: endpoint, error: endpointError } = await supabase
        .from("endpoints")
        .insert({
          project_id: projectId,
          name: formData.name,
          description: formData.description,
          method: formData.method,
          path: endpointPath,
          email_notifications: formData.email_notifications,
          webhook_url: formData.webhook_urls.length > 0 ? formData.webhook_urls[0] : null, // Keep backward compatibility
          redirect_url: formData.redirect_url || null,
          success_message: formData.success_message,
          error_message: formData.error_message,
          uses_multiple_emails: formData.email_addresses.length > 0,
          uses_multiple_webhooks: formData.webhook_urls.length > 0,
        })
        .select()
        .single();

      if (endpointError) throw endpointError;

      // Insert multiple email addresses if any
      if (formData.email_addresses.length > 0) {
        const emailInserts = formData.email_addresses.map(email => ({
          endpoint_id: endpoint.id,
          email_address: email,
          is_active: true,
        }));

        const { error: emailError } = await supabase
          .from("endpoint_emails")
          .insert(emailInserts);

        if (emailError) throw emailError;
      }

      // Insert multiple webhook URLs if any
      if (formData.webhook_urls.length > 0) {
        const webhookInserts = formData.webhook_urls.map(url => ({
          endpoint_id: endpoint.id,
          webhook_url: url,
          is_active: true,
        }));

        const { error: webhookError } = await supabase
          .from("endpoint_webhooks")
          .insert(webhookInserts);

        if (webhookError) throw webhookError;
      }

      router.push(`/dashboard/projects/${projectId}`);
    } catch (error: unknown) {
      setError(formatDatabaseError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Create New Endpoint"
        subtitle="Set up a new form endpoint to collect submissions"
        actions={
          <Link href={`/dashboard/projects/${projectId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {project?.name || "Project"}
            </Button>
          </Link>
        }
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Configure the basic settings for your endpoint
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Endpoint Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Contact Form"
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
                  placeholder="Describe what this endpoint is used for..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="method">HTTP Method</Label>
                  <Select
                    value={formData.method}
                    onValueChange={(value: string) =>
                      handleInputChange("method", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="path">Custom Path (optional)</Label>
                  <Input
                    id="path"
                    type="text"
                    value={formData.path}
                    onChange={(e) => handleInputChange("path", e.target.value)}
                    placeholder="contact-form"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to auto-generate from name
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Configuration</CardTitle>
              <CardDescription>
                Customize how users receive feedback after submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="success_message">Success Message</Label>
                <Textarea
                  id="success_message"
                  value={formData.success_message}
                  onChange={(e) =>
                    handleInputChange("success_message", e.target.value)
                  }
                  placeholder="Thank you for your submission!"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="error_message">Error Message</Label>
                <Textarea
                  id="error_message"
                  value={formData.error_message}
                  onChange={(e) =>
                    handleInputChange("error_message", e.target.value)
                  }
                  placeholder="There was an error processing your submission."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="redirect_url">Redirect URL (optional)</Label>
                <Input
                  id="redirect_url"
                  type="url"
                  value={formData.redirect_url}
                  onChange={(e) =>
                    handleInputChange("redirect_url", e.target.value)
                  }
                  placeholder="https://yoursite.com/thank-you"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Redirect users to this URL after successful submission
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications & Integrations</CardTitle>
              <CardDescription>
                Configure how you want to be notified of new submissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email_notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500">
                    Receive email alerts for new submissions
                  </p>
                </div>
                <Switch
                  id="email_notifications"
                  checked={formData.email_notifications}
                  onCheckedChange={(checked: boolean) =>
                    handleInputChange("email_notifications", checked)
                  }
                />
              </div>
              
              {formData.email_notifications && (
                <div>
                  <MultiInput
                    label="Email Addresses"
                    type="email"
                    values={formData.email_addresses}
                    onChange={(emails) =>
                      setFormData((prev) => ({
                        ...prev,
                        email_addresses: emails,
                      }))
                    }
                    placeholder="Enter email address"
                    description="Add multiple email addresses to receive notifications when forms are submitted."
                    maxItems={10}
                  />
                </div>
              )}

              <div>
                <MultiInput
                  label="Webhook URLs"
                  type="url"
                  values={formData.webhook_urls}
                  onChange={(urls) =>
                    setFormData((prev) => ({
                      ...prev,
                      webhook_urls: urls,
                    }))
                  }
                  placeholder="Enter webhook URL"
                  description="Add webhook URLs to receive HTTP POST requests with form data."
                  maxItems={10}
                />
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/projects/${projectId}`)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Endpoint
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

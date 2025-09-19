"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MultiInput } from "@/components/ui/multi-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";

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
}

export default function EditEndpointPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const endpointId = params.endpointId as string;

  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    method: "POST",
    path: "",
    email_notifications: false,
    email_addresses: [] as string[],
    webhook_urls: [] as string[],
    redirect_url: "",
    success_message: "Thank you for your submission!",
    error_message: "There was an error processing your submission.",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, loading, router, projectId, endpointId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      // Fetch project (for validation only)
      const { error: projectError } = await supabase
        .from("projects")
        .select("id, name")
        .eq("id", projectId)
        .eq("user_id", user?.id)
        .single();

      if (projectError) throw projectError;

      // Fetch endpoint
      const { data: endpointData, error: endpointError } = await supabase
        .from("endpoints")
        .select("*")
        .eq("id", endpointId)
        .eq("project_id", projectId)
        .single();

      if (endpointError) throw endpointError;
      setEndpoint(endpointData);

      // Fetch existing email addresses
      const { data: emailData } = await supabase
        .from("endpoint_emails")
        .select("email_address")
        .eq("endpoint_id", endpointId)
        .eq("is_active", true);

      // Fetch existing webhook URLs
      const { data: webhookData } = await supabase
        .from("endpoint_webhooks")
        .select("webhook_url")
        .eq("endpoint_id", endpointId)
        .eq("is_active", true);

      // Set form data
      setFormData({
        name: endpointData.name || "",
        description: endpointData.description || "",
        method: endpointData.method || "POST",
        path: endpointData.path || "",
        email_notifications: endpointData.email_notifications || false,
        email_addresses: emailData?.map(e => e.email_address) || [],
        webhook_urls: webhookData?.map(w => w.webhook_url) || [],
        redirect_url: endpointData.redirect_url || "",
        success_message:
          endpointData.success_message || "Thank you for your submission!",
        error_message:
          endpointData.error_message ||
          "There was an error processing your submission.",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Update the endpoint
      const { error: endpointError } = await supabase
        .from("endpoints")
        .update({
          name: formData.name,
          description: formData.description,
          method: formData.method,
          path: formData.path,
          email_notifications: formData.email_notifications,
          webhook_url: formData.webhook_urls.length > 0 ? formData.webhook_urls[0] : null, // Keep backward compatibility
          redirect_url: formData.redirect_url || null,
          success_message: formData.success_message,
          error_message: formData.error_message,
          uses_multiple_emails: formData.email_addresses.length > 0,
          uses_multiple_webhooks: formData.webhook_urls.length > 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", endpointId);

      if (endpointError) throw endpointError;

      // Delete existing email addresses and webhooks
      await supabase
        .from("endpoint_emails")
        .delete()
        .eq("endpoint_id", endpointId);

      await supabase
        .from("endpoint_webhooks")
        .delete()
        .eq("endpoint_id", endpointId);

      // Insert new email addresses if any
      if (formData.email_addresses.length > 0) {
        const emailInserts = formData.email_addresses.map(email => ({
          endpoint_id: endpointId,
          email_address: email,
          is_active: true,
        }));

        const { error: emailError } = await supabase
          .from("endpoint_emails")
          .insert(emailInserts);

        if (emailError) throw emailError;
      }

      // Insert new webhook URLs if any
      if (formData.webhook_urls.length > 0) {
        const webhookInserts = formData.webhook_urls.map(url => ({
          endpoint_id: endpointId,
          webhook_url: url,
          is_active: true,
        }));

        const { error: webhookError } = await supabase
          .from("endpoint_webhooks")
          .insert(webhookInserts);

        if (webhookError) throw webhookError;
      }

      router.push(`/dashboard/projects/${projectId}/endpoints/${endpointId}`);
    } catch (error) {
      console.error("Error updating endpoint:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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

  if (!user || !endpoint) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Edit Endpoint"
        subtitle="Update your endpoint configuration"
        actions={
          <Link
            href={`/dashboard/projects/${projectId}/endpoints/${endpointId}`}
          >
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Endpoint Details
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Endpoint Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="My Endpoint"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="path">Path</Label>
                  <Input
                    id="path"
                    value={formData.path}
                    onChange={(e) => handleInputChange("path", e.target.value)}
                    placeholder="my-endpoint"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe what this endpoint does..."
                  rows={3}
                />
              </div>
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
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Configuration</CardTitle>
              <CardDescription>
                Customize the messages and redirects for your endpoint
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
                <Label htmlFor="redirect_url">Redirect URL (Optional)</Label>
                <Input
                  id="redirect_url"
                  type="url"
                  value={formData.redirect_url}
                  onChange={(e) =>
                    handleInputChange("redirect_url", e.target.value)
                  }
                  placeholder="https://example.com/thank-you"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Configure notifications and webhooks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="email_notifications"
                  checked={formData.email_notifications}
                  onCheckedChange={(checked) =>
                    handleInputChange("email_notifications", checked)
                  }
                />
                <Label htmlFor="email_notifications">
                  Enable Email Notifications
                </Label>
              </div>
              
              {formData.email_notifications && (
                <div className="space-y-2">
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

              <div className="space-y-2">
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

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.push(
                  `/dashboard/projects/${projectId}/endpoints/${endpointId}`
                )
              }
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

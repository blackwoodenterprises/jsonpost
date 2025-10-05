"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AppPortal } from "svix-react";
import "svix-react/style.css";
import { ArrowLeft, Webhook } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Json } from "@/lib/database.types";
import { DashboardHeader } from "@/components/dashboard/header";
import JsonTransformer from "@/components/dashboard/json-transformer";

interface Endpoint {
  id: string;
  name: string;
  webhooks_enabled: boolean | null;
  svix_app_id: string | null;
  variable_paths: string[] | null;
  webhook_json_transformation_enabled: boolean | null;
  webhook_json_transformation_template: Json;
}

interface Project {
  id: string;
  name: string;
}

interface AppPortalResponse {
  url: string;
}

export default function WebhookSetupPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const endpointId = params.endpointId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [enabling, setEnabling] = useState(false);
  const [appPortalUrl, setAppPortalUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Fetch project data
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("id, name")
        .eq("id", projectId)
        .single();

      if (projectError) throw projectError;
      setProject(projectData);

      // Fetch endpoint data
      const { data: endpointData, error: endpointError } = await supabase
        .from("endpoints")
        .select("id, name, webhooks_enabled, svix_app_id, variable_paths, webhook_json_transformation_enabled, webhook_json_transformation_template")
        .eq("id", endpointId)
        .single();

      if (endpointError) throw endpointError;
      setEndpoint(endpointData);

      // If webhooks are enabled and we have an app ID, fetch the app portal URL
      if (endpointData.webhooks_enabled && endpointData.svix_app_id) {
        await fetchAppPortalUrl(endpointData.svix_app_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [projectId, endpointId]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(
        "/auth/login?redirectTo=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    if (user && projectId && endpointId) {
      fetchData();
    }
  }, [user, authLoading, router, projectId, endpointId, fetchData]);

  const fetchAppPortalUrl = async (appId: string) => {
    try {
      // Detect system dark mode preference
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const response = await fetch(`/api/svix/app-portal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appId,
          darkMode: isDarkMode,
          // You can customize these colors to match your brand
          primaryColorLight: "3b82f6", // blue-500
          primaryColorDark: "60a5fa", // blue-400
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch app portal URL");
      }

      const data: AppPortalResponse = await response.json();
      setAppPortalUrl(data.url);
    } catch (error) {
      console.error("Error fetching app portal URL:", error);
      setError("Failed to load webhook portal");
    }
  };

  const handleWebhooksToggle = async (enabled: boolean) => {
    if (!endpoint) return;

    setEnabling(true);
    setError(null);

    try {
      if (enabled && !endpoint.svix_app_id) {
        // Create Svix application for the first time
        const response = await fetch(`/api/svix/create-app`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            endpointId: endpoint.id,
            endpointName: endpoint.name,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create webhook application");
        }

        const { appId } = await response.json();

        // Update endpoint with svix_app_id and enable webhooks
        const { error: updateError } = await supabase
          .from("endpoints")
          .update({
            webhooks_enabled: true,
            svix_app_id: appId,
            webhook_json_transformation_enabled: false,
            webhook_json_transformation_template: {},
          })
          .eq("id", endpoint.id);

        if (updateError) throw updateError;

        setEndpoint({
          ...endpoint,
          webhooks_enabled: true,
          svix_app_id: appId,
          webhook_json_transformation_enabled: false,
          webhook_json_transformation_template: {},
        });

        // Fetch app portal URL for the new application
        await fetchAppPortalUrl(appId);
      } else {
        // Just toggle the webhooks_enabled flag
        const { error: updateError } = await supabase
          .from("endpoints")
          .update({ 
            webhooks_enabled: enabled,
            webhook_json_transformation_enabled: enabled ? false : null,
            webhook_json_transformation_template: enabled ? {} : null,
          })
          .eq("id", endpoint.id);

        if (updateError) throw updateError;

        setEndpoint({
          ...endpoint,
          webhooks_enabled: enabled,
        });

        if (enabled && endpoint.svix_app_id) {
          await fetchAppPortalUrl(endpoint.svix_app_id);
        } else {
          setAppPortalUrl(null);
        }
      }
    } catch (error) {
      console.error("Error toggling webhooks:", error);
      setError("Failed to update webhook settings");
    } finally {
      setEnabling(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user || !endpoint || !project) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Webhook Setup"
        subtitle={`Configure webhooks for ${endpoint.name}`}
        actions={
          <div className="flex space-x-3">
            <Link href={`/dashboard/projects/${projectId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {project.name}
              </Button>
            </Link>
            <Link
              href={`/dashboard/projects/${projectId}/endpoints/${endpointId}`}
            >
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Endpoint
              </Button>
            </Link>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Error Message */}
          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Webhook Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Configuration
              </CardTitle>
              <CardDescription>
                Enable webhooks to receive real-time notifications when form
                submissions are received.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="webhooks-enabled"
                  checked={endpoint.webhooks_enabled || false}
                  onCheckedChange={handleWebhooksToggle}
                  disabled={enabling}
                />
                <Label htmlFor="webhooks-enabled">
                  {enabling ? "Updating..." : "Enable Webhooks"}
                </Label>
              </div>
              {endpoint.webhooks_enabled && (
                <p className="text-sm text-muted-foreground mt-2">
                  Webhooks are enabled. Use the portal below to manage your
                  webhook endpoints.
                </p>
              )}
            </CardContent>
          </Card>

          {/* JSON Transformer */}
          {endpoint.webhooks_enabled && (
            <JsonTransformer 
              endpointId={endpoint.id}
              webhooksEnabled={endpoint.webhooks_enabled}
              variablePaths={endpoint.variable_paths || []}
              initialEnabled={endpoint.webhook_json_transformation_enabled || false}
              initialTemplate={endpoint.webhook_json_transformation_template || {}}
            />
          )}

          {/* Svix App Portal */}
          {endpoint.webhooks_enabled && appPortalUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Webhook Management Portal</CardTitle>
                <CardDescription>
                  Add webhook endpoints, view delivery logs, and manage your
                  webhook configuration.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="min-h-[600px] w-full">
                  <AppPortal url={appPortalUrl} fullSize />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          {!endpoint.webhooks_enabled && (
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with Webhooks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What are webhooks?</h4>
                  <p className="text-sm text-muted-foreground">
                    Webhooks allow your application to receive real-time
                    notifications when form submissions are received. Instead of
                    polling for new data, your server will be notified
                    immediately.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">How it works</h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Enable webhooks using the toggle above</li>
                    <li>
                      Add your webhook endpoint URLs in the management portal
                    </li>
                    <li>Receive POST requests with form submission data</li>
                    <li>Monitor delivery status and retry failed deliveries</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Payload format</h4>
                  <p className="text-sm text-muted-foreground">
                    Each webhook will receive a JSON payload containing the form
                    submission data, file upload information, and metadata about
                    the submission.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

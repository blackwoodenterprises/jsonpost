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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Mail, Eye, Code, Save } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { DashboardHeader } from "@/components/dashboard/header";
import { toast } from "@/hooks/use-toast";

interface Endpoint {
  id: string;
  name: string;
  autoresponder_enabled: boolean | null;
  autoresponder_provider: string | null;
  autoresponder_from_email: string | null;
  autoresponder_from_name: string | null;
  autoresponder_subject: string | null;
  autoresponder_html_template: string | null;
  autoresponder_text_template: string | null;
  autoresponder_recipient_field: string | null;
  autoresponder_api_key: string | null;
  autoresponder_domain: string | null;
  variable_paths: string[] | null;
}

interface Project {
  id: string;
  name: string;
}

const EMAIL_PROVIDERS = [
  { value: "jsonpost", label: "JSONPost (Built-in)" },
  { value: "sendgrid", label: "SendGrid" },
  { value: "resend", label: "Resend" },
  { value: "postmark", label: "Postmark" },
];

export default function AutoresponderSettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const endpointId = params.endpointId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"html" | "text">("html");
  const [lastFocusedField, setLastFocusedField] = useState<"subject" | "htmlTemplate" | "textTemplate">("subject");

  // Form state
  const [formData, setFormData] = useState({
    enabled: false,
    provider: "jsonpost",
    fromEmail: "",
    fromName: "",
    subject: "",
    htmlTemplate: "",
    textTemplate: "",
    recipientField: "",
    apiKey: "",
    domain: "",
  });

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
        .select(`
          id, name, variable_paths,
          autoresponder_enabled,
          autoresponder_provider,
          autoresponder_from_email,
          autoresponder_from_name,
          autoresponder_subject,
          autoresponder_html_template,
          autoresponder_text_template,
          autoresponder_recipient_field,
          autoresponder_api_key,
          autoresponder_domain
        `)
        .eq("id", endpointId)
        .single();

      if (endpointError) throw endpointError;
      setEndpoint(endpointData);

      // Set form data from endpoint
      const provider = endpointData.autoresponder_provider || "jsonpost";
      setFormData({
        enabled: endpointData.autoresponder_enabled || false,
        provider: provider,
        fromEmail: provider === "jsonpost" ? "no-reply@jsonpost.com" : (endpointData.autoresponder_from_email || ""),
        fromName: provider === "jsonpost" ? "JSONPost Agent" : (endpointData.autoresponder_from_name || ""),
        subject: endpointData.autoresponder_subject || "",
        htmlTemplate: endpointData.autoresponder_html_template || "",
        textTemplate: endpointData.autoresponder_text_template || "",
        recipientField: endpointData.autoresponder_recipient_field || "",
        apiKey: endpointData.autoresponder_api_key || "",
        domain: endpointData.autoresponder_domain || "",
      });
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

  // Update form data when provider changes
  useEffect(() => {
    if (formData.provider === "jsonpost") {
      setFormData(prev => ({
        ...prev,
        fromEmail: "no-reply@jsonpost.com",
        fromName: "JSONPost Agent"
      }));
    }
  }, [formData.provider]);

  const handleSave = async () => {
    if (!endpoint) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/endpoints/${endpointId}/autoresponder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          autoresponder_enabled: formData.enabled,
          autoresponder_provider: formData.provider,
          autoresponder_from_email: formData.fromEmail,
          autoresponder_from_name: formData.fromName,
          autoresponder_subject: formData.subject,
          autoresponder_html_template: formData.htmlTemplate,
          autoresponder_text_template: formData.textTemplate,
          autoresponder_recipient_field: formData.recipientField,
          autoresponder_api_key: formData.apiKey,
          autoresponder_domain: formData.domain,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save configuration");
      }

      const updatedEndpoint = await response.json();
      setEndpoint(updatedEndpoint);

      toast({
        title: "Configuration saved successfully!",
        description: "Your autoresponder settings have been updated.",
      });

      router.refresh();
    } catch (error) {
      console.error("Error saving autoresponder configuration:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save configuration";
      setError(errorMessage);
      toast({
        title: "Error saving configuration",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const insertVariable = (variable: string, fallbackField?: "subject" | "htmlTemplate" | "textTemplate") => {
    const placeholder = `{{${variable}}}`;
    
    // Use the last focused field, or fall back to the specified field, or default to subject
    const targetField = fallbackField || lastFocusedField;
    
    // Determine which template field to use based on preview mode for template fields
    let fieldToUpdate = targetField;
    if (targetField === "htmlTemplate" || targetField === "textTemplate") {
      fieldToUpdate = previewMode === "html" ? "htmlTemplate" : "textTemplate";
    }
    
    setFormData(prev => ({
      ...prev,
      [fieldToUpdate]: prev[fieldToUpdate] + placeholder
    }));
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !endpoint || !project) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Autoresponder Settings"
        subtitle={`Configure email autoresponder for ${endpoint.name}`}
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

          {/* Enable/Disable Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Autoresponder Configuration
              </CardTitle>
              <CardDescription>
                Automatically send personalized email responses when form submissions are received.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoresponder-enabled"
                  checked={formData.enabled}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
                  disabled={saving}
                />
                <Label htmlFor="autoresponder-enabled">
                  Enable Autoresponder
                </Label>
              </div>
              {formData.enabled && (
                <p className="text-sm text-muted-foreground mt-2">
                  Autoresponder is enabled. Configure the settings below to customize your email responses.
                </p>
              )}
              {!formData.enabled && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Autoresponder is disabled. Click save to apply this change.
                  </p>
                  <Button onClick={handleSave} disabled={saving} variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {formData.enabled && (
            <>
              {/* Email Provider Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Provider</CardTitle>
                  <CardDescription>
                    Choose your email service provider for sending autoresponder emails.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="provider">Email Provider</Label>
                    <Select
                      value={formData.provider}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, provider: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select email provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {EMAIL_PROVIDERS.map((provider) => (
                          <SelectItem key={provider.value} value={provider.value}>
                            {provider.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.provider !== "jsonpost" && (
                    <>
                      <div>
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          value={formData.apiKey}
                          onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                          placeholder="Enter your API key"
                        />
                      </div>
                      {(formData.provider === "sendgrid" || formData.provider === "postmark") && (
                        <div>
                          <Label htmlFor="domain">Domain (optional)</Label>
                          <Input
                            id="domain"
                            value={formData.domain}
                            onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                            placeholder="your-domain.com"
                          />
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Email Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Configuration</CardTitle>
                  <CardDescription>
                    Configure the sender information and recipient field.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromEmail">From Email *</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={formData.provider === "jsonpost" ? "no-reply@jsonpost.com" : formData.fromEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, fromEmail: e.target.value }))}
                        placeholder="noreply@yoursite.com"
                        disabled={formData.provider === "jsonpost"}
                        required
                      />
                      {formData.provider === "jsonpost" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          JSONPost uses a fixed sender email for security and deliverability.
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        value={formData.provider === "jsonpost" ? "JSONPost Agent" : formData.fromName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fromName: e.target.value }))}
                        placeholder="Your Company"
                        disabled={formData.provider === "jsonpost"}
                      />
                      {formData.provider === "jsonpost" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          JSONPost uses a fixed sender name for consistency.
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="recipientField">Recipient Field *</Label>
                    <Input
                      id="recipientField"
                      value={formData.recipientField}
                      onChange={(e) => setFormData(prev => ({ ...prev, recipientField: e.target.value }))}
                      placeholder="email"
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      The field name in your form that contains the recipient&apos;s email address.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Variable Paths Helper */}
              {endpoint.variable_paths && endpoint.variable_paths.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Available Variables
                    </CardTitle>
                    <CardDescription>
                      Click on any variable to insert it into your email templates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {endpoint.variable_paths.map((path) => (
                        <Button
                          key={path}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Insert into currently focused field or intelligently determine target
                            insertVariable(path);
                          }}
                        >
                          {path}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Email Templates */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>
                    Create your email templates using variables from form submissions. Use {`{{variable_name}}`} syntax.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject Line *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      onFocus={() => setLastFocusedField("subject")}
                      placeholder="Thank you for your submission, {{name}}!"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Email Content</Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={previewMode === "html" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPreviewMode("html")}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          HTML
                        </Button>
                        <Button
                          variant={previewMode === "text" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPreviewMode("text")}
                        >
                          <Code className="h-4 w-4 mr-1" />
                          Text
                        </Button>
                      </div>
                    </div>

                    {previewMode === "html" ? (
                      <div>
                        <Textarea
                          value={formData.htmlTemplate}
                          onChange={(e) => setFormData(prev => ({ ...prev, htmlTemplate: e.target.value }))}
                          onFocus={() => setLastFocusedField("htmlTemplate")}
                          placeholder="<h1>Thank you {{name}}!</h1><p>We received your message: {{message}}</p>"
                          rows={10}
                          className="font-mono"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          HTML template for rich email content. Use HTML tags for formatting.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Textarea
                          value={formData.textTemplate}
                          onChange={(e) => setFormData(prev => ({ ...prev, textTemplate: e.target.value }))}
                          onFocus={() => setLastFocusedField("textTemplate")}
                          placeholder="Thank you {{name}}! We received your message: {{message}}"
                          rows={10}
                          className="font-mono"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Plain text template as fallback for email clients that don&apos;t support HTML.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <Card>
                <CardContent className="pt-6">
                  <Button onClick={handleSave} disabled={saving} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Saving..." : "Save Configuration"}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {/* Instructions */}
          {!formData.enabled && (
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with Autoresponder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What is an autoresponder?</h4>
                  <p className="text-sm text-muted-foreground">
                    An autoresponder automatically sends personalized email responses to users who submit your forms. 
                    This helps acknowledge their submission and provide immediate feedback.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">How it works</h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Enable the autoresponder using the toggle above</li>
                    <li>Choose your email service provider</li>
                    <li>Configure sender information and email templates</li>
                    <li>Use variables to personalize emails with form data</li>
                    <li>Save your configuration and test with a form submission</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Supported providers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>JSONPost:</strong> Built-in email service (no setup required)</li>
                    <li><strong>SendGrid:</strong> Reliable email delivery with advanced features</li>
                    <li><strong>Resend:</strong> Developer-friendly email API</li>
                    <li><strong>Postmark:</strong> Transactional email specialist</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
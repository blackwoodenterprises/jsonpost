"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileSpreadsheet,
  Save,
  ExternalLink,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";

interface Project {
  id: string;
  name: string;
  google_sheets_access_token?: string | null;
  google_sheets_refresh_token?: string | null;
  google_sheets_token_expires_at?: string | null;
}

interface Endpoint {
  id: string;
  name: string;
  description: string | null;
  variable_paths?: string[] | null;
  google_sheets_enabled?: boolean | null;
  google_sheets_spreadsheet_id?: string | null;
  google_sheets_sheet_name?: string | null;
  google_sheets_selected_variables?: string[] | null;
}

interface GoogleSheet {
  spreadsheetId: string;
  properties: {
    title: string;
  };
}

interface SheetInfo {
  name: string;
  headers: string[];
}

interface GoogleSheetsClientProps {
  initialProject: Project;
  initialEndpoint: Endpoint;
  initialSpreadsheets?: GoogleSheet[];
  initialAvailableSheets?: SheetInfo[];
  initialSheetHeaders?: string[];
  projectId: string;
  endpointId: string;
}

export default function GoogleSheetsClient({
  initialProject,
  initialEndpoint,
  initialSpreadsheets,
  initialAvailableSheets,
  initialSheetHeaders,
  projectId,
  endpointId,
}: GoogleSheetsClientProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [project] = useState<Project>(initialProject);
  const [endpoint, setEndpoint] = useState<Endpoint>(initialEndpoint);
  const [isSaving, setIsSaving] = useState(false);

  // Google Sheets state - simplified for new approach
  const [selectedVariables, setSelectedVariables] = useState<string[]>(
    initialEndpoint.google_sheets_selected_variables || []
  );
  const [isCreatingSpreadsheet, setIsCreatingSpreadsheet] = useState(false);

  const handleCreateSpreadsheet = async () => {
    if (!endpoint || selectedVariables.length === 0) {
      toast({
        title: "No variables selected",
        description: "Please select at least one variable to include in the spreadsheet.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingSpreadsheet(true);
    try {
      const response = await fetch(`/api/google-sheets/create-spreadsheet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpointId: endpointId,
          endpointName: endpoint.name,
          selectedVariables: selectedVariables,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create spreadsheet");
      }

      const result = await response.json();
      
      // Update local endpoint state
      setEndpoint({
        ...endpoint,
        google_sheets_enabled: true,
        google_sheets_spreadsheet_id: result.spreadsheetId,
        google_sheets_sheet_name: "Sheet1",
        google_sheets_selected_variables: selectedVariables,
      });

      toast({
        title: "Spreadsheet created successfully!",
        description: `Created "${result.title}" and configured the integration.`,
      });

      // Refresh the page to get updated data
      router.refresh();
    } catch (error) {
      console.error("Error creating spreadsheet:", error);
      toast({
        title: "Error creating spreadsheet",
        description: "Failed to create the spreadsheet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingSpreadsheet(false);
    }
  };

  const handleDisconnect = async () => {
    if (!endpoint) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/endpoints/${endpointId}/google-sheets`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        
        if (response.status === 404) {
          throw new Error("Endpoint not found. Please refresh the page and try again.");
        }
        
        throw new Error(errorMessage);
      }

      const updatedEndpoint = await response.json();
      
      setEndpoint(updatedEndpoint);

      // Reset state
      setSelectedVariables([]);

      toast({
        title: "Google Sheets disconnected",
        description: "The Google Sheets integration has been disabled.",
      });

      // Refresh the page to get updated data
      router.refresh();
    } catch (error) {
      console.error("Error disconnecting Google Sheets:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to disconnect Google Sheets. Please try again.";
      
      toast({
        title: "Error disconnecting",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const isGoogleSheetsConnected = () => {
    return (
      project?.google_sheets_access_token &&
      project?.google_sheets_refresh_token
    );
  };

  const isSpreadsheetConfigured = () => {
    return endpoint?.google_sheets_enabled && endpoint?.google_sheets_spreadsheet_id;
  };

  const handleVariableToggle = (variablePath: string) => {
    setSelectedVariables(prev => {
      if (prev.includes(variablePath)) {
        return prev.filter(v => v !== variablePath);
      } else {
        return [...prev, variablePath];
      }
    });
  };

  const getSpreadsheetUrl = () => {
    if (endpoint?.google_sheets_spreadsheet_id) {
      return `https://docs.google.com/spreadsheets/d/${endpoint.google_sheets_spreadsheet_id}/edit`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Google Sheets Settings"
        subtitle={`Configure Google Sheets integration for ${endpoint.name}`}
        actions={
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Link
              href={`/dashboard/projects/${projectId}/endpoints/${endpointId}`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Endpoint
            </Link>
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileSpreadsheet className="h-5 w-5 mr-2" />
                Connection Status
              </CardTitle>
              <CardDescription>
                Verify your Google Sheets connection status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {isGoogleSheetsConnected() ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Google Sheets Connected
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Project has access to Google Sheets
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          Google Sheets Not Connected
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Connect Google Sheets in project settings first
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {!isGoogleSheetsConnected() && (
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/projects/${projectId}/settings`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Go to Settings
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {isGoogleSheetsConnected() && (
            <>
              {/* Current Configuration */}
              {isSpreadsheetConfigured() && (
                <Card>
                  <CardHeader>
                    <CardTitle>Current Configuration</CardTitle>
                    <CardDescription>
                      Your current Google Sheets integration setup
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            Integration Active
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Submissions are being sent to Google Sheets
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={getSpreadsheetUrl() || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Sheet
                          </a>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleDisconnect}
                          disabled={isSaving}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Selected Variables</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {endpoint.google_sheets_selected_variables?.map((variable) => (
                          <Badge key={variable} variant="secondary">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Variable Selection */}
              {!isSpreadsheetConfigured() && (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Spreadsheet</CardTitle>
                    <CardDescription>
                      Select which variables to include in your new Google Sheets spreadsheet.
                      A new spreadsheet will be created in your Google Drive.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">
                        Available Variables
                      </Label>
                      {endpoint.variable_paths && endpoint.variable_paths.length > 0 ? (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {endpoint.variable_paths.map((variablePath) => (
                            <div
                              key={variablePath}
                              className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <input
                                type="checkbox"
                                id={variablePath}
                                checked={selectedVariables.includes(variablePath)}
                                onChange={() => handleVariableToggle(variablePath)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <Label
                                htmlFor={variablePath}
                                className="flex-1 cursor-pointer"
                              >
                                {variablePath}
                              </Label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No variables available for this endpoint</p>
                          <p className="text-sm">
                            Submit some data to this endpoint first to see available variables
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedVariables.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Selected Variables ({selectedVariables.length})</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedVariables.map((variable) => (
                            <Badge key={variable} variant="secondary">
                              {variable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleCreateSpreadsheet}
                      disabled={isCreatingSpreadsheet || selectedVariables.length === 0}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {isCreatingSpreadsheet ? "Creating Spreadsheet..." : "Create Spreadsheet"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
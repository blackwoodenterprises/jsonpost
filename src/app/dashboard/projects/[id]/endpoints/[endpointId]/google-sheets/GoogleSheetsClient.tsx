"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileSpreadsheet,
  RefreshCw,
  Save,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
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
  google_sheets_column_mappings?: Record<string, string> | null;
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
  initialSpreadsheets: GoogleSheet[];
  initialAvailableSheets: SheetInfo[];
  initialSheetHeaders: string[];
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
  const { user, session } = useAuth();

  const [project] = useState<Project>(initialProject);
  const [endpoint, setEndpoint] = useState<Endpoint>(initialEndpoint);
  const [isSaving, setIsSaving] = useState(false);

  // Google Sheets state
  const [spreadsheets, setSpreadsheets] = useState<GoogleSheet[]>(initialSpreadsheets);
  const [selectedSpreadsheetId, setSelectedSpreadsheetId] = useState<string>(
    initialEndpoint.google_sheets_spreadsheet_id || ""
  );
  const [availableSheets, setAvailableSheets] = useState<SheetInfo[]>(initialAvailableSheets);
  const [selectedSheetName, setSelectedSheetName] = useState<string>(
    initialEndpoint.google_sheets_sheet_name || ""
  );
  const [sheetHeaders, setSheetHeaders] = useState<string[]>(initialSheetHeaders);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>(
    (initialEndpoint.google_sheets_column_mappings as Record<string, string>) || {}
  );

  // Loading states
  const [isLoadingSpreadsheets, setIsLoadingSpreadsheets] = useState(false);
  const [isLoadingSheets, setIsLoadingSheets] = useState(false);
  const [isLoadingHeaders, setIsLoadingHeaders] = useState(false);

  const loadSpreadsheets = async () => {
    if (!project?.google_sheets_access_token || !session?.access_token) return;

    setIsLoadingSpreadsheets(true);
    try {
      const response = await fetch("/api/google-sheets/spreadsheets", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "X-Project-ID": projectId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch spreadsheets");
      }

      const data = await response.json();
      setSpreadsheets(data.spreadsheets || []);
    } catch (error) {
      console.error("Error loading spreadsheets:", error);
      toast({
        title: "Error loading spreadsheets",
        description: "Failed to load spreadsheets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSpreadsheets(false);
    }
  };

  const loadSheets = async (spreadsheetId: string) => {
    if (!project?.google_sheets_access_token || !spreadsheetId || !session?.access_token) return;

    setIsLoadingSheets(true);
    try {
      const response = await fetch(
        `/api/google-sheets/sheets/${spreadsheetId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "X-Project-ID": projectId,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch sheets");
      }

      const data = await response.json();
      setAvailableSheets(data.sheets || []);
    } catch (error) {
      console.error("Error loading sheets:", error);
      toast({
        title: "Error loading sheets",
        description: "Failed to load sheets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSheets(false);
    }
  };

  const loadHeaders = async (spreadsheetId: string, sheetName: string) => {
    if (!project?.google_sheets_access_token || !spreadsheetId || !sheetName || !session?.access_token)
      return;

    setIsLoadingHeaders(true);
    try {
      const response = await fetch(
        `/api/google-sheets/headers/${spreadsheetId}/${encodeURIComponent(sheetName)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "X-Project-ID": projectId,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch headers");
      }

      const data = await response.json();
      setSheetHeaders(data.headers || []);
    } catch (error) {
      console.error("Error loading headers:", error);
      toast({
        title: "Error loading headers",
        description: "Failed to load headers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingHeaders(false);
    }
  };

  const refreshColumnsAndSync = async () => {
    if (!selectedSpreadsheetId || !selectedSheetName || !session?.access_token) return;

    setIsLoadingHeaders(true);
    try {
      // Fetch the latest headers from Google Sheets
      const response = await fetch(
        `/api/google-sheets/headers/${selectedSpreadsheetId}/${encodeURIComponent(selectedSheetName)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "X-Project-ID": projectId,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch headers");
      }

      const data = await response.json();
      const newHeaders = data.headers || [];
      
      // Update the sheet headers state
      setSheetHeaders(newHeaders);

      // Check for new columns that aren't in the current mapping
      const currentMappedColumns = Object.keys(columnMapping);
      const newColumns = newHeaders.filter((header: string) => 
        !currentMappedColumns.includes(header)
      );

      if (newColumns.length > 0) {
        toast({
          title: "New columns detected",
          description: `Found ${newColumns.length} new column(s). They are now available for mapping.`,
        });
      } else {
        toast({
          title: "Columns refreshed",
          description: "No new columns found.",
        });
      }
    } catch (error) {
      console.error("Error refreshing columns:", error);
      toast({
        title: "Error refreshing columns",
        description: "Failed to refresh columns. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingHeaders(false);
    }
  };

  const handleSpreadsheetChange = async (spreadsheetId: string) => {
    setSelectedSpreadsheetId(spreadsheetId);
    setSelectedSheetName("");
    setSheetHeaders([]);
    setColumnMapping({});

    if (spreadsheetId) {
      await loadSheets(spreadsheetId);
    }
  };

  const handleSheetChange = async (sheetName: string) => {
    setSelectedSheetName(sheetName);
    setSheetHeaders([]);
    setColumnMapping({});

    if (selectedSpreadsheetId && sheetName) {
      await loadHeaders(selectedSpreadsheetId, sheetName);
    }
  };

  const handleColumnMappingChange = (
    columnHeader: string,
    variablePath: string
  ) => {
    setColumnMapping((prev) => {
      const newMapping = { ...prev };
      if (variablePath === "__no_mapping__") {
        // Remove the mapping if "No mapping" is selected
        delete newMapping[columnHeader];
      } else {
        newMapping[columnHeader] = variablePath;
      }
      return newMapping;
    });
  };

  const handleSave = async () => {
    if (!endpoint) return;

    setIsSaving(true);
    try {
      const response = await fetch(`/api/endpoints/${endpointId}/google-sheets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          google_sheets_enabled: true,
          google_sheets_spreadsheet_id: selectedSpreadsheetId,
          google_sheets_sheet_name: selectedSheetName,
          google_sheets_column_mappings:
            Object.keys(columnMapping).length > 0 ? columnMapping : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save configuration");
      }

      const updatedEndpoint = await response.json();
      setEndpoint(updatedEndpoint);

      // Show success message
      toast({
        title: "Configuration saved successfully!",
        description: "Your Google Sheets integration has been configured.",
      });

      // Refresh the page to get updated data
      router.refresh();
    } catch (error) {
      console.error("Error saving Google Sheets configuration:", error);
      toast({
        title: "Error saving configuration",
        description: "Failed to save the configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisconnect = async () => {
    if (!endpoint) return;

    setIsSaving(true);
    try {
      console.log("Starting Google Sheets disconnect process", {
        endpointId,
        timestamp: new Date().toISOString()
      });

      const response = await fetch(`/api/endpoints/${endpointId}/google-sheets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          google_sheets_enabled: false,
          google_sheets_spreadsheet_id: null,
          google_sheets_sheet_name: null,
          google_sheets_column_mappings: null,
        }),
      });

      console.log("Disconnect API response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Disconnect API error:", {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        
        let errorMessage = "Failed to disconnect Google Sheets";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            errorMessage += `: ${errorData.details}`;
          }
        } catch {
          // If parsing fails, use the raw error text
          if (errorText) {
            errorMessage += `: ${errorText}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const updatedEndpoint = await response.json();
      console.log("Successfully disconnected, updated endpoint:", updatedEndpoint);
      
      setEndpoint(updatedEndpoint);

      // Reset state
      setSelectedSpreadsheetId("");
      setSelectedSheetName("");
      setSheetHeaders([]);
      setColumnMapping({});

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
              {/* Spreadsheet Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Spreadsheet Configuration</CardTitle>
                  <CardDescription>
                    Choose the Google Sheets spreadsheet and sheet to connect to this
                    endpoint
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="spreadsheet">Spreadsheet</Label>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={selectedSpreadsheetId}
                          onValueChange={handleSpreadsheetChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a spreadsheet" />
                          </SelectTrigger>
                          <SelectContent>
                            {spreadsheets.map((sheet) => (
                              <SelectItem
                                key={sheet.spreadsheetId}
                                value={sheet.spreadsheetId}
                              >
                                {sheet.properties.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={loadSpreadsheets}
                          disabled={isLoadingSpreadsheets}
                        >
                          <RefreshCw
                            className={`h-4 w-4 ${isLoadingSpreadsheets ? "animate-spin" : ""}`}
                          />
                        </Button>
                      </div>
                    </div>

                    {selectedSpreadsheetId && (
                      <div>
                        <Label htmlFor="sheet">Sheet</Label>
                        <Select
                          value={selectedSheetName}
                          onValueChange={handleSheetChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a sheet" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSheets.map((sheet) => (
                              <SelectItem key={sheet.name} value={sheet.name}>
                                {sheet.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Column Mapping */}
              {selectedSpreadsheetId &&
                selectedSheetName &&
                sheetHeaders.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Column Mapping</CardTitle>
                          <CardDescription>
                            Map your spreadsheet columns to endpoint variable paths
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={refreshColumnsAndSync}
                          disabled={isLoadingHeaders}
                        >
                          <RefreshCw
                            className={`h-4 w-4 mr-2 ${isLoadingHeaders ? "animate-spin" : ""}`}
                          />
                          Refresh Columns
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {endpoint.variable_paths &&
                      endpoint.variable_paths.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {sheetHeaders.map((header) => (
                            <div
                              key={header}
                              className="flex items-center space-x-4 p-4 border rounded-lg"
                            >
                              <div className="flex-1">
                                <Label className="text-sm font-medium">
                                  Spreadsheet Column
                                </Label>
                                <div className="mt-1">
                                  <Badge
                                    variant="secondary"
                                    className="font-mono"
                                  >
                                    {header}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex-1">
                                <Label className="text-sm font-medium">
                                  Variable Path
                                </Label>
                                <Select
                                  value={
                                    columnMapping[header] || "__no_mapping__"
                                  }
                                  onValueChange={(value) =>
                                    handleColumnMappingChange(header, value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select variable path" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="__no_mapping__">
                                      No mapping
                                    </SelectItem>
                                    {endpoint.variable_paths?.map(
                                      (variablePath) => (
                                        <SelectItem
                                          key={variablePath}
                                          value={variablePath}
                                        >
                                          {variablePath}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">
                            No variable paths configured
                          </p>
                          <p className="text-xs">
                            Configure variable paths in your endpoint settings
                            first
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

              {/* Actions */}
              <div className="flex justify-between">
                <div>
                  {endpoint.google_sheets_spreadsheet_id && (
                    <Button
                      variant="outline"
                      onClick={handleDisconnect}
                      disabled={isSaving}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Disconnect Sheet
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" asChild>
                    <Link
                      href={`/dashboard/projects/${projectId}/endpoints/${endpointId}`}
                    >
                      Cancel
                    </Link>
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={
                      isSaving || !selectedSpreadsheetId || !selectedSheetName
                    }
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Configuration"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
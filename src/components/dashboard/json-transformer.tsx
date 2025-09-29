'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Editor from '@monaco-editor/react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Code, Eye, RotateCcw, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Json } from '@/lib/database.types';

interface JsonTransformerProps {
  endpointId: string;
  webhooksEnabled: boolean;
  variablePaths: string[];
  initialEnabled?: boolean;
  initialTemplate?: Json;
}

interface LatestSubmission {
  id: string;
  data: Json;
  created_at: string | null;
}

export default function JsonTransformer({
  endpointId,
  webhooksEnabled,
  variablePaths,
  initialEnabled = false,
  initialTemplate = {}
}: JsonTransformerProps) {
  const { toast } = useToast();
  const editorRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [enabled, setEnabled] = useState(initialEnabled);
  const [template, setTemplate] = useState(JSON.stringify(initialTemplate, null, 2));
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState<LatestSubmission | null>(null);
  const [transformedJson, setTransformedJson] = useState<Json>(null);
  const [templateError, setTemplateError] = useState<string | null>(null);

  const fetchLatestSubmission = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("submissions")
        .select("id, data, created_at")
        .eq("endpoint_id", endpointId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      setLatestSubmission(data);
    } catch (error) {
      console.error("Error fetching latest submission:", error);
    }
  }, [endpointId]);

  // Fetch latest submission on component mount
  useEffect(() => {
    if (enabled) {
      fetchLatestSubmission();
    }
  }, [enabled, fetchLatestSubmission]);

  const validateTemplate = (templateStr: string): boolean => {
    try {
      JSON.parse(templateStr);
      setTemplateError(null);
      return true;
    } catch {
      setTemplateError("Invalid JSON template");
      return false;
    }
  };

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    validateTemplate(value);
  };

  const insertVariable = (variablePath: string) => {
    const variable = `{{${variablePath}}}`;
    
    if (editorRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      const position = selection ? selection.getStartPosition() : editor.getPosition();
      
      if (position) {
        editor.executeEdits('insert-variable', [{
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          },
          text: variable
        }]);
        
        // Move cursor to end of inserted text
        const newPosition = {
          lineNumber: position.lineNumber,
          column: position.column + variable.length
        };
        editor.setPosition(newPosition);
        editor.focus();
      }
    } else {
      // Fallback to appending if editor ref is not available
      setTemplate(prev => prev + variable);
    }
  };

  const handleToggle = async (newEnabled: boolean) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("endpoints")
        .update({ 
          webhook_json_transformation_enabled: newEnabled,
          webhook_json_transformation_template: newEnabled ? (JSON.parse(template) || {}) : null
        })
        .eq("id", endpointId);

      if (error) throw error;

      setEnabled(newEnabled);
      toast({
        title: "Success",
        description: `JSON Transformation ${newEnabled ? "enabled" : "disabled"}`,
      });

      if (newEnabled) {
        fetchLatestSubmission();
      }
    } catch (error) {
      console.error("Error toggling transformation:", error);
      toast({
        title: "Error",
        description: "Failed to update transformation settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!validateTemplate(template)) {
      toast({
        title: "Invalid Template",
        description: "Please fix the JSON template errors before saving",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const parsedTemplate = JSON.parse(template);
      const { error } = await supabase
        .from("endpoints")
        .update({ 
          webhook_json_transformation_template: parsedTemplate,
          webhook_json_transformation_enabled: enabled
        })
        .eq("id", endpointId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transformation template saved successfully",
      });
    } catch (error) {
      console.error("Error saving template:", error);
      toast({
        title: "Error",
        description: "Failed to save transformation template. Please check your JSON syntax.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = async () => {
    if (!latestSubmission || !validateTemplate(template)) {
      toast({
        title: "Cannot Preview",
        description: !latestSubmission 
          ? "No submissions available for preview" 
          : "Please fix template errors first",
        variant: "destructive",
      });
      return;
    }

    setPreviewing(true);
    try {
      const response = await fetch(`/api/endpoints/${endpointId}/transform-preview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: JSON.parse(template),
          data: latestSubmission.data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to preview transformation");
      }

      const result = await response.json();
      setTransformedJson(result.transformedData);
    } catch (error) {
      console.error("Error previewing transformation:", error);
      toast({
        title: "Preview Error",
        description: "Failed to generate preview",
        variant: "destructive",
      });
    } finally {
      setPreviewing(false);
    }
  };

  const handleReset = () => {
    setTemplate("{}");
    setTransformedJson(null);
    setTemplateError(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "JSON copied to clipboard",
    });
  };

  if (!webhooksEnabled) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          JSON Transformer
        </CardTitle>
        <CardDescription>
          Transform form submission data before sending to webhooks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="json-transformation-enabled"
            checked={enabled}
            onCheckedChange={handleToggle}
            disabled={saving}
          />
          <Label htmlFor="json-transformation-enabled">
            {saving ? "Updating..." : "Enable JSON Transformation"}
          </Label>
        </div>

        {enabled && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Template Editor */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="template-editor" className="text-sm font-medium">
                    Transformation Template
                  </Label>
                  <div className="mt-2">
                    <Editor
                      height="256px"
                      defaultLanguage="json"
                      value={template}
                      onChange={(value) => handleTemplateChange(value || '')}
                      onMount={(editor) => {
                        editorRef.current = editor;
                      }}
                      options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollbar: {
                          vertical: 'auto',
                          horizontal: 'auto'
                        },
                        automaticLayout: true,
                        formatOnPaste: true,
                        formatOnType: true,
                        wordWrap: 'on'
                      }}
                      theme="vs-dark"
                    />
                    {templateError && (
                      <p className="mt-1 text-sm text-red-600">{templateError}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving || !!templateError}>
                    {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Save Transformation
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Default
                  </Button>
                </div>
              </div>

              {/* Variable Reference */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Available Variables</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click to insert into template
                  </p>
                </div>
                <div className="h-64 border rounded-md p-3 overflow-y-auto">
                  <div className="space-y-2">
                    {variablePaths.length > 0 ? (
                      variablePaths.map((path, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 text-xs"
                          onClick={() => insertVariable(path)}
                        >
                          {path}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No variables available. Submit a form to generate variable paths.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="border-t pt-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Preview Transformation</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreview}
                    disabled={previewing || !latestSubmission || !!templateError}
                  >
                    {previewing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Eye className="h-4 w-4 mr-2" />
                    )}
                    Preview Transformation
                  </Button>
                </div>

                <Tabs defaultValue="raw" className="w-full">
                  <TabsList>
                    <TabsTrigger value="raw">Latest Submission (Raw JSON)</TabsTrigger>
                    <TabsTrigger value="transformed">Transformed JSON</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="raw" className="mt-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => copyToClipboard(JSON.stringify(latestSubmission?.data, null, 2))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm overflow-auto max-h-64">
                        {latestSubmission 
                          ? JSON.stringify(latestSubmission.data, null, 2)
                          : "No submissions available"
                        }
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transformed" className="mt-4">
                    <div className="relative">
                      {transformedJson && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 z-10"
                          onClick={() => copyToClipboard(JSON.stringify(transformedJson, null, 2))}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                      <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm overflow-auto max-h-64">
                        {transformedJson 
                          ? JSON.stringify(transformedJson, null, 2)
                          : "Click 'Preview Transformation' to see the result"
                        }
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
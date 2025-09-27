"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Json } from "@/lib/database.types";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Eye,
  Save,
  Copy,
  ExternalLink,
  Settings,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import themesData from "@/lib/themes.json";
import customerFeedbackForm from "@/../form_definitions/customer-feedback-form.json";
import demoForm from "@/../form_definitions/demo-form.json";
import eventRegistrationForm from "@/../form_definitions/event-registration-form.json";
import jobApplicationForm from "@/../form_definitions/job-application-form.json";

const themes = themesData as Array<{
  id: string;
  name: string;
  description: string;
  colors: string[];
}>;

interface Project {
  id: string;
  name: string;
}

interface Endpoint {
  id: string;
  name: string;
  description: string | null;
  form_json: Json | null;
  theme_id: string | null;
  path: string;
}

interface FormStep {
  id: string;
  type: string;
  title: string;
  content?: string; // For statement type
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    minDate?: string;
    maxDate?: string;
  };
  options?: Array<{ value: string; label: string }>;
  mask?: string; // For phone type
  maxStars?: number; // For star_rating
  labels?: Record<string, string>; // For star_rating
  scale?: { // For opinion_scale
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  acceptedTypes?: string[]; // For file_upload
  maxSize?: string; // For file_upload
  multiple?: boolean; // For file_upload
  fields?: Record<string, { label: string; required: boolean }>; // For address and contact_info
}

interface FormSchema {
  title: string;
  description: string;
  submitEndpoint: string;
  steps: FormStep[];
}

const FIELD_TYPES = [
  { value: "statement", label: "Statement", description: "Display text only" },
  { value: "short_text", label: "Short Text", description: "Single line input" },
  { value: "long_text", label: "Long Text", description: "Multi-line textarea" },
  { value: "email", label: "Email", description: "Email input with validation" },
  { value: "phone", label: "Phone", description: "Phone number input" },
  { value: "website", label: "Website", description: "URL input with validation" },
  { value: "number", label: "Number", description: "Numeric input" },
  { value: "single_select", label: "Single Select", description: "Radio buttons" },
  { value: "multiple_select", label: "Multiple Select", description: "Checkboxes" },
  { value: "dropdown", label: "Dropdown", description: "Select dropdown" },
  { value: "date", label: "Date", description: "Date picker" },
  { value: "address", label: "Address", description: "Address fields (fixed structure)" },
  { value: "contact_info", label: "Contact Info", description: "Contact form fields (fixed structure)" },
  { value: "star_rating", label: "Star Rating", description: "Star rating input" },
  { value: "opinion_scale", label: "Opinion Scale", description: "Scale rating" },
  { value: "file_upload", label: "File Upload", description: "File upload input" },
];

export default function FormBuilderPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const params = useParams();
  const projectId = params.id as string;
  const endpointId = params.endpointId as string;

  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [formSchema, setFormSchema] = useState<FormSchema>({
    title: "Untitled Form",
    description: "Form description",
    submitEndpoint: "",
    steps: [],
  });
  const [selectedTheme, setSelectedTheme] = useState<string>("default");
  const [editingStep, setEditingStep] = useState<FormStep | null>(null);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      // Fetch project
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .eq("user_id", user.id)
        .single();

      if (projectError) throw projectError;
      // Project data fetched but not stored since it's not used in the component

      // Fetch endpoint
      const { data: endpointData, error: endpointError } = await supabase
        .from("endpoints")
        .select("*")
        .eq("id", endpointId)
        .eq("project_id", projectId)
        .single();

      if (endpointError) throw endpointError;
      setEndpoint(endpointData);

      // Set submit endpoint URL
      const submitUrl = `${window.location.origin}/api/submit/${endpointData.id}`;
      
      // Load existing form or create default
      if (endpointData.form_json && typeof endpointData.form_json === 'object') {
        setFormSchema(endpointData.form_json as unknown as FormSchema);
      } else {
        setFormSchema(prev => ({
          ...prev,
          submitEndpoint: submitUrl,
        }));
      }

      if (endpointData.theme_id) {
        setSelectedTheme(endpointData.theme_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, projectId, endpointId]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const addStep = (type: string) => {
    const newStep: FormStep = {
      id: `step_${Date.now()}`,
      type,
      title: `New ${FIELD_TYPES.find(t => t.value === type)?.label || type}`,
      required: false,
    };

    // Set default properties based on type
    if (type === "statement") {
      newStep.content = "Your statement content here";
    } else if (type === "phone") {
      newStep.mask = "(999) 999-9999";
    } else if (type === "single_select" || type === "multiple_select" || type === "dropdown") {
      newStep.options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
      ];
    } else if (type === "star_rating") {
      newStep.maxStars = 5;
      newStep.labels = {
        "1": "Poor",
        "2": "Fair",
        "3": "Good",
        "4": "Very Good",
        "5": "Excellent"
      };
    } else if (type === "opinion_scale") {
      newStep.scale = {
        min: 1,
        max: 10,
        minLabel: "Not satisfied",
        maxLabel: "Very satisfied"
      };
    } else if (type === "file_upload") {
      newStep.acceptedTypes = [".pdf", ".doc", ".docx"];
      newStep.maxSize = "5MB";
      newStep.multiple = false;
    } else if (type === "address") {
      newStep.fields = {
        street: { label: "Street Address", required: true },
        city: { label: "City", required: true },
        state: { label: "State/Province", required: true },
        zip: { label: "ZIP/Postal Code", required: true },
        country: { label: "Country", required: true }
      };
    } else if (type === "contact_info") {
      newStep.fields = {
        firstName: { label: "First Name", required: true },
        lastName: { label: "Last Name", required: true },
        email: { label: "Email Address", required: true },
        phone: { label: "Phone Number", required: true },
        address: { label: "Home Address", required: false }
      };
    } else {
      newStep.placeholder = `Enter your ${type.replace('_', ' ')}`;
    }

    setFormSchema(prev => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));
  };

  const removeStep = (stepId: string) => {
    setFormSchema(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId),
    }));
  };

  const moveStep = (stepId: string, direction: "up" | "down") => {
    setFormSchema(prev => {
      const steps = [...prev.steps];
      const index = steps.findIndex(step => step.id === stepId);
      
      if (direction === "up" && index > 0) {
        [steps[index], steps[index - 1]] = [steps[index - 1], steps[index]];
      } else if (direction === "down" && index < steps.length - 1) {
        [steps[index], steps[index + 1]] = [steps[index + 1], steps[index]];
      }
      
      return { ...prev, steps };
    });
  };

  const updateStep = (updatedStep: FormStep) => {
    setFormSchema(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === updatedStep.id ? updatedStep : step
      ),
    }));
    setEditingStep(null);
  };

  const loadTemplate = (templateName: string) => {
    try {
      let templateData;
      
      switch (templateName) {
        case "customer-feedback-form":
          templateData = customerFeedbackForm;
          break;
        case "demo-form":
          templateData = demoForm;
          break;
        case "event-registration-form":
          templateData = eventRegistrationForm;
          break;
        case "job-application-form":
          templateData = jobApplicationForm;
          break;
        default:
          console.error("Unknown template:", templateName);
          return;
      }
      
      // Update the submit endpoint to match current endpoint
      const submitUrl = `${window.location.origin}/api/submit/${endpointId}`;
      
      setFormSchema({
        ...templateData,
        submitEndpoint: submitUrl,
      } as FormSchema);
    } catch (error) {
      console.error("Error loading template:", error);
    }
  };

  const saveForm = async () => {
    if (!endpoint) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("endpoints")
        .update({
          form_json: formSchema as unknown as Json,
          theme_id: selectedTheme,
        })
        .eq("id", endpointId);

      if (error) throw error;
      
      toast({
        title: "Form saved successfully!",
        description: "Your form has been saved and is ready to use.",
      });
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        title: "Error saving form",
        description: "Failed to save the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const generatePreviewUrl = () => {
    if (!endpoint) return "";
    const themeId = selectedTheme || "default";
    return `https://forms.jsonpost.com/form/${endpoint.id}/${themeId}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading form builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title={`Form Builder - ${endpoint?.name}`}
        subtitle={`Build a custom form for ${endpoint?.name}`}
        actions={
          <div className="flex space-x-3">
            <Link href={`/dashboard/projects/${projectId}/endpoints/${endpointId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Endpoint
              </Button>
            </Link>
            <Button
              onClick={() => window.open(generatePreviewUrl(), "_blank")}
              variant="outline"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Form
            </Button>
            <Button onClick={saveForm} disabled={isSaving} size="sm">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Form"}
            </Button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery and Templates Box */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-medium">Form Gallery & Templates</h3>
                  <p className="text-sm text-gray-600">Explore form examples or load pre-built templates</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://forms.jsonpost.com", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Gallery
                </Button>
                {formSchema.steps.length === 0 && (
                  <Select onValueChange={loadTemplate}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Load Template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demo-form">Demo Form Wizard</SelectItem>
                      <SelectItem value="customer-feedback-form">Customer Feedback</SelectItem>
                      <SelectItem value="event-registration-form">Event Registration</SelectItem>
                      <SelectItem value="job-application-form">Job Application</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
                <CardDescription>Configure your form&apos;s basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input
                    id="form-title"
                    value={formSchema.title}
                    onChange={(e) => setFormSchema(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter form title"
                  />
                </div>
                <div>
                  <Label htmlFor="form-description">Form Description</Label>
                  <Textarea
                    id="form-description"
                    value={formSchema.description}
                    onChange={(e) => setFormSchema(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter form description"
                    rows={3}
                  />
                </div>

              </CardContent>
            </Card>

            {/* Form Steps */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Form Steps</CardTitle>
                  <CardDescription>Each step represents one question in your form</CardDescription>
                </div>
                <Select onValueChange={addStep}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Add Step" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELD_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                {formSchema.steps.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No steps added yet. Add your first step using the dropdown above.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formSchema.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className="group flex items-start gap-4 p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200"
                      >
                        {/* Move Controls */}
                        <div className="flex flex-col gap-1 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveStep(step.id, "up")}
                            disabled={index === 0}
                            className="h-8 w-8 p-0 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30"
                            title="Move up"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveStep(step.id, "down")}
                            disabled={index === formSchema.steps.length - 1}
                            className="h-8 w-8 p-0 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30"
                            title="Move down"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Step Number */}
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-semibold mt-1">
                          {index + 1}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                                {step.title || "Untitled Step"}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                  {FIELD_TYPES.find(t => t.value === step.type)?.label}
                                </Badge>
                                {step.required && (
                                  <Badge variant="outline" className="border-orange-300 text-orange-700 dark:border-orange-600 dark:text-orange-400">
                                    Required
                                  </Badge>
                                )}
                              </div>
                              {step.content && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {step.content}
                                </p>
                              )}
                              {step.placeholder && (
                                <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                                  Placeholder: {step.placeholder}
                                </p>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1 ml-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingStep(step)}
                                className="h-9 w-9 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                title="Edit step"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeStep(step.id)}
                                className="h-9 w-9 p-0 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                title="Delete step"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Form Preview Info */}
          <div className="space-y-6">
            {/* Theme & Gallery Box */}
            <Card>
              <CardHeader>
                <CardTitle>Theme & Gallery</CardTitle>
                <CardDescription>Customize appearance and explore examples</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Theme</Label>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {themes.find(t => t.id === selectedTheme)?.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {themes.find(t => t.id === selectedTheme)?.name || "Default"}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setThemeModalOpen(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open("https://forms.jsonpost.com", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Form Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Production</CardTitle>
                <CardDescription>Your live form URL with selected theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Production URL</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      value={generatePreviewUrl()}
                      readOnly
                      className="text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(generatePreviewUrl())}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => window.open(generatePreviewUrl(), "_blank")}
                  className="w-full"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Form
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Step Editor Dialog */}
      {editingStep && (
        <StepEditorDialog
          step={editingStep}
          onSave={updateStep}
          onCancel={() => setEditingStep(null)}
        />
      )}

      {/* Theme Selection Modal */}
      <Dialog open={themeModalOpen} onOpenChange={setThemeModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Choose a Theme</DialogTitle>
            <DialogDescription>
              Select a theme for your form. This will affect the appearance of your form when users fill it out.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTheme === theme.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-sm text-gray-500">{theme.description}</div>
                  </div>
                  <div className="flex space-x-1">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setThemeModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setThemeModalOpen(false)}>
              Apply Theme
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StepEditorDialog({
  step,
  onSave,
  onCancel,
}: {
  step: FormStep;
  onSave: (step: FormStep) => void;
  onCancel: () => void;
}) {
  const [editedStep, setEditedStep] = useState<FormStep>({ ...step });

  const handleSave = () => {
    onSave(editedStep);
  };

  const addOption = () => {
    const newOptions = [...(editedStep.options || [])];
    newOptions.push({ value: `option${newOptions.length + 1}`, label: `Option ${newOptions.length + 1}` });
    setEditedStep(prev => ({ ...prev, options: newOptions }));
  };

  const updateOption = (index: number, field: 'value' | 'label', value: string) => {
    const newOptions = [...(editedStep.options || [])];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setEditedStep(prev => ({ ...prev, options: newOptions }));
  };

  const removeOption = (index: number) => {
    const newOptions = [...(editedStep.options || [])];
    newOptions.splice(index, 1);
    setEditedStep(prev => ({ ...prev, options: newOptions }));
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Step: {FIELD_TYPES.find(t => t.value === step.type)?.label}</DialogTitle>
          <DialogDescription>
            Configure the properties for this form step
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Properties */}
          <div>
            <Label htmlFor="step-title">Title</Label>
            <Input
              id="step-title"
              value={editedStep.title}
              onChange={(e) => setEditedStep(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter step title"
            />
          </div>

          {/* Statement Content */}
          {editedStep.type === "statement" && (
            <div>
              <Label htmlFor="step-content">Content</Label>
              <Textarea
                id="step-content"
                value={editedStep.content || ""}
                onChange={(e) => setEditedStep(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter statement content"
                rows={3}
              />
            </div>
          )}

          {/* Placeholder for input fields */}
          {!["statement", "single_select", "multiple_select", "dropdown", "address", "contact_info", "star_rating", "opinion_scale", "file_upload"].includes(editedStep.type) && (
            <div>
              <Label htmlFor="step-placeholder">Placeholder</Label>
              <Input
                id="step-placeholder"
                value={editedStep.placeholder || ""}
                onChange={(e) => setEditedStep(prev => ({ ...prev, placeholder: e.target.value }))}
                placeholder="Enter placeholder text"
              />
            </div>
          )}

          {/* Required Toggle */}
          {editedStep.type !== "statement" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="step-required"
                checked={editedStep.required}
                onCheckedChange={(checked) => setEditedStep(prev => ({ ...prev, required: checked }))}
              />
              <Label htmlFor="step-required">Required field</Label>
            </div>
          )}

          {/* Options for select fields */}
          {["single_select", "multiple_select", "dropdown"].includes(editedStep.type) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Options</Label>
                <Button variant="outline" size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {editedStep.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Value"
                      value={option.value}
                      onChange={(e) => updateOption(index, 'value', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Label"
                      value={option.label}
                      onChange={(e) => updateOption(index, 'label', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Star Rating Configuration */}
          {editedStep.type === "star_rating" && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="max-stars">Maximum Stars</Label>
                <Input
                  id="max-stars"
                  type="number"
                  min="1"
                  max="10"
                  value={editedStep.maxStars || 5}
                  onChange={(e) => setEditedStep(prev => ({ ...prev, maxStars: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label>Star Labels (Optional)</Label>
                <div className="space-y-2">
                  {Array.from({ length: editedStep.maxStars || 5 }, (_, i) => i + 1).map(star => (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="w-8 text-sm">{star}★</span>
                      <Input
                        placeholder={`Label for ${star} star${star > 1 ? 's' : ''}`}
                        value={editedStep.labels?.[star.toString()] || ""}
                        onChange={(e) => setEditedStep(prev => ({
                          ...prev,
                          labels: { ...prev.labels, [star.toString()]: e.target.value }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Opinion Scale Configuration */}
          {editedStep.type === "opinion_scale" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="scale-min">Minimum Value</Label>
                  <Input
                    id="scale-min"
                    type="number"
                    value={editedStep.scale?.min || 1}
                    onChange={(e) => setEditedStep(prev => ({
                      ...prev,
                      scale: { ...prev.scale!, min: parseInt(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="scale-max">Maximum Value</Label>
                  <Input
                    id="scale-max"
                    type="number"
                    value={editedStep.scale?.max || 10}
                    onChange={(e) => setEditedStep(prev => ({
                      ...prev,
                      scale: { ...prev.scale!, max: parseInt(e.target.value) }
                    }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="scale-min-label">Minimum Label</Label>
                  <Input
                    id="scale-min-label"
                    value={editedStep.scale?.minLabel || ""}
                    onChange={(e) => setEditedStep(prev => ({
                      ...prev,
                      scale: { ...prev.scale!, minLabel: e.target.value }
                    }))}
                    placeholder="e.g., Not satisfied"
                  />
                </div>
                <div>
                  <Label htmlFor="scale-max-label">Maximum Label</Label>
                  <Input
                    id="scale-max-label"
                    value={editedStep.scale?.maxLabel || ""}
                    onChange={(e) => setEditedStep(prev => ({
                      ...prev,
                      scale: { ...prev.scale!, maxLabel: e.target.value }
                    }))}
                    placeholder="e.g., Very satisfied"
                  />
                </div>
              </div>
            </div>
          )}

          {/* File Upload Configuration */}
          {editedStep.type === "file_upload" && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="accepted-types">Accepted File Types</Label>
                <Input
                  id="accepted-types"
                  value={editedStep.acceptedTypes?.join(", ") || ""}
                  onChange={(e) => setEditedStep(prev => ({
                    ...prev,
                    acceptedTypes: e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                  }))}
                  placeholder="e.g., .pdf, .doc, .docx"
                />
              </div>
              <div>
                <Label htmlFor="max-size">Maximum File Size</Label>
                <Input
                  id="max-size"
                  value={editedStep.maxSize || ""}
                  onChange={(e) => setEditedStep(prev => ({ ...prev, maxSize: e.target.value }))}
                  placeholder="e.g., 5MB"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="multiple-files"
                  checked={editedStep.multiple || false}
                  onCheckedChange={(checked) => setEditedStep(prev => ({ ...prev, multiple: checked }))}
                />
                <Label htmlFor="multiple-files">Allow multiple files</Label>
              </div>
            </div>
          )}

          {/* Validation Rules */}
          {!["statement", "address", "contact_info", "star_rating", "opinion_scale", "file_upload"].includes(editedStep.type) && (
            <div>
              <Label>Validation Rules (Optional)</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["short_text", "long_text", "email"].includes(editedStep.type) && (
                  <>
                    <div>
                      <Label htmlFor="min-length">Min Length</Label>
                      <Input
                        id="min-length"
                        type="number"
                        min="0"
                        value={editedStep.validation?.minLength || ""}
                        onChange={(e) => setEditedStep(prev => ({
                          ...prev,
                          validation: { ...prev.validation, minLength: e.target.value ? parseInt(e.target.value) : undefined }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-length">Max Length</Label>
                      <Input
                        id="max-length"
                        type="number"
                        min="0"
                        value={editedStep.validation?.maxLength || ""}
                        onChange={(e) => setEditedStep(prev => ({
                          ...prev,
                          validation: { ...prev.validation, maxLength: e.target.value ? parseInt(e.target.value) : undefined }
                        }))}
                      />
                    </div>
                  </>
                )}
                {editedStep.type === "number" && (
                  <>
                    <div>
                      <Label htmlFor="min-value">Min Value</Label>
                      <Input
                        id="min-value"
                        type="number"
                        value={editedStep.validation?.min || ""}
                        onChange={(e) => setEditedStep(prev => ({
                          ...prev,
                          validation: { ...prev.validation, min: e.target.value ? parseInt(e.target.value) : undefined }
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-value">Max Value</Label>
                      <Input
                        id="max-value"
                        type="number"
                        value={editedStep.validation?.max || ""}
                        onChange={(e) => setEditedStep(prev => ({
                          ...prev,
                          validation: { ...prev.validation, max: e.target.value ? parseInt(e.target.value) : undefined }
                        }))}
                      />
                    </div>
                  </>
                )}
                {["website", "email"].includes(editedStep.type) && (
                  <div className="col-span-2">
                    <Label htmlFor="pattern">Pattern (Regex)</Label>
                    <Input
                      id="pattern"
                      value={editedStep.validation?.pattern || ""}
                      onChange={(e) => setEditedStep(prev => ({
                        ...prev,
                        validation: { ...prev.validation, pattern: e.target.value }
                      }))}
                      placeholder="Regular expression pattern"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fixed Fields Info for Address and Contact Info */}
          {["address", "contact_info"].includes(editedStep.type) && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Fixed Fields Structure
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-300">
                {editedStep.type === "address" 
                  ? "This field includes: Street Address, City, State/Province, ZIP/Postal Code, Country"
                  : "This field includes: First Name, Last Name, Email Address, Phone Number, Home Address"
                }
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
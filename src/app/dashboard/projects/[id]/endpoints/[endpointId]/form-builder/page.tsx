"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
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
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import themesData from "@/lib/themes.json";
import customerFeedbackForm from "@/../form_definitions/customer-feedback-form.json";
import demoForm from "@/../form_definitions/demo-form.json";
import eventRegistrationForm from "@/../form_definitions/event-registration-form.json";
import fitnessMemership from "@/../form_definitions/fitness-membership.json";
import healthcareAppointment from "@/../form_definitions/healthcare-appointment.json";
import jobApplicationForm from "@/../form_definitions/job-application-form.json";
import onlineCourseEnrollment from "@/../form_definitions/online-course-enrollment.json";
import petAdoption from "@/../form_definitions/pet-adoption.json";
import productLaunchSurvey from "@/../form_definitions/product-launch-survey.json";
import realEstateInquiry from "@/../form_definitions/real-estate-inquiry.json";
import restaurantReservation from "@/../form_definitions/restaurant-reservation.json";
import travelBooking from "@/../form_definitions/travel-booking.json";
import volunteerApplication from "@/../form_definitions/volunteer-application.json";
import weddingPlanning from "@/../form_definitions/wedding-planning.json";

const themes = themesData as Array<{
  id: string;
  name: string;
  description: string;
  colors: string[];
}>;

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
  scale?: {
    // For opinion_scale
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

const TEMPLATE_GALLERY = [
  {
    id: "blank",
    name: "Create a Blank Form",
    description: "Start with a simple welcome statement",
    icon: "📝",
    action: "blank",
  },
  {
    id: "demo-form",
    name: "Demo Form Wizard",
    description: "A comprehensive demo showcasing various field types",
    icon: "🎯",
    action: "template",
  },
  {
    id: "customer-feedback-form",
    name: "Customer Feedback",
    description: "Collect customer feedback and ratings",
    icon: "💬",
    action: "template",
  },
  {
    id: "event-registration-form",
    name: "Event Registration",
    description: "Register attendees for events",
    icon: "🎟️",
    action: "template",
  },
  {
    id: "fitness-membership",
    name: "Fitness Membership",
    description: "Gym and fitness membership application",
    icon: "💪",
    action: "template",
  },
  {
    id: "healthcare-appointment",
    name: "Healthcare Appointment",
    description: "Schedule medical appointments",
    icon: "🏥",
    action: "template",
  },
  {
    id: "job-application-form",
    name: "Job Application",
    description: "Employment application form",
    icon: "💼",
    action: "template",
  },
  {
    id: "online-course-enrollment",
    name: "Online Course Enrollment",
    description: "Enroll students in online courses",
    icon: "📚",
    action: "template",
  },
  {
    id: "pet-adoption",
    name: "Pet Adoption",
    description: "Pet adoption application form",
    icon: "🐕",
    action: "template",
  },
  {
    id: "product-launch-survey",
    name: "Product Launch Survey",
    description: "Gather feedback for product launches",
    icon: "🚀",
    action: "template",
  },
  {
    id: "real-estate-inquiry",
    name: "Real Estate Inquiry",
    description: "Property inquiry and contact form",
    icon: "🏠",
    action: "template",
  },
  {
    id: "restaurant-reservation",
    name: "Restaurant Reservation",
    description: "Make restaurant reservations",
    icon: "🍽️",
    action: "template",
  },
  {
    id: "travel-booking",
    name: "Travel Booking",
    description: "Book travel and accommodations",
    icon: "✈️",
    action: "template",
  },
  {
    id: "volunteer-application",
    name: "Volunteer Application",
    description: "Apply for volunteer opportunities",
    icon: "🤝",
    action: "template",
  },
  {
    id: "wedding-planning",
    name: "Wedding Planning",
    description: "Plan your perfect wedding",
    icon: "💒",
    action: "template",
  },
];

const FIELD_TYPES = [
  { value: "statement", label: "Statement", description: "Display text only" },
  {
    value: "short_text",
    label: "Short Text",
    description: "Single line input",
  },
  {
    value: "long_text",
    label: "Long Text",
    description: "Multi-line textarea",
  },
  {
    value: "email",
    label: "Email",
    description: "Email input with validation",
  },
  { value: "phone", label: "Phone", description: "Phone number input" },
  {
    value: "website",
    label: "Website",
    description: "URL input with validation",
  },
  { value: "number", label: "Number", description: "Numeric input" },
  {
    value: "single_select",
    label: "Single Select",
    description: "Radio buttons",
  },
  {
    value: "multiple_select",
    label: "Multiple Select",
    description: "Checkboxes",
  },
  { value: "dropdown", label: "Dropdown", description: "Select dropdown" },
  { value: "date", label: "Date", description: "Date picker" },
  {
    value: "address",
    label: "Address",
    description: "Address fields (fixed structure)",
  },
  {
    value: "contact_info",
    label: "Contact Info",
    description: "Contact form fields (fixed structure)",
  },
  {
    value: "star_rating",
    label: "Star Rating",
    description: "Star rating input",
  },
  {
    value: "opinion_scale",
    label: "Opinion Scale",
    description: "Scale rating",
  },
  {
    value: "file_upload",
    label: "File Upload",
    description: "File upload input",
  },
];

// Utility function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

// Utility function to ensure unique slug
const ensureUniqueSlug = (
  baseSlug: string,
  existingSteps: FormStep[],
  excludeId?: string
): string => {
  let slug = baseSlug || "untitled";
  let counter = 1;

  while (
    existingSteps.some((step) => step.id === slug && step.id !== excludeId)
  ) {
    slug = `${baseSlug || "untitled"}-${counter}`;
    counter++;
  }

  return slug;
};

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
  const [selectedStepType, setSelectedStepType] = useState<string>("");
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Short link state
  const [shortLinkModalOpen, setShortLinkModalOpen] = useState(false);
  const [shortLinkFormType, setShortLinkFormType] = useState<"single-page" | "multi-step">("single-page");
  const [shortLinkTheme, setShortLinkTheme] = useState<string>("default");
  const [isGeneratingShortLink, setIsGeneratingShortLink] = useState(false);
  const [existingShortLinks, setExistingShortLinks] = useState<Array<{
    id: string;
    short_code: string;
    endpoint_id: string;
    form_type: string;
    theme: string;
    created_at: string | null;
    updated_at: string | null;
  }>>([]);

  // Auto-save key for localStorage
  const autoSaveKey = `form-builder-${endpointId}`;

  // Auto-save to localStorage whenever form data changes
  useEffect(() => {
    if (formSchema.steps.length > 0 && !isLoading) {
      const autoSaveData = {
        formSchema,
        selectedTheme,
        timestamp: Date.now(),
        lastSaveTimestamp: Date.now(), // Track when this auto-save was created
      };
      localStorage.setItem(autoSaveKey, JSON.stringify(autoSaveData));
      setHasUnsavedChanges(true);
    }
  }, [formSchema, selectedTheme, autoSaveKey, isLoading]);

  // Load auto-saved data on component mount
  useEffect(() => {
    const loadAutoSavedData = () => {
      try {
        const autoSavedData = localStorage.getItem(autoSaveKey);
        if (autoSavedData) {
          const parsed = JSON.parse(autoSavedData);
          const timeDiff = Date.now() - parsed.timestamp;

          // Only load if auto-save is less than 24 hours old
          if (timeDiff < 24 * 60 * 60 * 1000) {
            return parsed;
          } else {
            // Clean up old auto-save data
            localStorage.removeItem(autoSaveKey);
          }
        }
      } catch (error) {
        console.error("Error loading auto-saved data:", error);
        localStorage.removeItem(autoSaveKey);
      }
      return null;
    };

    const autoSavedData = loadAutoSavedData();
    if (autoSavedData && !isLoading) {
      // Show toast to inform user about auto-saved data
      toast({
        title: "Auto-saved data found",
        description:
          "We've restored your unsaved changes from your last session.",
      });
    }
  }, [autoSaveKey, isLoading, toast]);

  // Handle browser events to prevent data loss
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && hasUnsavedChanges) {
        // Auto-save when tab becomes hidden
        const autoSaveData = {
          formSchema,
          selectedTheme,
          timestamp: Date.now(),
          lastSaveTimestamp: parseInt(localStorage.getItem("last-save") || "0"),
        };
        localStorage.setItem(autoSaveKey, JSON.stringify(autoSaveData));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasUnsavedChanges, formSchema, selectedTheme, autoSaveKey]);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;

    try {
      // Check for auto-saved data first
      const autoSavedData = localStorage.getItem(autoSaveKey);
      const lastSaveTimestamp = localStorage.getItem(
        `${autoSaveKey}-last-save`
      );
      let hasAutoSave = false;

      if (autoSavedData) {
        try {
          const parsed = JSON.parse(autoSavedData);
          const timeDiff = Date.now() - parsed.timestamp;
          const isRecentAutoSave = timeDiff < 24 * 60 * 60 * 1000; // Less than 24 hours

          // Check if auto-save is newer than the last database save
          const autoSaveTime = parsed.timestamp || 0;
          const lastSaveTime = lastSaveTimestamp
            ? parseInt(lastSaveTimestamp)
            : 0;
          const isNewerThanLastSave = autoSaveTime > lastSaveTime;

          hasAutoSave = isRecentAutoSave && isNewerThanLastSave;

          if (!hasAutoSave && autoSavedData) {
            // Clean up outdated auto-save data
            localStorage.removeItem(autoSaveKey);
          }
        } catch (error) {
          console.error("Error parsing auto-saved data:", error);
          localStorage.removeItem(autoSaveKey);
        }
      }

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

      // Set submit endpoint URL using project ID
      const submitUrl = `${window.location.origin}/api/submit/${params.id}/${endpointData.path}`;

      // Load auto-saved data if available, otherwise load from database
      if (hasAutoSave) {
        const parsed = JSON.parse(autoSavedData!);
        setFormSchema({
          ...parsed.formSchema,
          submitEndpoint: submitUrl,
        });
        setSelectedTheme(parsed.selectedTheme);
        setHasUnsavedChanges(true);

        toast({
          title: "Auto-saved data restored",
          description:
            "Your unsaved changes have been restored. Don't forget to save!",
          variant: "default",
        });
      } else {
        // Load existing form or create default
        if (
          endpointData.form_json &&
          typeof endpointData.form_json === "object"
        ) {
          const existingFormSchema =
            endpointData.form_json as unknown as FormSchema;
          // Ensure submitEndpoint is always set, even if it was stored in the database
          setFormSchema({
            ...existingFormSchema,
            submitEndpoint: submitUrl,
          });
        } else {
          setFormSchema((prev) => ({
            ...prev,
            submitEndpoint: submitUrl,
          }));
        }

        if (endpointData.theme_id) {
          setSelectedTheme(endpointData.theme_id);
        }
        setHasUnsavedChanges(false);
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
  }, [user]);

  const handleTemplateAction = (template: { id: string; action: string }) => {
    if (template.action === "blank") {
      createBlankForm();
    } else {
      loadTemplate(template.id);
    }
  };

  const getPreviewUrl = (formSlug: string, type: "single" | "multi") => {
    const currentTheme = selectedTheme || "default";
    return `https://forms.jsonpost.com/${type}-page/${formSlug}/${currentTheme}`;
  };

  const createBlankForm = () => {
    const newStep: FormStep = {
      id: generateSlug("Welcome"),
      type: "statement",
      title: "Welcome",
      content: "Welcome to our form! Please provide the requested information.",
      required: false,
    };

    setFormSchema((prev) => ({
      ...prev,
      steps: [newStep],
    }));
  };

  const handleAddStep = () => {
    if (!selectedStepType) {
      toast({
        title: "No step type selected",
        description: "Please select a step type from the dropdown first.",
        variant: "destructive",
      });
      return;
    }

    addStep(selectedStepType);
    setSelectedStepType(""); // Reset selection after adding
  };

  const addStep = (type: string) => {
    const fieldLabel = FIELD_TYPES.find((t) => t.value === type)?.label || type;
    const title = `New ${fieldLabel}`;
    const baseSlug = generateSlug(title);
    const uniqueSlug = ensureUniqueSlug(baseSlug, formSchema.steps);

    const newStep: FormStep = {
      id: uniqueSlug,
      type,
      title,
      required: false,
    };

    // Set default properties based on type
    if (type === "statement") {
      newStep.content = "Your statement content here";
    } else if (type === "phone") {
      newStep.mask = "(999) 999-9999";
    } else if (
      type === "single_select" ||
      type === "multiple_select" ||
      type === "dropdown"
    ) {
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
        "5": "Excellent",
      };
    } else if (type === "opinion_scale") {
      newStep.scale = {
        min: 1,
        max: 10,
        minLabel: "Not satisfied",
        maxLabel: "Very satisfied",
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
        country: { label: "Country", required: true },
      };
    } else if (type === "contact_info") {
      newStep.fields = {
        firstName: { label: "First Name", required: true },
        lastName: { label: "Last Name", required: true },
        email: { label: "Email Address", required: true },
        phone: { label: "Phone Number", required: true },
        address: { label: "Home Address", required: false },
      };
    } else {
      newStep.placeholder = `Enter your ${type.replace("_", " ")}`;
    }

    setFormSchema((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));
  };

  const removeStep = (stepId: string) => {
    setFormSchema((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== stepId),
    }));
  };

  const moveStep = (stepId: string, direction: "up" | "down") => {
    setFormSchema((prev) => {
      const steps = [...prev.steps];
      const index = steps.findIndex((step) => step.id === stepId);

      if (direction === "up" && index > 0) {
        [steps[index], steps[index - 1]] = [steps[index - 1], steps[index]];
      } else if (direction === "down" && index < steps.length - 1) {
        [steps[index], steps[index + 1]] = [steps[index + 1], steps[index]];
      }

      return { ...prev, steps };
    });
  };

  const updateStep = (updatedStep: FormStep & { originalId?: string }) => {
    console.log("updateStep called with:", updatedStep);
    setFormSchema((prev) => {
      const newSchema = {
        ...prev,
        steps: prev.steps.map((step) =>
          step.id === (updatedStep.originalId || updatedStep.id)
            ? updatedStep
            : step
        ),
      };
      console.log("Updated formSchema:", newSchema);
      return newSchema;
    });
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
        case "fitness-membership":
          templateData = fitnessMemership;
          break;
        case "healthcare-appointment":
          templateData = healthcareAppointment;
          break;
        case "job-application-form":
          templateData = jobApplicationForm;
          break;
        case "online-course-enrollment":
          templateData = onlineCourseEnrollment;
          break;
        case "pet-adoption":
          templateData = petAdoption;
          break;
        case "product-launch-survey":
          templateData = productLaunchSurvey;
          break;
        case "real-estate-inquiry":
          templateData = realEstateInquiry;
          break;
        case "restaurant-reservation":
          templateData = restaurantReservation;
          break;
        case "travel-booking":
          templateData = travelBooking;
          break;
        case "volunteer-application":
          templateData = volunteerApplication;
          break;
        case "wedding-planning":
          templateData = weddingPlanning;
          break;
        default:
          console.error("Unknown template:", templateName);
          return;
      }

      // Update the submit endpoint to match current endpoint
      const submitUrl = `${window.location.origin}/api/submit/${endpointId}/${endpoint?.path || ""}`;

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

    // Validate that all step IDs are unique
    const stepIds = formSchema.steps.map((step) => step.id);
    const duplicateIds = stepIds.filter(
      (id, index) => stepIds.indexOf(id) !== index
    );

    if (duplicateIds.length > 0) {
      toast({
        title: "Duplicate Step IDs Found",
        description: `The following step IDs are duplicated: ${duplicateIds.join(", ")}. Please ensure all step IDs are unique.`,
        variant: "destructive",
      });
      return;
    }

    // Validate that all step IDs are valid slugs (lowercase, alphanumeric, hyphens, and underscores only)
    const invalidIds = stepIds.filter((id) => !/^[a-z0-9_-]+$/.test(id));

    if (invalidIds.length > 0) {
      toast({
        title: "Invalid Step IDs Found",
        description: `The following step IDs contain invalid characters: ${invalidIds.join(", ")}. Please use only lowercase letters, numbers, hyphens, and underscores.`,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Remove submitEndpoint from form schema before saving to database
      const { submitEndpoint, ...formSchemaWithoutSubmitEndpoint } = formSchema;

      const { error } = await supabase
        .from("endpoints")
        .update({
          form_json: formSchemaWithoutSubmitEndpoint as unknown as Json,
          theme_id: selectedTheme,
        })
        .eq("id", endpointId);

      if (error) throw error;

      // Clear auto-saved data after successful save
      localStorage.removeItem(autoSaveKey);
      setHasUnsavedChanges(false);

      // Store the save timestamp to prevent localStorage from overriding recent saves
      const saveTimestamp = Date.now();
      localStorage.setItem(
        `${autoSaveKey}-last-save`,
        saveTimestamp.toString()
      );

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

  const generateSinglePageUrl = () => {
    if (!endpoint) return "";
    const themeId = selectedTheme || "default";
    return `https://forms.jsonpost.com/single-page/${endpoint.id}/${themeId}`;
  };

  const generateMultiStepUrl = () => {
    if (!endpoint) return "";
    const themeId = selectedTheme || "default";
    return `https://forms.jsonpost.com/multi-page/${endpoint.id}/${themeId}`;
  };

  // Short link functions
  const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const fetchExistingShortLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('short_links')
        .select('*')
        .eq('endpoint_id', endpointId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExistingShortLinks(data || []);
    } catch (error) {
      console.error('Error fetching short links:', error);
    }
  };

  const createShortLink = async () => {
    if (!endpoint) return;

    setIsGeneratingShortLink(true);
    try {
      const shortCode = generateShortCode();
      
      const { data, error } = await supabase
        .from('short_links')
        .insert({
          endpoint_id: endpointId,
          short_code: shortCode,
          form_type: shortLinkFormType,
          theme: shortLinkTheme,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Short link created!",
        description: `Short link ${shortCode} has been created successfully.`,
      });

      // Refresh the list
      await fetchExistingShortLinks();
      setShortLinkModalOpen(false);
    } catch (error) {
      console.error('Error creating short link:', error);
      toast({
        title: "Error creating short link",
        description: "Failed to create the short link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingShortLink(false);
    }
  };

  const deleteShortLink = async (shortLinkId: string) => {
    try {
      const { error } = await supabase
        .from('short_links')
        .delete()
        .eq('id', shortLinkId);

      if (error) throw error;

      toast({
        title: "Short link deleted",
        description: "The short link has been deleted successfully.",
      });

      // Refresh the list
      await fetchExistingShortLinks();
    } catch (error) {
      console.error('Error deleting short link:', error);
      toast({
        title: "Error deleting short link",
        description: "Failed to delete the short link. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Load existing short links on component mount
  useEffect(() => {
    if (endpointId) {
      fetchExistingShortLinks();
    }
  }, [endpointId]);

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
            <Link
              href={`/dashboard/projects/${projectId}/endpoints/${endpointId}`}
            >
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Endpoint
              </Button>
            </Link>
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
                  <h3 className="text-lg font-medium">
                    Form Gallery & Templates
                  </h3>
                  <p className="text-sm text-gray-600">
                    Explore form examples or load pre-built templates
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open("https://forms.jsonpost.com", "_blank")
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Gallery
                </Button>
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
                <CardDescription>
                  Configure your form&apos;s basic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input
                    id="form-title"
                    value={formSchema.title}
                    onChange={(e) =>
                      setFormSchema((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter form title"
                  />
                </div>
                <div>
                  <Label htmlFor="form-description">Form Description</Label>
                  <Textarea
                    id="form-description"
                    value={formSchema.description}
                    onChange={(e) =>
                      setFormSchema((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
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
                  <CardDescription>
                    Each step represents one question in your form
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {formSchema.steps.length > 0 && (
                    <>
                      <Button onClick={saveForm} disabled={isSaving} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Form"}
                      </Button>
                      <Select
                        value={selectedStepType}
                        onValueChange={setSelectedStepType}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select Step Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {FIELD_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-xs text-gray-500">
                                  {type.description}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={handleAddStep}
                        disabled={!selectedStepType}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {formSchema.steps.length === 0 ? (
                  <div className="py-8">
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold mb-2">
                        Choose a Template or Create a Blank Form
                      </h3>
                      <p className="text-gray-600">
                        Get started by selecting a pre-built template or create
                        your own form from scratch
                      </p>
                    </div>
                    <div className="space-y-3">
                      {TEMPLATE_GALLERY.map((template) => (
                        <div
                          key={template.id}
                          className="group relative border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800"
                        >
                          <div className="flex items-start gap-4 mb-3">
                            <div className="text-2xl flex-shrink-0">
                              {template.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-base mb-1">
                                {template.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {template.description}
                              </p>
                            </div>
                          </div>

                          {/* Separator line */}
                          <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
                            <div className="flex items-center gap-2">
                              {template.action === "template" && (
                                <>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(
                                        getPreviewUrl(template.id, "single"),
                                        "_blank"
                                      );
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <Eye className="h-3 w-3" />
                                    Preview Single
                                  </Button>
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(
                                        getPreviewUrl(template.id, "multi"),
                                        "_blank"
                                      );
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <Eye className="h-3 w-3" />
                                    Preview Multi-Step
                                  </Button>
                                </>
                              )}
                              <Button
                                onClick={() => handleTemplateAction(template)}
                                size="sm"
                                className="flex items-center gap-2"
                              >
                                {template.action === "blank" ? (
                                  <>
                                    <Plus className="h-4 w-4" />
                                    Create Blank Form
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-4 w-4" />
                                    Use This Template
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                                <Badge
                                  variant="secondary"
                                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                  {
                                    FIELD_TYPES.find(
                                      (t) => t.value === step.type
                                    )?.label
                                  }
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-400 font-mono text-xs"
                                >
                                  ID: {step.id}
                                </Badge>
                                {step.required && (
                                  <Badge
                                    variant="outline"
                                    className="border-orange-300 text-orange-700 dark:border-orange-600 dark:text-orange-400"
                                  >
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
                <CardDescription>
                  Customize appearance and explore examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Theme</Label>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {themes
                          .find((t) => t.id === selectedTheme)
                          ?.colors.slice(0, 3)
                          .map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {themes.find((t) => t.id === selectedTheme)?.name ||
                          "Default"}
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
                    onClick={() =>
                      window.open("https://forms.jsonpost.com", "_blank")
                    }
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
                <CardDescription>
                  Your live form URLs with selected theme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Single Page Form URL</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      value={generateSinglePageUrl()}
                      readOnly
                      className="text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigator.clipboard.writeText(generateSinglePageUrl())
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Multi-Step Form URL</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      value={generateMultiStepUrl()}
                      readOnly
                      className="text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigator.clipboard.writeText(generateMultiStepUrl())
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      window.open(generateSinglePageUrl(), "_blank")
                    }
                    className="flex-1"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Single Page
                  </Button>
                  <Button
                    onClick={() =>
                      window.open(generateMultiStepUrl(), "_blank")
                    }
                    className="flex-1"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Multi-Step
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generate Short Link Card */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Short Link</CardTitle>
                <CardDescription>
                  Create shareable short links for your forms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setShortLinkModalOpen(true)}
                  className="w-full"
                  variant="outline"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Create New Short Link
                </Button>
                
                {existingShortLinks.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Existing Short Links</Label>
                    {existingShortLinks.map((link) => (
                      <div key={link.id} className="p-3 border rounded-lg space-y-3">
                        <div>
                          <div className="flex items-center space-x-2 flex-wrap">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {link.short_code}
                            </code>
                            <Badge variant="secondary" className="text-xs">
                              {link.form_type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {themes.find(t => t.id === link.theme)?.name || 'Default'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 break-all">
                            https://forms.jsonpost.com/s/{link.short_code}
                          </div>
                        </div>
                        <div className="flex items-center justify-end space-x-1 pt-2 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigator.clipboard.writeText(`https://forms.jsonpost.com/s/${link.short_code}`)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`https://forms.jsonpost.com/s/${link.short_code}`, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteShortLink(link.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              Select a theme for your form. This will affect the appearance of
              your form when users fill it out.
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
                    <div className="text-sm text-gray-500">
                      {theme.description}
                    </div>
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

      {/* Short Link Modal */}
      <Dialog open={shortLinkModalOpen} onOpenChange={setShortLinkModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Short Link</DialogTitle>
            <DialogDescription>
              Generate a short link for your form with custom settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Form Type</Label>
              <Select value={shortLinkFormType} onValueChange={(value: "single-page" | "multi-step") => setShortLinkFormType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select form type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-page">Single Page</SelectItem>
                  <SelectItem value="multi-step">Multi-Step</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Theme</Label>
              <Select value={shortLinkTheme} onValueChange={setShortLinkTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShortLinkModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={createShortLink}
              disabled={isGeneratingShortLink}
            >
              {isGeneratingShortLink ? "Creating..." : "Create Short Link"}
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
  // Deep copy the step to avoid shallow copy issues with nested objects
  const deepCopyStep = (step: FormStep): FormStep => {
    return {
      ...step,
      validation: step.validation ? { ...step.validation } : undefined,
      options: step.options
        ? step.options.map((opt) => ({ ...opt }))
        : undefined,
      labels: step.labels ? { ...step.labels } : undefined,
      scale: step.scale ? { ...step.scale } : undefined,
      acceptedTypes: step.acceptedTypes ? [...step.acceptedTypes] : undefined,
      fields: step.fields ? { ...step.fields } : undefined,
    };
  };

  const [editedStep, setEditedStep] = useState<FormStep>(deepCopyStep(step));
  // Keep track of the original ID for matching purposes
  const originalId = step.id;

  const handleSave = () => {
    console.log(
      "StepEditorDialog handleSave called with editedStep:",
      editedStep
    );
    // Create a step with the original ID for matching, but with all the new properties
    const stepToSave = { ...editedStep, originalId };
    onSave(stepToSave);
  };

  const addOption = () => {
    const newOptions = [...(editedStep.options || [])];
    newOptions.push({
      value: `option${newOptions.length + 1}`,
      label: `Option ${newOptions.length + 1}`,
    });
    setEditedStep((prev) => ({ ...prev, options: newOptions }));
  };

  const updateOption = (
    index: number,
    field: "value" | "label",
    value: string
  ) => {
    const newOptions = [...(editedStep.options || [])];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setEditedStep((prev) => ({ ...prev, options: newOptions }));
  };

  const removeOption = (index: number) => {
    const newOptions = [...(editedStep.options || [])];
    newOptions.splice(index, 1);
    setEditedStep((prev) => ({ ...prev, options: newOptions }));
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit Step: {FIELD_TYPES.find((t) => t.value === step.type)?.label}
          </DialogTitle>
          <DialogDescription>
            Configure the properties for this form step
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Properties */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="step-title">Title</Label>
              <Input
                id="step-title"
                value={editedStep.title}
                onChange={(e) =>
                  setEditedStep((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter step title"
              />
            </div>
            <div>
              <Label htmlFor="step-id">Step ID</Label>
              <Input
                id="step-id"
                value={editedStep.id}
                onChange={(e) =>
                  setEditedStep((prev) => ({ ...prev, id: e.target.value }))
                }
                placeholder="Enter step ID (slug format)"
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use lowercase letters, numbers, and hyphens only
              </p>
            </div>
          </div>

          {/* Statement Content */}
          {editedStep.type === "statement" && (
            <div>
              <Label htmlFor="step-content">Content</Label>
              <Textarea
                id="step-content"
                value={editedStep.content || ""}
                onChange={(e) =>
                  setEditedStep((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="Enter statement content"
                rows={3}
              />
            </div>
          )}

          {/* Placeholder for input fields */}
          {![
            "statement",
            "single_select",
            "multiple_select",
            "dropdown",
            "address",
            "contact_info",
            "star_rating",
            "opinion_scale",
            "file_upload",
          ].includes(editedStep.type) && (
            <div>
              <Label htmlFor="step-placeholder">Placeholder</Label>
              <Input
                id="step-placeholder"
                value={editedStep.placeholder || ""}
                onChange={(e) =>
                  setEditedStep((prev) => ({
                    ...prev,
                    placeholder: e.target.value,
                  }))
                }
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
                onCheckedChange={(checked) =>
                  setEditedStep((prev) => ({ ...prev, required: checked }))
                }
              />
              <Label htmlFor="step-required">Required field</Label>
            </div>
          )}

          {/* Options for select fields */}
          {["single_select", "multiple_select", "dropdown"].includes(
            editedStep.type
          ) && (
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
                      onChange={(e) =>
                        updateOption(index, "value", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Input
                      placeholder="Label"
                      value={option.label}
                      onChange={(e) =>
                        updateOption(index, "label", e.target.value)
                      }
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
                  onChange={(e) =>
                    setEditedStep((prev) => ({
                      ...prev,
                      maxStars: parseInt(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <Label>Star Labels (Optional)</Label>
                <div className="space-y-2">
                  {Array.from(
                    { length: editedStep.maxStars || 5 },
                    (_, i) => i + 1
                  ).map((star) => (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="w-8 text-sm">{star}★</span>
                      <Input
                        placeholder={`Label for ${star} star${star > 1 ? "s" : ""}`}
                        value={editedStep.labels?.[star.toString()] || ""}
                        onChange={(e) =>
                          setEditedStep((prev) => ({
                            ...prev,
                            labels: {
                              ...prev.labels,
                              [star.toString()]: e.target.value,
                            },
                          }))
                        }
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
                    onChange={(e) =>
                      setEditedStep((prev) => ({
                        ...prev,
                        scale: {
                          min: parseInt(e.target.value),
                          max: prev.scale?.max || 10,
                          minLabel: prev.scale?.minLabel || "",
                          maxLabel: prev.scale?.maxLabel || "",
                        },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="scale-max">Maximum Value</Label>
                  <Input
                    id="scale-max"
                    type="number"
                    value={editedStep.scale?.max || 10}
                    onChange={(e) =>
                      setEditedStep((prev) => ({
                        ...prev,
                        scale: {
                          min: prev.scale?.min || 1,
                          max: parseInt(e.target.value),
                          minLabel: prev.scale?.minLabel || "",
                          maxLabel: prev.scale?.maxLabel || "",
                        },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="scale-min-label">Minimum Label</Label>
                  <Input
                    id="scale-min-label"
                    value={editedStep.scale?.minLabel || ""}
                    onChange={(e) =>
                      setEditedStep((prev) => ({
                        ...prev,
                        scale: {
                          min: prev.scale?.min || 1,
                          max: prev.scale?.max || 10,
                          minLabel: e.target.value,
                          maxLabel: prev.scale?.maxLabel || "",
                        },
                      }))
                    }
                    placeholder="e.g., Not satisfied"
                  />
                </div>
                <div>
                  <Label htmlFor="scale-max-label">Maximum Label</Label>
                  <Input
                    id="scale-max-label"
                    value={editedStep.scale?.maxLabel || ""}
                    onChange={(e) =>
                      setEditedStep((prev) => ({
                        ...prev,
                        scale: {
                          min: prev.scale?.min || 1,
                          max: prev.scale?.max || 10,
                          minLabel: prev.scale?.minLabel || "",
                          maxLabel: e.target.value,
                        },
                      }))
                    }
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
                  onChange={(e) =>
                    setEditedStep((prev) => ({
                      ...prev,
                      acceptedTypes: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="e.g., .pdf, .doc, .docx"
                />
              </div>
              <div>
                <Label htmlFor="max-size">Maximum File Size</Label>
                <Input
                  id="max-size"
                  value={editedStep.maxSize || ""}
                  onChange={(e) =>
                    setEditedStep((prev) => ({
                      ...prev,
                      maxSize: e.target.value,
                    }))
                  }
                  placeholder="e.g., 5MB"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="multiple-files"
                  checked={editedStep.multiple || false}
                  onCheckedChange={(checked) =>
                    setEditedStep((prev) => ({ ...prev, multiple: checked }))
                  }
                />
                <Label htmlFor="multiple-files">Allow multiple files</Label>
              </div>
            </div>
          )}

          {/* Validation Rules */}
          {![
            "statement",
            "address",
            "contact_info",
            "star_rating",
            "opinion_scale",
            "file_upload",
          ].includes(editedStep.type) && (
            <div>
              <Label>Validation Rules (Optional)</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["short_text", "long_text", "email"].includes(
                  editedStep.type
                ) && (
                  <>
                    <div>
                      <Label htmlFor="min-length">Min Length</Label>
                      <Input
                        id="min-length"
                        type="number"
                        min="0"
                        value={editedStep.validation?.minLength || ""}
                        onChange={(e) =>
                          setEditedStep((prev) => ({
                            ...prev,
                            validation: {
                              ...prev.validation,
                              minLength: e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-length">Max Length</Label>
                      <Input
                        id="max-length"
                        type="number"
                        min="0"
                        value={editedStep.validation?.maxLength || ""}
                        onChange={(e) =>
                          setEditedStep((prev) => ({
                            ...prev,
                            validation: {
                              ...prev.validation,
                              maxLength: e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                            },
                          }))
                        }
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
                        onChange={(e) =>
                          setEditedStep((prev) => ({
                            ...prev,
                            validation: {
                              ...prev.validation,
                              min: e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-value">Max Value</Label>
                      <Input
                        id="max-value"
                        type="number"
                        value={editedStep.validation?.max || ""}
                        onChange={(e) =>
                          setEditedStep((prev) => ({
                            ...prev,
                            validation: {
                              ...prev.validation,
                              max: e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                            },
                          }))
                        }
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
                      onChange={(e) =>
                        setEditedStep((prev) => ({
                          ...prev,
                          validation: {
                            ...prev.validation,
                            pattern: e.target.value,
                          },
                        }))
                      }
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
                  : "This field includes: First Name, Last Name, Email Address, Phone Number, Home Address"}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

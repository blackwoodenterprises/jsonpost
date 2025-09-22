"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FormField, FormTemplate } from "./data/form-templates";
import { FormTheme, FORM_THEMES } from "./data/themes";
import { SubmissionMethod, SUBMISSION_METHODS } from "./data/submission-methods";
import { TemplateSelection } from "./steps/template-selection";
import { FieldEditor } from "./steps/field-editor";
import { ThemeSelection } from "./steps/theme-selection";
import { CodePreview } from "./steps/code-preview";

type WizardStep = 1 | 2 | 3 | 4;

interface WizardState {
  selectedTemplate: FormTemplate | null;
  fields: FormField[];
  selectedTheme: FormTheme | null;
  selectedSubmissionMethod: SubmissionMethod | null;
  endpointUrl: string;
}

const STEP_TITLES = {
  1: "Choose Template",
  2: "Edit Fields",
  3: "Select Theme",
  4: "Generate Code"
};

const STEP_DESCRIPTIONS = {
  1: "Start with a pre-built template or create from scratch",
  2: "Customize your form fields and configure submission settings",
  3: "Pick a theme that matches your brand and style",
  4: "Copy your generated form code and preview the result"
};

export function FormGeneratorWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [wizardState, setWizardState] = useState<WizardState>({
    selectedTemplate: null,
    fields: [],
    selectedTheme: null,
    selectedSubmissionMethod: null,
    endpointUrl: ""
  });

  const progress = (currentStep / 4) * 100;

  const handleTemplateSelect = (template: FormTemplate) => {
    setWizardState(prev => ({
      ...prev,
      selectedTemplate: template,
      fields: [...template.fields]
    }));
    setCurrentStep(2);
  };

  const handleFieldsUpdate = (fields: FormField[]) => {
    setWizardState(prev => ({
      ...prev,
      fields
    }));
  };

  const handleEndpointUpdate = (url: string) => {
    setWizardState(prev => ({
      ...prev,
      endpointUrl: url
    }));
  };

  const handleSubmissionMethodUpdate = (method: SubmissionMethod) => {
    setWizardState(prev => ({
      ...prev,
      selectedSubmissionMethod: method
    }));
  };

  const handleThemeSelect = (theme: FormTheme) => {
    setWizardState(prev => ({
      ...prev,
      selectedTheme: theme
    }));
    // Don't auto-navigate - let users test different themes
  };

  const handleBackToStep = (step: WizardStep) => {
    setCurrentStep(step);
  };

  const handleStartOver = () => {
    setWizardState({
      selectedTemplate: null,
      fields: [],
      selectedTheme: null,
      selectedSubmissionMethod: null,
      endpointUrl: ""
    });
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TemplateSelection
            selectedTemplate={wizardState.selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            onNext={() => setCurrentStep(2)}
          />
        );
      
      case 2:
        return (
          <FieldEditor
            fields={wizardState.fields}
            onFieldsChange={handleFieldsUpdate}
            endpointUrl={wizardState.endpointUrl}
            onEndpointChange={handleEndpointUpdate}
            submissionMethod={wizardState.selectedSubmissionMethod || SUBMISSION_METHODS[0]}
            onSubmissionMethodChange={handleSubmissionMethodUpdate}
            onNext={() => setCurrentStep(3)}
            onBack={() => handleBackToStep(1)}
          />
        );
      
      case 3:
        return (
          <ThemeSelection
            selectedTheme={wizardState.selectedTheme || FORM_THEMES[0]}
            fields={wizardState.fields}
            onThemeSelect={handleThemeSelect}
            onNext={() => setCurrentStep(4)}
            onBack={() => handleBackToStep(2)}
          />
        );
      
      case 4:
        return (
          <CodePreview
            fields={wizardState.fields}
            theme={wizardState.selectedTheme || FORM_THEMES[0]}
            submissionMethod={wizardState.selectedSubmissionMethod || SUBMISSION_METHODS[0]}
            endpointUrl={wizardState.endpointUrl}
            onBack={() => handleBackToStep(3)}
            onStartOver={handleStartOver}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Form Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Create beautiful, functional forms in minutes
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            Beta
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          {Object.entries(STEP_TITLES).map(([step, title]) => {
            const stepNum = parseInt(step) as WizardStep;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            const isAccessible = stepNum <= currentStep || (
              stepNum === 2 && wizardState.selectedTemplate ||
              stepNum === 3 && wizardState.fields.length > 0 ||
              stepNum === 4 && wizardState.selectedTheme
            );

            return (
              <div key={step} className="flex-1">
                <button
                  onClick={() => isAccessible ? handleBackToStep(stepNum) : undefined}
                  disabled={!isAccessible}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100'
                      : isCompleted
                      ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 text-green-900 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : isAccessible
                      ? 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isActive
                        ? 'bg-blue-600 dark:bg-blue-500 text-white'
                        : isCompleted
                        ? 'bg-green-600 dark:bg-green-500 text-white'
                        : isAccessible
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}>
                      {isCompleted ? '✓' : stepNum}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{title}</div>
                      <div className="text-xs opacity-75">
                        {STEP_DESCRIPTIONS[stepNum]}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="min-h-[600px]">
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Need help? Check out our{" "}
          <a href="/docs" className="text-blue-600 hover:text-blue-800">
            documentation
          </a>{" "}
          or{" "}
          <a href="/contact" className="text-blue-600 hover:text-blue-800">
            contact support
          </a>
        </p>
      </div>
    </div>
  );
}
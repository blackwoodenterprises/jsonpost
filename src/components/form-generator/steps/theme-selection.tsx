"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FORM_THEMES, FormTheme } from "../data/themes";
import { FormField } from "../data/form-templates";
import { CheckCircle, Eye } from "lucide-react";
import { generateFormHTML } from "../utils/form-renderer";

interface ThemeSelectionProps {
  selectedTheme: FormTheme;
  onThemeSelect: (theme: FormTheme) => void;
  fields: FormField[];
  onNext: () => void;
  onBack: () => void;
}

export function ThemeSelection({
  selectedTheme,
  onThemeSelect,
  fields,
  onNext,
  onBack
}: ThemeSelectionProps) {

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose a Theme
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select a visual theme for your form
        </p>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FORM_THEMES.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedTheme.id === theme.id
                ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-800 dark:border-gray-700'
            }`}
            onClick={() => onThemeSelect(theme)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{theme.preview}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{theme.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {theme.description}
                    </p>
                  </div>
                </div>
                {selectedTheme.id === theme.id && (
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Preview with Current Fields */}
      {fields.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Live Preview with Your Fields</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Your Form Preview</h3>
              <style dangerouslySetInnerHTML={{ __html: selectedTheme.css }} />
              <div className={selectedTheme.styles.container}>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: generateFormHTML({
                      fields: fields.slice(0, 5),
                      theme: selectedTheme,
                      includeSubmitButton: true,
                      submitButtonText: "Submit Form"
                    })
                  }} 
                />
                {fields.length > 5 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-2">
                    ... and {fields.length - 5} more fields
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Field Editor
        </Button>
        <Button onClick={onNext}>
          Generate Code & Preview
        </Button>
      </div>
    </div>
  );
}
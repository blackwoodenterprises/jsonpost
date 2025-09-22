"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FORM_TEMPLATES, FormTemplate } from "../data/form-templates";
import { Search, CheckCircle } from "lucide-react";

interface TemplateSelectionProps {
  selectedTemplate: FormTemplate | null;
  onTemplateSelect: (template: FormTemplate) => void;
  onNext: () => void;
}

export function TemplateSelection({ selectedTemplate, onTemplateSelect, onNext }: TemplateSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = FORM_TEMPLATES.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose a Template
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select a form template to get started with pre-configured fields
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate?.id === template.id
                ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "hover:shadow-lg"
            }`}
            onClick={() => onTemplateSelect(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{template.icon}</span>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </div>
                {selectedTemplate?.id === template.id && (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  {template.fields.length} fields
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {template.fields.filter(f => f.required).length} required
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No templates found matching &quot;{searchTerm}&quot;
          </p>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={onNext}
          disabled={!selectedTemplate}
          className="px-8 py-2"
        >
          Continue to Field Editor
        </Button>
      </div>
    </div>
  );
}
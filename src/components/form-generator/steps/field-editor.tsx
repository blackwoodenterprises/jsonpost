"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormField } from "../data/form-templates";
import { SUBMISSION_METHODS, SubmissionMethod } from "../data/submission-methods";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Edit3, 
  Save, 
  X,
  Settings
} from "lucide-react";

interface FieldEditorProps {
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
  endpointUrl: string;
  onEndpointChange: (url: string) => void;
  submissionMethod: SubmissionMethod;
  onSubmissionMethodChange: (method: SubmissionMethod) => void;
  onNext: () => void;
  onBack: () => void;
}

export function FieldEditor({
  fields,
  onFieldsChange,
  endpointUrl,
  onEndpointChange,
  submissionMethod,
  onSubmissionMethodChange,
  onNext,
  onBack
}: FieldEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showEndpointConfig, setShowEndpointConfig] = useState(false);

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select' },
    { value: 'radio', label: 'Radio' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'time', label: 'Time' },
    { value: 'url', label: 'URL' },
    { value: 'password', label: 'Password' }
  ];

  const addField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      placeholder: '',
      required: false
    };
    onFieldsChange([...fields, newField]);
    setEditingField(newField.id);
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    const updatedFields = fields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );
    onFieldsChange(updatedFields);
  };

  const deleteField = (fieldId: string) => {
    onFieldsChange(fields.filter(field => field.id !== fieldId));
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const currentIndex = fields.findIndex(field => field.id === fieldId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newFields[currentIndex], newFields[targetIndex]] = [newFields[targetIndex], newFields[currentIndex]];
    onFieldsChange(newFields);
  };

  const renderFieldEditor = (field: FormField) => {
    const isEditing = editingField === field.id;

    if (!isEditing) {
      return (
        <Card key={field.id} className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{field.label}</span>
                    {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                    <Badge variant="outline" className="text-xs">{field.type}</Badge>
                  </div>
                  {field.placeholder && (
                    <p className="text-sm text-gray-500 mt-1">Placeholder: {field.placeholder}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveField(field.id, 'up')}
                  disabled={fields.findIndex(f => f.id === field.id) === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveField(field.id, 'down')}
                  disabled={fields.findIndex(f => f.id === field.id) === fields.length - 1}
                >
                  ↓
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingField(field.id)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteField(field.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={field.id} className="mb-4 border-blue-200">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Field Label</label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Field Type</label>
                <select
                  value={field.type}
                  onChange={(e) => updateField(field.id, { type: e.target.value as FormField['type'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {fieldTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Placeholder Text</label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
              <div>
                <label className="block text-sm font-medium mb-1">Options (one per line)</label>
                <textarea
                  value={field.options?.join('\n') || ''}
                  onChange={(e) => updateField(field.id, { options: e.target.value.split('\n').filter(o => o.trim()) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Option 1&#10;Option 2&#10;Option 3"
                />
              </div>
            )}

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Required field</span>
              </label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingField(null)}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => setEditingField(null)}
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customize Form Fields
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Edit, reorder, and configure your form fields
        </p>
      </div>

      {/* Endpoint Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Form Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Endpoint URL</label>
            <input
              type="url"
              value={endpointUrl}
              onChange={(e) => onEndpointChange(e.target.value)}
              placeholder="https://your-server.com/api/form-submit"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Submission Method</label>
            <div className="grid grid-cols-3 gap-2">
              {SUBMISSION_METHODS.map(method => (
                <button
                  key={method.id}
                  onClick={() => onSubmissionMethodChange(method)}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    submissionMethod.id === method.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span>{method.icon}</span>
                    <span className="font-medium text-sm">{method.name}</span>
                  </div>
                  <p className="text-xs text-gray-600">{method.description}</p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fields List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Form Fields</h3>
          <Button onClick={addField} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Field
          </Button>
        </div>

        {fields.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 mb-4">No fields added yet</p>
              <Button onClick={addField}>
                <Plus className="w-4 h-4 mr-1" />
                Add Your First Field
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div>
            {fields.map(renderFieldEditor)}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Templates
        </Button>
        <Button onClick={onNext} disabled={fields.length === 0}>
          Continue to Themes
        </Button>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";

interface SchemaCreationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  schemaString: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSchemaUpdate: (schema: any, schemaString: string) => void;
  onNext: () => void;
}

interface SchemaField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  description?: string;
  // String validation
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
  // Number validation
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  // Array validation
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  // Enum/const values
  enum?: string[];
  const?: string;
  // Nested schema support
  properties?: { [key: string]: SchemaField };
  items?: SchemaField;
  // UI state
  isExpanded?: boolean;
}

const FIELD_TYPES = [
  { value: "string", label: "String", icon: "📝" },
  { value: "number", label: "Number", icon: "🔢" },
  { value: "integer", label: "Integer", icon: "🔢" },
  { value: "boolean", label: "Boolean", icon: "✅" },
  { value: "array", label: "Array", icon: "📋" },
  { value: "object", label: "Object", icon: "📦" },
  { value: "null", label: "Null", icon: "∅" },
];

export function SchemaCreation({
  schema,
  schemaString,
  onSchemaUpdate,
  onNext,
}: SchemaCreationProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "json">("visual");
  const [fields, setFields] = useState<SchemaField[]>([]);
  const [jsonInput, setJsonInput] = useState("");
  const [inferError, setInferError] = useState("");

  const addField = (type: string) => {
    const newField: SchemaField = {
      id: `field_${Date.now()}`,
      name: `field${fields.length + 1}`,
      type,
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<SchemaField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const generateSchemaFromFields = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const properties: any = {};
    const required: string[] = [];

    fields.forEach((field) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fieldSchema: any = {
        type: field.type,
      };

      // Add description if provided
      if (field.description) {
        fieldSchema.description = field.description;
      }

      // String validation
      if (field.type === "string") {
        if (field.minLength !== undefined)
          fieldSchema.minLength = field.minLength;
        if (field.maxLength !== undefined)
          fieldSchema.maxLength = field.maxLength;
        if (field.pattern) fieldSchema.pattern = field.pattern;
        if (field.format) fieldSchema.format = field.format;
      }

      // Number/Integer validation
      if (field.type === "number" || field.type === "integer") {
        if (field.minimum !== undefined) fieldSchema.minimum = field.minimum;
        if (field.maximum !== undefined) fieldSchema.maximum = field.maximum;
        if (field.multipleOf !== undefined)
          fieldSchema.multipleOf = field.multipleOf;
      }

      // Array validation
      if (field.type === "array") {
        if (field.minItems !== undefined) fieldSchema.minItems = field.minItems;
        if (field.maxItems !== undefined) fieldSchema.maxItems = field.maxItems;
        if (field.uniqueItems !== undefined)
          fieldSchema.uniqueItems = field.uniqueItems;

        // Default items schema
        fieldSchema.items = field.items
          ? generateFieldSchema(field.items)
          : { type: "string" };
      }

      // Object validation
      if (field.type === "object") {
        if (field.properties) {
          fieldSchema.properties = {};
          fieldSchema.required = [];

          Object.keys(field.properties).forEach((propKey) => {
            const propField = field.properties![propKey];
            fieldSchema.properties[propKey] = generateFieldSchema(propField);
            if (propField.required) {
              fieldSchema.required.push(propKey);
            }
          });

          if (fieldSchema.required.length === 0) {
            delete fieldSchema.required;
          }
        } else {
          fieldSchema.properties = {};
        }
      }

      // Enum values
      if (
        field.enum &&
        field.enum.length > 0 &&
        field.enum.some((v) => v.trim())
      ) {
        fieldSchema.enum = field.enum.filter((v) => v.trim());
      }

      // Const value
      if (field.const) {
        fieldSchema.const = field.const;
      }

      properties[field.name] = fieldSchema;

      if (field.required) {
        required.push(field.name);
      }
    });

    const schema = {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties,
      ...(required.length > 0 && { required }),
    };

    return schema;
  };

  // Helper function to generate schema for nested fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateFieldSchema = (field: SchemaField): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fieldSchema: any = {
      type: field.type,
    };

    if (field.description) fieldSchema.description = field.description;

    // String validation
    if (field.type === "string") {
      if (field.minLength !== undefined)
        fieldSchema.minLength = field.minLength;
      if (field.maxLength !== undefined)
        fieldSchema.maxLength = field.maxLength;
      if (field.pattern) fieldSchema.pattern = field.pattern;
      if (field.format) fieldSchema.format = field.format;
    }

    // Number/Integer validation
    if (field.type === "number" || field.type === "integer") {
      if (field.minimum !== undefined) fieldSchema.minimum = field.minimum;
      if (field.maximum !== undefined) fieldSchema.maximum = field.maximum;
      if (field.multipleOf !== undefined)
        fieldSchema.multipleOf = field.multipleOf;
    }

    // Array validation
    if (field.type === "array") {
      if (field.minItems !== undefined) fieldSchema.minItems = field.minItems;
      if (field.maxItems !== undefined) fieldSchema.maxItems = field.maxItems;
      if (field.uniqueItems !== undefined)
        fieldSchema.uniqueItems = field.uniqueItems;
      fieldSchema.items = field.items
        ? generateFieldSchema(field.items)
        : { type: "string" };
    }

    // Object validation
    if (field.type === "object" && field.properties) {
      fieldSchema.properties = {};
      fieldSchema.required = [];

      Object.keys(field.properties).forEach((propKey) => {
        const propField = field.properties![propKey];
        fieldSchema.properties[propKey] = generateFieldSchema(propField);
        if (propField.required) {
          fieldSchema.required.push(propKey);
        }
      });

      if (fieldSchema.required.length === 0) {
        delete fieldSchema.required;
      }
    }

    // Enum values
    if (
      field.enum &&
      field.enum.length > 0 &&
      field.enum.some((v) => v.trim())
    ) {
      fieldSchema.enum = field.enum.filter((v) => v.trim());
    }

    // Const value
    if (field.const) {
      fieldSchema.const = field.const;
    }

    return fieldSchema;
  };

  const inferSchemaFromJson = () => {
    try {
      setInferError("");
      const jsonData = JSON.parse(jsonInput);
      const inferredSchema = inferSchema(jsonData);
      const schemaString = JSON.stringify(inferredSchema, null, 2);

      onSchemaUpdate(inferredSchema, schemaString);
      setActiveTab("visual");

      // Convert to fields for visual editing
      const inferredFields = extractFieldsFromSchema(inferredSchema);
      setFields(inferredFields);
    } catch {
      setInferError("Invalid JSON format. Please check your input.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inferSchema = (data: unknown): any => {
    if (data === null) return { type: "null" };
    if (Array.isArray(data)) {
      return {
        type: "array",
        items: data.length > 0 ? inferSchema(data[0]) : { type: "string" },
      };
    }
    if (typeof data === "object") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const properties: any = {};
      const required: string[] = [];

      Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
        properties[key] = inferSchema(value);
        if (value !== null && value !== undefined) {
          required.push(key);
        }
      });

      return {
        type: "object",
        properties,
        required: required.length > 0 ? required : undefined,
      };
    }

    const type = typeof data;
    if (type === "number" && Number.isInteger(data)) {
      return { type: "integer" };
    }
    return { type };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractFieldsFromSchema = (schema: any): SchemaField[] => {
    if (!schema.properties) return [];

    return Object.keys(schema.properties).map((key, index) => ({
      id: `field_${index}`,
      name: key,
      type: schema.properties[key].type || "string",
      required: schema.required?.includes(key) || false,
      description: schema.properties[key].description,
    }));
  };

  const handleNext = () => {
    let finalSchema;
    let finalSchemaString;

    if (activeTab === "visual" && fields.length > 0) {
      finalSchema = generateSchemaFromFields();
      finalSchemaString = JSON.stringify(finalSchema, null, 2);
    } else if (schema && schemaString) {
      finalSchema = schema;
      finalSchemaString = schemaString;
    } else {
      // Create a basic schema if nothing is defined
      finalSchema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {},
      };
      finalSchemaString = JSON.stringify(finalSchema, null, 2);
    }

    onSchemaUpdate(finalSchema, finalSchemaString);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create Your JSON Schema
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Build your schema visually or infer it from existing JSON data
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "visual" | "json")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visual">Visual Builder</TabsTrigger>
          <TabsTrigger value="json">JSON Inference</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FIELD_TYPES.map((fieldType) => (
                  <Button
                    key={fieldType.value}
                    variant="outline"
                    onClick={() => addField(fieldType.value)}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-2xl">{fieldType.icon}</span>
                    <span className="text-sm">{fieldType.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {fields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Schema Fields</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field) => (
                  <FieldEditor
                    key={field.id}
                    field={field}
                    onUpdate={(updates) => updateField(field.id, updates)}
                    onRemove={() => removeField(field.id)}
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="json" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Infer Schema from JSON</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Paste your JSON data here:
                </label>
                <Textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "tags": ["developer", "javascript"]
}`}
                  className="min-h-[200px] font-mono"
                />
              </div>
              {inferError && (
                <div className="text-red-600 text-sm">{inferError}</div>
              )}
              <Button
                onClick={inferSchemaFromJson}
                disabled={!jsonInput.trim()}
              >
                Infer Schema
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={activeTab === "visual" && fields.length === 0 && !schema}
        >
          Next: Edit Schema
        </Button>
      </div>
    </div>
  );
}

// Nested Field Editor Component for Array Items and Object Properties
interface NestedFieldEditorProps {
  field: SchemaField;
  onUpdate: (updates: Partial<SchemaField>) => void;
  depth: number;
}

function NestedFieldEditor({ field, onUpdate, depth }: NestedFieldEditorProps) {
  // Limit nesting depth to prevent infinite recursion
  if (depth > 3) {
    return (
      <div className="text-sm text-gray-500 italic">
        Maximum nesting depth reached
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`nested-name-${field.id}`}>Name</Label>
          <Input
            id={`nested-name-${field.id}`}
            value={field.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="fieldName"
            className="text-sm"
          />
        </div>
        <div>
          <Label htmlFor={`nested-type-${field.id}`}>Type</Label>
          <select
            id={`nested-type-${field.id}`}
            value={field.type}
            onChange={(e) => onUpdate({ type: e.target.value })}
            className="w-full px-2 py-1 border rounded-md text-sm"
          >
            {FIELD_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
          />
          <span className="text-sm">Required</span>
        </label>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor={`nested-description-${field.id}`}>Description</Label>
        <Input
          id={`nested-description-${field.id}`}
          value={field.description || ""}
          onChange={(e) =>
            onUpdate({ description: e.target.value || undefined })
          }
          placeholder="Field description"
          className="text-sm"
        />
      </div>

      {/* Nested validation options */}
      {field.type === "string" && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor={`nested-minLength-${field.id}`}>Min Length</Label>
            <Input
              id={`nested-minLength-${field.id}`}
              type="number"
              value={field.minLength || ""}
              onChange={(e) =>
                onUpdate({
                  minLength: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className="text-sm"
            />
          </div>
          <div>
            <Label htmlFor={`nested-maxLength-${field.id}`}>Max Length</Label>
            <Input
              id={`nested-maxLength-${field.id}`}
              type="number"
              value={field.maxLength || ""}
              onChange={(e) =>
                onUpdate({
                  maxLength: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className="text-sm"
            />
          </div>
        </div>
      )}

      {(field.type === "number" || field.type === "integer") && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor={`nested-minimum-${field.id}`}>Minimum</Label>
            <Input
              id={`nested-minimum-${field.id}`}
              type="number"
              value={field.minimum || ""}
              onChange={(e) =>
                onUpdate({
                  minimum: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                })
              }
              className="text-sm"
            />
          </div>
          <div>
            <Label htmlFor={`nested-maximum-${field.id}`}>Maximum</Label>
            <Input
              id={`nested-maximum-${field.id}`}
              type="number"
              value={field.maximum || ""}
              onChange={(e) =>
                onUpdate({
                  maximum: e.target.value
                    ? parseFloat(e.target.value)
                    : undefined,
                })
              }
              className="text-sm"
            />
          </div>
        </div>
      )}

      {/* Recursive nesting for arrays and objects */}
      {field.type === "array" && (
        <div>
          <Label>Array Item Type</Label>
          <div className="mt-2">
            <NestedFieldEditor
              field={
                field.items || {
                  id: `${field.id}_items`,
                  name: "items",
                  type: "string",
                  required: false,
                }
              }
              onUpdate={(updates: Partial<SchemaField>) => {
                const currentItems = field.items || {
                  id: `${field.id}_items`,
                  name: "items",
                  type: "string",
                  required: false,
                };
                onUpdate({ items: { ...currentItems, ...updates } });
              }}
              depth={depth + 1}
            />
          </div>
        </div>
      )}

      {field.type === "object" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Properties</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const newPropId = `${field.id}_prop_${Date.now()}`;
                const newProperties = {
                  ...field.properties,
                  [`prop_${Object.keys(field.properties || {}).length + 1}`]: {
                    id: newPropId,
                    name: `prop_${Object.keys(field.properties || {}).length + 1}`,
                    type: "string",
                    required: false,
                  },
                };
                onUpdate({ properties: newProperties });
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {field.properties && Object.keys(field.properties).length > 0 && (
            <div className="space-y-2">
              {Object.entries(field.properties).map(([propKey, propField]) => (
                <div key={propKey} className="flex items-start space-x-2">
                  <div className="flex-1">
                    <NestedFieldEditor
                      field={propField}
                      onUpdate={(updates: Partial<SchemaField>) => {
                        const newProperties = { ...field.properties };
                        newProperties[propKey] = {
                          ...propField,
                          ...updates,
                        } as SchemaField;
                        onUpdate({ properties: newProperties });
                      }}
                      depth={depth + 1}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newProperties = { ...field.properties };
                      delete newProperties[propKey];
                      onUpdate({
                        properties:
                          Object.keys(newProperties).length > 0
                            ? newProperties
                            : undefined,
                      });
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Field Editor Component with Advanced Validation Options
interface FieldEditorProps {
  field: SchemaField;
  onUpdate: (updates: Partial<SchemaField>) => void;
  onRemove: () => void;
}

function FieldEditor({ field, onUpdate, onRemove }: FieldEditorProps) {
  const [isExpanded, setIsExpanded] = useState(field.isExpanded || false);

  const handleExpandToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onUpdate({ isExpanded: newExpanded });
  };

  const renderStringValidation = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`minLength-${field.id}`}>Min Length</Label>
        <Input
          id={`minLength-${field.id}`}
          type="number"
          value={field.minLength || ""}
          onChange={(e) =>
            onUpdate({
              minLength: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="0"
        />
      </div>
      <div>
        <Label htmlFor={`maxLength-${field.id}`}>Max Length</Label>
        <Input
          id={`maxLength-${field.id}`}
          type="number"
          value={field.maxLength || ""}
          onChange={(e) =>
            onUpdate({
              maxLength: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="100"
        />
      </div>
      <div>
        <Label htmlFor={`pattern-${field.id}`}>Pattern (Regex)</Label>
        <Input
          id={`pattern-${field.id}`}
          value={field.pattern || ""}
          onChange={(e) => onUpdate({ pattern: e.target.value || undefined })}
          placeholder="^[a-zA-Z]+$"
        />
      </div>
      <div>
        <Label htmlFor={`format-${field.id}`}>Format</Label>
        <select
          id={`format-${field.id}`}
          value={field.format || ""}
          onChange={(e) => onUpdate({ format: e.target.value || undefined })}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">None</option>
          <option value="email">Email</option>
          <option value="uri">URI</option>
          <option value="date">Date</option>
          <option value="date-time">Date-Time</option>
          <option value="uuid">UUID</option>
          <option value="ipv4">IPv4</option>
          <option value="ipv6">IPv6</option>
        </select>
      </div>
    </div>
  );

  const renderNumberValidation = () => (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Label htmlFor={`minimum-${field.id}`}>Minimum</Label>
        <Input
          id={`minimum-${field.id}`}
          type="number"
          value={field.minimum || ""}
          onChange={(e) =>
            onUpdate({
              minimum: e.target.value ? parseFloat(e.target.value) : undefined,
            })
          }
          placeholder="0"
        />
      </div>
      <div>
        <Label htmlFor={`maximum-${field.id}`}>Maximum</Label>
        <Input
          id={`maximum-${field.id}`}
          type="number"
          value={field.maximum || ""}
          onChange={(e) =>
            onUpdate({
              maximum: e.target.value ? parseFloat(e.target.value) : undefined,
            })
          }
          placeholder="100"
        />
      </div>
      <div>
        <Label htmlFor={`multipleOf-${field.id}`}>Multiple Of</Label>
        <Input
          id={`multipleOf-${field.id}`}
          type="number"
          value={field.multipleOf || ""}
          onChange={(e) =>
            onUpdate({
              multipleOf: e.target.value
                ? parseFloat(e.target.value)
                : undefined,
            })
          }
          placeholder="1"
        />
      </div>
    </div>
  );

  const renderArrayValidation = () => (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Label htmlFor={`minItems-${field.id}`}>Min Items</Label>
        <Input
          id={`minItems-${field.id}`}
          type="number"
          value={field.minItems || ""}
          onChange={(e) =>
            onUpdate({
              minItems: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="0"
        />
      </div>
      <div>
        <Label htmlFor={`maxItems-${field.id}`}>Max Items</Label>
        <Input
          id={`maxItems-${field.id}`}
          type="number"
          value={field.maxItems || ""}
          onChange={(e) =>
            onUpdate({
              maxItems: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          placeholder="10"
        />
      </div>
      <div className="flex items-center space-x-2 pt-6">
        <input
          type="checkbox"
          id={`uniqueItems-${field.id}`}
          checked={field.uniqueItems || false}
          onChange={(e) => onUpdate({ uniqueItems: e.target.checked })}
        />
        <Label htmlFor={`uniqueItems-${field.id}`}>Unique Items</Label>
      </div>
    </div>
  );

  const renderEnumValues = () => {
    const enumValues = field.enum || [];

    const addEnumValue = () => {
      const newValues = [...enumValues, ""];
      onUpdate({ enum: newValues });
    };

    const updateEnumValue = (index: number, value: string) => {
      const newValues = [...enumValues];
      newValues[index] = value;
      onUpdate({ enum: newValues });
    };

    const removeEnumValue = (index: number) => {
      const newValues = enumValues.filter((_, i) => i !== index);
      onUpdate({ enum: newValues.length > 0 ? newValues : undefined });
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Allowed Values (Enum)</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEnumValue}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Value
          </Button>
        </div>
        {enumValues.map((value, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={value}
              onChange={(e) => updateEnumValue(index, e.target.value)}
              placeholder="Enter allowed value"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeEnumValue(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* Basic Field Information */}
      <div className="flex items-center justify-between">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`name-${field.id}`}>Field Name</Label>
            <Input
              id={`name-${field.id}`}
              value={field.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="fieldName"
            />
          </div>
          <div>
            <Label htmlFor={`type-${field.id}`}>Type</Label>
            <select
              id={`type-${field.id}`}
              value={field.type}
              onChange={(e) => onUpdate({ type: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              {FIELD_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4 pt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => onUpdate({ required: e.target.checked })}
              />
              <span className="text-sm">Required</span>
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExpandToggle}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            Advanced
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor={`description-${field.id}`}>Description</Label>
        <Input
          id={`description-${field.id}`}
          value={field.description || ""}
          onChange={(e) =>
            onUpdate({ description: e.target.value || undefined })
          }
          placeholder="Field description"
        />
      </div>

      {/* Advanced Options */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent className="space-y-4">
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Validation Options</h4>

            {/* String Validation */}
            {field.type === "string" && renderStringValidation()}

            {/* Number/Integer Validation */}
            {(field.type === "number" || field.type === "integer") &&
              renderNumberValidation()}

            {/* Array Validation */}
            {field.type === "array" && (
              <div className="space-y-4">
                {renderArrayValidation()}
                <div>
                  <Label>Array Item Type</Label>
                  <div className="mt-2">
                    <NestedFieldEditor
                      field={
                        field.items || {
                          id: `${field.id}_items`,
                          name: "items",
                          type: "string",
                          required: false,
                        }
                      }
                      onUpdate={(updates: Partial<SchemaField>) => {
                        const currentItems = field.items || {
                          id: `${field.id}_items`,
                          name: "items",
                          type: "string",
                          required: false,
                        };
                        onUpdate({ items: { ...currentItems, ...updates } });
                      }}
                      depth={1}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Object Validation */}
            {field.type === "object" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Object Properties</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newPropId = `${field.id}_prop_${Date.now()}`;
                      const newProperties = {
                        ...field.properties,
                        [`property_${Object.keys(field.properties || {}).length + 1}`]:
                          {
                            id: newPropId,
                            name: `property_${Object.keys(field.properties || {}).length + 1}`,
                            type: "string",
                            required: false,
                          },
                      };
                      onUpdate({ properties: newProperties });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Property
                  </Button>
                </div>
                {field.properties &&
                  Object.keys(field.properties).length > 0 && (
                    <div className="space-y-3 border rounded-lg p-3">
                      {Object.entries(field.properties).map(
                        ([propKey, propField]) => (
                          <div
                            key={propKey}
                            className="flex items-start space-x-2"
                          >
                            <div className="flex-1">
                              <NestedFieldEditor
                                field={propField}
                                onUpdate={(updates: Partial<SchemaField>) => {
                                  const newProperties = { ...field.properties };
                                  newProperties[propKey] = {
                                    ...propField,
                                    ...updates,
                                  } as SchemaField;
                                  onUpdate({ properties: newProperties });
                                }}
                                depth={1}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newProperties = { ...field.properties };
                                delete newProperties[propKey];
                                onUpdate({
                                  properties:
                                    Object.keys(newProperties).length > 0
                                      ? newProperties
                                      : undefined,
                                });
                              }}
                              className="text-red-600 hover:text-red-800 mt-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            )}

            {/* Enum Values */}
            {field.type !== "object" && field.type !== "array" && (
              <div className="mt-4">{renderEnumValues()}</div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

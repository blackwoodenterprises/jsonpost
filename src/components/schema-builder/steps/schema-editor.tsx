"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface SchemaEditorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  schemaString: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSchemaUpdate: (schema: any, schemaString: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SchemaEditor({ schemaString, onSchemaUpdate, onNext, onBack }: SchemaEditorProps) {
  const [localSchemaString, setLocalSchemaString] = useState(schemaString);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setLocalSchemaString(schemaString || "");
  }, [schemaString]);

  const validateSchema = (schemaStr: string) => {
    try {
      const parsed = JSON.parse(schemaStr);
      setError("");
      setIsValid(true);
      return parsed;
    } catch {
      setError("Invalid JSON format");
      setIsValid(false);
      return null;
    }
  };

  const handleSchemaChange = (value: string) => {
    setLocalSchemaString(value);
    const parsed = validateSchema(value);
    if (parsed) {
      onSchemaUpdate(parsed, value);
    }
  };

  const formatSchema = () => {
    try {
      const parsed = JSON.parse(localSchemaString);
      const formatted = JSON.stringify(parsed, null, 2);
      setLocalSchemaString(formatted);
      onSchemaUpdate(parsed, formatted);
    } catch {
      setError("Cannot format invalid JSON");
    }
  };

  const addCommonProperties = () => {
    try {
      const parsed = JSON.parse(localSchemaString);

      // Add common schema properties if they don't exist
      if (!parsed.$schema) {
        parsed.$schema = "http://json-schema.org/draft-07/schema#";
      }
      if (!parsed.title) {
        parsed.title = "Generated Schema";
      }
      if (!parsed.description) {
        parsed.description =
          "A JSON schema generated with JSONPost Schema Builder";
      }

      const updated = JSON.stringify(parsed, null, 2);
      setLocalSchemaString(updated);
      onSchemaUpdate(parsed, updated);
    } catch {
      setError("Cannot add properties to invalid JSON");
    }
  };

  const minifySchema = () => {
    try {
      const parsed = JSON.parse(localSchemaString);
      const minified = JSON.stringify(parsed);
      setLocalSchemaString(minified);
      onSchemaUpdate(parsed, minified);
    } catch {
      setError("Cannot minify invalid JSON");
    }
  };

  const exampleSchemas = [
    {
      name: "User Profile",
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        title: "User Profile",
        properties: {
          name: { type: "string", minLength: 1 },
          email: { type: "string", format: "email" },
          age: { type: "integer", minimum: 0, maximum: 150 },
          isActive: { type: "boolean" },
        },
        required: ["name", "email"],
      },
    },
    {
      name: "Product",
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        title: "Product",
        properties: {
          id: { type: "string" },
          name: { type: "string", minLength: 1 },
          price: { type: "number", minimum: 0 },
          category: {
            type: "string",
            enum: ["electronics", "clothing", "books", "other"],
          },
          tags: { type: "array", items: { type: "string" } },
          inStock: { type: "boolean" },
        },
        required: ["id", "name", "price"],
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadExampleSchema = (exampleSchema: any) => {
    const schemaString = JSON.stringify(exampleSchema, null, 2);
    setLocalSchemaString(schemaString);
    onSchemaUpdate(exampleSchema, schemaString);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Edit Your Schema
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Fine-tune your JSON schema with advanced properties and validation
          rules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schema Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Schema Editor</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={formatSchema}>
                  Format JSON
                </Button>
                <Button variant="outline" size="sm" onClick={minifySchema}>
                  Minify JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCommonProperties}
                >
                  Add Metadata
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Textarea
                    value={localSchemaString}
                    onChange={(e) => handleSchemaChange(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Your JSON schema will appear here..."
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm flex items-center space-x-2">
                    <span>❌</span>
                    <span>{error}</span>
                  </div>
                )}
                {isValid && localSchemaString && (
                  <div className="text-green-600 text-sm flex items-center space-x-2">
                    <span>✅</span>
                    <span>Valid JSON Schema</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Example Schemas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {exampleSchemas.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => loadExampleSchema(example.schema)}
                >
                  {example.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Types
                </Badge>
                <div className="space-y-1 text-gray-600 dark:text-gray-300">
                  <div>• string, number, integer</div>
                  <div>• boolean, array, object</div>
                  <div>• null</div>
                </div>
              </div>

              <div>
                <Badge variant="secondary" className="mb-2">
                  Validation
                </Badge>
                <div className="space-y-1 text-gray-600 dark:text-gray-300">
                  <div>• minLength, maxLength</div>
                  <div>• minimum, maximum</div>
                  <div>• pattern (regex)</div>
                  <div>• enum (allowed values)</div>
                  <div>• format (email, date, etc.)</div>
                </div>
              </div>

              <div>
                <Badge variant="secondary" className="mb-2">
                  Structure
                </Badge>
                <div className="space-y-1 text-gray-600 dark:text-gray-300">
                  <div>• properties (object fields)</div>
                  <div>• required (required fields)</div>
                  <div>• items (array items)</div>
                  <div>• additionalProperties</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back: Create Schema
        </Button>
        <Button onClick={onNext} disabled={!isValid || !localSchemaString}>
          Next: Test Validation
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Ajv from "ajv";
import addFormats from "ajv-formats";

interface SchemaValidationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  schemaString: string;
  testJson: string;
  validationResult: {
    isValid: boolean;
    errors: string[];
  } | null;
  onTestJsonUpdate: (testJson: string) => void;
  onValidationUpdate: (result: { isValid: boolean; errors: string[] }) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function SchemaValidation({
  schema,
  schemaString,
  testJson,
  validationResult,
  onTestJsonUpdate,
  onValidationUpdate,
  onNext,
  onBack,
}: SchemaValidationProps) {
  const [currentTestJson, setCurrentTestJson] = useState(testJson || "");
  const [jsonParseError, setJsonParseError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    setCurrentTestJson(testJson || "");
  }, [testJson]);

  const validateJson = async () => {
    if (!currentTestJson.trim()) {
      onValidationUpdate({
        isValid: false,
        errors: ["Please enter JSON data to validate"],
      });
      return;
    }

    setIsValidating(true);
    setJsonParseError("");

    try {
      // Parse the test JSON
      const testData = JSON.parse(currentTestJson);

      // Create AJV instance
      const ajv = new Ajv({ allErrors: true });
      addFormats(ajv);

      // Compile the schema
      const validate = ajv.compile(schema);

      // Validate the data
      const isValid = validate(testData);

      let errors: string[] = [];
      if (!isValid && validate.errors) {
        errors = validate.errors.map((error) => {
          const path = error.instancePath || "root";
          const message = error.message || "validation failed";
          return `${path}: ${message}`;
        });
      }

      const result = { isValid, errors };
      onValidationUpdate(result);
      onTestJsonUpdate(currentTestJson);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setJsonParseError("Invalid JSON format. Please check your syntax.");
        onValidationUpdate({ isValid: false, errors: ["Invalid JSON format"] });
      } else {
        onValidationUpdate({
          isValid: false,
          errors: ["Validation error occurred"],
        });
      }
    } finally {
      setIsValidating(false);
    }
  };

  const generateSampleData = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sampleData: any = generateSampleFromSchema(schema);
    const sampleJson = JSON.stringify(sampleData, null, 2);
    setCurrentTestJson(sampleJson);
    onTestJsonUpdate(sampleJson);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateSampleFromSchema = (schema: any): any => {
    if (!schema || typeof schema !== "object") return {};

    switch (schema.type) {
      case "string":
        if (schema.enum) return schema.enum[0];
        if (schema.format === "email") return "user@example.com";
        if (schema.format === "date") return "2024-01-01";
        if (schema.format === "date-time") return "2024-01-01T00:00:00Z";
        if (schema.pattern) {
          // Generate sample data that matches common patterns
          if (schema.pattern === "^[0-9]{10}$") return "1234567890";
          if (schema.pattern.includes("[0-9]")) return "1234567890";
          if (schema.pattern.includes("[a-zA-Z]")) return "sampletext";
          // For other patterns, try to generate a basic match
          return "sample";
        }
        return "sample text";

      case "number":
      case "integer":
        if (schema.enum) return schema.enum[0];
        if (schema.minimum !== undefined) return schema.minimum;
        return schema.type === "integer" ? 42 : 42.5;

      case "boolean":
        if (schema.enum) return schema.enum[0];
        return true;

      case "array":
        if (schema.items) {
          return [generateSampleFromSchema(schema.items)];
        }
        return ["sample item"];

      case "object":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj: any = {};
        if (schema.properties) {
          Object.keys(schema.properties).forEach((key) => {
            obj[key] = generateSampleFromSchema(schema.properties[key]);
          });
        }
        return obj;

      case "null":
        return null;

      default:
        // Handle enum values for any type
        if (schema.enum) return schema.enum[0];
        return "sample value";
    }
  };

  const testExamples = [
    {
      name: "Valid Example",
      description: "Generate valid sample data",
      action: generateSampleData,
    },
    {
      name: "Empty Object",
      description: "Test with empty object",
      json: "{}",
    },
    {
      name: "Null Value",
      description: "Test with null",
      json: "null",
    },
    {
      name: "Array Example",
      description: "Test with array",
      json: "[]",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadTestExample = (example: any) => {
    if (example.action) {
      example.action();
    } else if (example.json) {
      setCurrentTestJson(example.json);
      onTestJsonUpdate(example.json);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Test Your Schema
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Validate JSON data against your schema to ensure it works correctly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schema Display */}
        <Card>
          <CardHeader>
            <CardTitle>Your Schema</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={schemaString}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
            />
          </CardContent>
        </Card>

        {/* Test JSON Input */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Test JSON Data</CardTitle>
            <Button variant="outline" size="sm" onClick={generateSampleData}>
              Generate Sample
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={currentTestJson}
              onChange={(e) => {
                setCurrentTestJson(e.target.value);
                setJsonParseError("");
              }}
              placeholder={`{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}`}
              className="min-h-[250px] font-mono text-sm"
            />

            {jsonParseError && (
              <div className="text-red-600 text-sm flex items-center space-x-2">
                <span>❌</span>
                <span>{jsonParseError}</span>
              </div>
            )}

            <Button
              onClick={validateJson}
              disabled={!currentTestJson.trim() || isValidating}
              className="w-full"
            >
              {isValidating ? "Validating..." : "Validate JSON"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Validation Results */}
      {validationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Validation Results</span>
              <Badge
                variant={validationResult.isValid ? "default" : "destructive"}
              >
                {validationResult.isValid ? "✅ Valid" : "❌ Invalid"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {validationResult.isValid ? (
              <div className="text-green-600 dark:text-green-400">
                🎉 Your JSON data is valid according to the schema!
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-red-600 dark:text-red-400 font-medium">
                  Validation Errors:
                </div>
                <ul className="space-y-1">
                  {validationResult.errors.map((error, index) => (
                    <li
                      key={index}
                      className="text-red-600 dark:text-red-400 text-sm"
                    >
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Test Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {testExamples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => loadTestExample(example)}
                className="h-auto p-3 flex flex-col items-start space-y-1"
              >
                <span className="font-medium text-sm">{example.name}</span>
                <span className="text-xs text-gray-500 text-left">
                  {example.description}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back: Edit Schema
        </Button>
        <Button onClick={onNext}>Next: Export Code</Button>
      </div>
    </div>
  );
}

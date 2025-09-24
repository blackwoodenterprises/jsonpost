"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SchemaExportProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  schemaString: string;
  onBack: () => void;
  onStartOver: () => void;
}

export function SchemaExport({
  schema,
  schemaString,
  onBack,
  onStartOver,
}: SchemaExportProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateTypeScriptInterface = (schema: any): string => {
    if (!schema || !schema.properties) {
      return "interface GeneratedType {\n  [key: string]: any;\n}";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generateTypeFromSchema = (prop: any): string => {
      if (!prop) return "any";

      switch (prop.type) {
        case "string":
          if (prop.enum) {
            return prop.enum.map((val: string) => `"${val}"`).join(" | ");
          }
          return "string";
        case "number":
        case "integer":
          return "number";
        case "boolean":
          return "boolean";
        case "array":
          if (prop.items) {
            const itemType = generateTypeFromSchema(prop.items);
            return `${itemType}[]`;
          }
          return "any[]";
        case "object":
          if (prop.properties) {
            const props = Object.keys(prop.properties)
              .map((key) => {
                const isRequired = prop.required?.includes(key);
                const propType = generateTypeFromSchema(prop.properties[key]);
                return `  ${key}${isRequired ? "" : "?"}: ${propType};`;
              })
              .join("\n");
            return `{\n${props}\n}`;
          }
          return "object";
        case "null":
          return "null";
        default:
          return "any";
      }
    };

    const interfaceName = schema.title
      ? schema.title.replace(/[^a-zA-Z0-9]/g, "")
      : "GeneratedType";

    const properties = Object.keys(schema.properties)
      .map((key) => {
        const isRequired = schema.required?.includes(key);
        const propType = generateTypeFromSchema(schema.properties[key]);
        return `  ${key}${isRequired ? "" : "?"}: ${propType};`;
      })
      .join("\n");

    return `interface ${interfaceName} {\n${properties}\n}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generatePythonClass = (schema: any): string => {
    if (!schema || !schema.properties) {
      return "from typing import Any, Dict\n\nclass GeneratedClass:\n    def __init__(self, **kwargs: Any) -> None:\n        self.__dict__.update(kwargs)";
    }

    const className = schema.title
      ? schema.title.replace(/[^a-zA-Z0-9]/g, "")
      : "GeneratedClass";

    const imports = new Set(["typing"]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generatePythonType = (prop: any): string => {
      if (!prop) return "Any";

      switch (prop.type) {
        case "string":
          return "str";
        case "number":
        case "integer":
          return "int" + (prop.type === "number" ? " | float" : "");
        case "boolean":
          return "bool";
        case "array":
          imports.add("List");
          if (prop.items) {
            const itemType = generatePythonType(prop.items);
            return `List[${itemType}]`;
          }
          return "List[Any]";
        case "object":
          imports.add("Dict");
          return "Dict[str, Any]";
        case "null":
          return "None";
        default:
          return "Any";
      }
    };

    const properties = Object.keys(schema.properties)
      .map((key) => {
        const propType = generatePythonType(schema.properties[key]);
        const isRequired = schema.required?.includes(key);
        return `    ${key}: ${isRequired ? propType : `Optional[${propType}]`}`;
      })
      .join("\n");

    const importStr = `from typing import ${Array.from(imports).join(", ")}, Optional, Any`;

    return `${importStr}

class ${className}:
    """Generated from JSON Schema"""
${properties}
    
    def __init__(self, **kwargs: Any) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateJavaClass = (schema: any): string => {
    if (!schema || !schema.properties) {
      return "public class GeneratedClass {\n    // Add your properties here\n}";
    }

    const className = schema.title
      ? schema.title.replace(/[^a-zA-Z0-9]/g, "")
      : "GeneratedClass";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generateJavaType = (prop: any): string => {
      if (!prop) return "Object";

      switch (prop.type) {
        case "string":
          return "String";
        case "number":
          return "Double";
        case "integer":
          return "Integer";
        case "boolean":
          return "Boolean";
        case "array":
          if (prop.items) {
            const itemType = generateJavaType(prop.items);
            return `List<${itemType}>`;
          }
          return "List<Object>";
        case "object":
          return "Map<String, Object>";
        default:
          return "Object";
      }
    };

    const properties = Object.keys(schema.properties)
      .map((key) => {
        const propType = generateJavaType(schema.properties[key]);
        return `    private ${propType} ${key};`;
      })
      .join("\n");

    const gettersSetters = Object.keys(schema.properties)
      .map((key) => {
        const propType = generateJavaType(schema.properties[key]);
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        return `    public ${propType} get${capitalizedKey}() { return ${key}; }
    public void set${capitalizedKey}(${propType} ${key}) { this.${key} = ${key}; }`;
      })
      .join("\n\n");

    return `import java.util.*;

public class ${className} {
${properties}

${gettersSetters}
}`;
  };

  const generateValidationCode = (language: string): string => {
    switch (language) {
      case "javascript":
        return `// Using AJV for validation
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const schema = ${schemaString};

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

function validateData(data) {
  const isValid = validate(data);
  if (!isValid) {
    console.log('Validation errors:', validate.errors);
    return false;
  }
  return true;
}

// Example usage:
const testData = { /* your data here */ };
const isValid = validateData(testData);`;

      case "python":
        return `# Using jsonschema for validation
import json
from jsonschema import validate, ValidationError

schema = ${schemaString.replace(/"/g, '"')}

def validate_data(data):
    try:
        validate(instance=data, schema=schema)
        return True, None
    except ValidationError as e:
        return False, str(e)

# Example usage:
test_data = {}  # your data here
is_valid, error = validate_data(test_data)
if not is_valid:
    print(f"Validation error: {error}")`;

      case "java":
        return `// Using everit-org/json-schema for validation
import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;

public class SchemaValidator {
    private static final String SCHEMA_JSON = ${JSON.stringify(schemaString)};
    
    public static boolean validateData(String jsonData) {
        try {
            JSONObject schemaJson = new JSONObject(new JSONTokener(SCHEMA_JSON));
            Schema schema = SchemaLoader.load(schemaJson);
            
            JSONObject dataJson = new JSONObject(new JSONTokener(jsonData));
            schema.validate(dataJson);
            
            return true;
        } catch (Exception e) {
            System.out.println("Validation error: " + e.getMessage());
            return false;
        }
    }
}`;

      default:
        return "// Validation code not available for this language";
    }
  };

  const exportFormats = [
    {
      id: "json",
      name: "JSON Schema",
      description: "Standard JSON Schema format",
      content: schemaString,
      language: "json",
    },
    {
      id: "typescript",
      name: "TypeScript Interface",
      description: "TypeScript type definitions",
      content: generateTypeScriptInterface(schema),
      language: "typescript",
    },
    {
      id: "python",
      name: "Python Class",
      description: "Python class definition",
      content: generatePythonClass(schema),
      language: "python",
    },
    {
      id: "java",
      name: "Java Class",
      description: "Java POJO class",
      content: generateJavaClass(schema),
      language: "java",
    },
  ];

  const validationExamples = [
    {
      id: "javascript",
      name: "JavaScript/Node.js",
      content: generateValidationCode("javascript"),
    },
    {
      id: "python",
      name: "Python",
      content: generateValidationCode("python"),
    },
    {
      id: "java",
      name: "Java",
      content: generateValidationCode("java"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Export Your Schema
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Download your schema in various formats or copy validation code
        </p>
      </div>

      <Tabs defaultValue="formats" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="formats">Export Formats</TabsTrigger>
          <TabsTrigger value="validation">Validation Code</TabsTrigger>
        </TabsList>

        <TabsContent value="formats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exportFormats.map((format) => (
              <Card key={format.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{format.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {format.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(format.content, format.id)}
                  >
                    {copiedFormat === format.id ? "Copied!" : "Copy"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={format.content}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <div className="space-y-6">
            {validationExamples.map((example) => (
              <Card key={example.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{example.name}</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        example.content,
                        `validation-${example.id}`
                      )
                    }
                  >
                    {copiedFormat === `validation-${example.id}`
                      ? "Copied!"
                      : "Copy"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={example.content}
                    readOnly
                    className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Schema Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {schema?.properties ? Object.keys(schema.properties).length : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Properties
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {schema?.required ? schema.required.length : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Required Fields
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {schema?.type || "object"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Root Type
              </div>
            </div>
          </div>

          {schema?.title && (
            <div className="text-center">
              <Badge variant="secondary">{schema.title}</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back: Test Validation
        </Button>
        <Button onClick={onStartOver}>Create New Schema</Button>
      </div>
    </div>
  );
}

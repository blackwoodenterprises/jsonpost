"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SchemaBuilderWizard } from "@/components/schema-builder/schema-builder-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Zap, Code, Database, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SchemaBuilderPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Free JSON Schema Builder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create, edit, and validate JSON schemas visually. Build schemas
              from scratch, infer them from JSON data, and test validation with
              real-time feedback.
            </p>
          </div>

          <SchemaBuilderWizard />

          {/* Article Section */}
          <div className="mt-16 space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Understanding JSON Schemas: A Complete Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Learn everything you need to know about JSON schemas, why they&apos;re essential for modern applications, 
                and how JSONPost makes schema validation effortless.
              </p>
            </div>

            {/* What are JSON Schemas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Code className="h-6 w-6 text-blue-600" />
                  What are JSON Schemas?
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                  JSON Schema is a powerful vocabulary that allows you to annotate and validate JSON documents. 
                  Think of it as a blueprint or contract that defines the structure, data types, and constraints 
                  for your JSON data. It&apos;s like having a strict set of rules that your data must follow.
                </p>
                
                <p>
                  A JSON Schema describes your existing data format with clear, human and machine-readable documentation. 
                  It provides complete structural validation, useful for automated testing and ensuring quality when 
                  receiving data from external sources.
                </p>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg my-6">
                  <h4 className="font-semibold mb-2">Example JSON Schema:</h4>
                  <pre className="text-sm overflow-x-auto">
{`{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 120
    }
  },
  "required": ["name", "email"]
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Why JSON Schemas Matter */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-6 w-6 text-green-600" />
                  Why JSON Schemas Are Essential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Data Validation</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Ensure incoming data meets your exact requirements before processing, 
                          preventing errors and security vulnerabilities.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">API Documentation</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Automatically generate clear, comprehensive API documentation 
                          that&apos;s always in sync with your actual data structures.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Code Generation</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Generate type definitions, classes, and interfaces for multiple 
                          programming languages from your schemas.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Testing & Quality Assurance</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Create automated tests that verify your data structures, 
                          catching issues before they reach production.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Team Collaboration</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Provide a single source of truth for data structures 
                          that frontend and backend teams can rely on.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Error Prevention</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Catch data structure mismatches early in development, 
                          reducing bugs and improving application reliability.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Use Cases */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Database className="h-6 w-6 text-purple-600" />
                  Common Use Cases for JSON Schemas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">API Validation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Validate request and response payloads in REST APIs, GraphQL, and webhooks
                    </p>
                  </div>

                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Database className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Configuration Files</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ensure configuration files follow the correct structure and contain valid values
                    </p>
                  </div>

                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Code className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Form Validation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Create dynamic forms with client and server-side validation from schemas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How JSONPost Helps */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Zap className="h-6 w-6 text-indigo-600" />
                  How JSONPost Can Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    JSONPost is primarily a form backend service that handles form submissions via API endpoints. 
                    As part of our service, we also provide JSON schema validation to ensure your form data meets your requirements.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                          Form Backend Service
                        </Badge>
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• Receive form submissions via simple HTTP POST requests</li>
                        <li>• No backend infrastructure needed</li>
                        <li>• Automatic email notifications and webhooks</li>
                        <li>• Dashboard to manage all your form submissions</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Optional Schema Validation
                        </Badge>
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• Validate form data against JSON schemas</li>
                        <li>• Ensure data quality before processing</li>
                        <li>• Detailed validation error messages</li>
                        <li>• Works seamlessly with our form endpoints</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                    <h4 className="font-semibold mb-3">Example: Form Submission with Schema Validation</h4>
                    <div className="space-y-3">
                      <div>
                        <Badge variant="outline" className="mb-2">Step 1</Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Create your JSON schema using our visual builder above
                        </p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">Step 2</Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Point your HTML form to your JSONPost endpoint
                        </p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">Step 3</Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Form submissions are automatically validated and processed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Ready to simplify your form handling?
                    </p>
                    <div className="flex justify-center">
                      <Link href="/auth/signup">
                        <Button
                          size="lg"
                          className="text-lg px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          Get Started Free
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

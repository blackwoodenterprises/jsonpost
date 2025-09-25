"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SchemaBuilderWizard } from "@/components/schema-builder/schema-builder-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Zap, Code, Database, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export function JsonSchemaBuilderClient() {
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
                  <Database className="h-6 w-6 text-blue-600" />
                  What are JSON Schemas?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. 
                    It provides a contract for what JSON data is required for a given application and how to interact with it.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">Key Benefits:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Data Validation</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Ensure incoming data matches expected structure and types
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">API Documentation</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Self-documenting APIs with clear data requirements
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Code Generation</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Generate types, interfaces, and validation code automatically
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Error Prevention</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Catch data issues early in development and production
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Use JSON Schemas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-6 w-6 text-green-600" />
                  Why Use JSON Schemas in Your Projects?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Modern applications rely heavily on JSON for data exchange. Without proper validation, 
                    you&apos;re vulnerable to runtime errors, security issues, and data corruption.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Code className="h-6 w-6 text-red-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Without Schemas</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Runtime errors from bad data</li>
                        <li>• Inconsistent API responses</li>
                        <li>• Hard to debug data issues</li>
                        <li>• Manual validation code</li>
                      </ul>
                    </div>

                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-2">With Schemas</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• Automatic data validation</li>
                        <li>• Clear API contracts</li>
                        <li>• Better error messages</li>
                        <li>• Generated documentation</li>
                      </ul>
                    </div>

                    <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Globe className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Real-World Uses</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>• API request/response validation</li>
                        <li>• Configuration file validation</li>
                        <li>• Form data validation</li>
                        <li>• Database schema enforcement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Use Cases */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Code className="h-6 w-6 text-purple-600" />
                  Common JSON Schema Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">API Validation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Validate incoming requests and outgoing responses in REST APIs and GraphQL
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Configuration Files</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ensure application config files have the correct structure and values
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Form Validation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Create dynamic forms with client and server-side validation from schemas
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Data Migration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Validate data integrity during database migrations and ETL processes
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Testing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Generate test data and validate API responses in automated tests
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Documentation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Auto-generate API documentation with clear data structure examples
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
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Form Backend + Schema Validation
                      </h4>
                      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Handle form submissions without backend code</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Validate form data against your JSON schemas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Get email notifications for new submissions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Integrate with webhooks and third-party services</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Built-in Security & Reliability
                      </h4>
                      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Spam protection and rate limiting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>GDPR compliant data handling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>99.9% uptime SLA</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Automatic backups and data recovery</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-lg mb-4 text-center">
                      Ready to simplify your form handling?
                    </h4>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
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
"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SchemaBuilderWizard } from "@/components/schema-builder/schema-builder-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Zap, Code, Database, Globe, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function JsonSchemaBuilderClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Free Tool
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-800 dark:from-white dark:via-emerald-400 dark:to-slate-200 bg-clip-text text-transparent">
              JSON Schema Builder
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Create, edit, and validate JSON schemas visually. Build schemas from scratch, 
              infer them from JSON data, and test validation with real-time feedback.
            </p>
          </div>

          <SchemaBuilderWizard />

          {/* Article Section */}
          <div className="mt-16 space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Understanding JSON Schemas: A Complete Guide
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Learn everything you need to know about JSON schemas, why they&apos;re essential for modern applications, 
                and how JSONPost makes schema validation effortless.
              </p>
            </div>

            {/* What are JSON Schemas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Database className="h-6 w-6 text-emerald-600" />
                  What are JSON Schemas?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg text-slate-700 dark:text-slate-300">
                    JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. 
                    It provides a contract for what JSON data is required for a given application and how to interact with it.
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">Key Benefits:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Data Validation</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Ensure incoming data matches expected structure and types
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Documentation</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Generate clear, comprehensive API documentation
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Code Generation</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Auto-generate validation code for multiple languages
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium">Testing</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Test your schemas with sample data instantly
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
                  <Shield className="h-6 w-6 text-emerald-600" />
                  Why Use JSON Schemas in Your Projects?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-lg text-slate-700 dark:text-slate-300">
                    Modern applications rely heavily on JSON for data exchange. Without proper validation, 
                    you&apos;re vulnerable to runtime errors, security issues, and data corruption.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Code className="h-6 w-6 text-red-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Without Schemas</h4>
                      <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        <li>• Runtime errors from bad data</li>
                        <li>• Inconsistent API responses</li>
                        <li>• Hard to debug data issues</li>
                        <li>• Manual validation code</li>
                      </ul>
                    </div>

                    <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                      </div>
                      <h4 className="font-semibold mb-2">With Schemas</h4>
                      <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        <li>• Automatic data validation</li>
                        <li>• Clear API contracts</li>
                        <li>• Better error messages</li>
                        <li>• Generated documentation</li>
                      </ul>
                    </div>

                    <div className="text-center p-6 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Globe className="h-6 w-6 text-slate-600" />
                      </div>
                      <h4 className="font-semibold mb-2">With JSONPost</h4>
                      <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        <li>• Visual schema builder</li>
                        <li>• Real-time validation</li>
                        <li>• Multiple export formats</li>
                        <li>• Instant form generation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div>
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-emerald-600" />
                        Common Use Cases
                      </h4>
                      <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>API request/response validation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Configuration file validation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Form data validation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Database schema documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Microservice contract definition</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Integrate with webhooks and third-party services</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-emerald-600" />
                        Built-in Security & Reliability
                      </h4>
                      <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Spam protection and rate limiting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>GDPR compliant data handling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>99.9% uptime SLA</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Automatic backups and data recovery</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-lg mb-4 text-center">
                      Ready to simplify your form handling?
                    </h4>
                    <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
                      Ready to simplify your form handling?
                    </p>
                    <div className="flex justify-center">
                      <Link href="/auth/signup">
                        <Button
                          size="lg"
                          className="text-lg px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
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
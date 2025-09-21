/* eslint-disable react/no-unescaped-entities, react/jsx-no-comment-textnodes */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import {
  Code,
  Zap,
  Mail,
  Webhook,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Globe,
  Database,
  FileText,
  AlertCircle,
  Info,
  Terminal,
  Server,
  Key,
  Lock,
  Upload,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <FileText className="w-4 h-4 mr-1" />
              Developer Documentation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JSONPost Integration Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Complete developer documentation for integrating JSONPost headless
              form backend into your frontend applications. Get started in
              minutes with our simple API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#quick-start">
                  Quick Start <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/signup">Get API Key</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="#quick-start"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Zap className="w-5 h-5 mr-3 text-blue-600" />
              <span>Quick Start</span>
            </Link>
            <Link
              href="#authentication"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Key className="w-5 h-5 mr-3 text-green-600" />
              <span>Authentication</span>
            </Link>
            <Link
              href="#api-reference"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Database className="w-5 h-5 mr-3 text-purple-600" />
              <span>API Reference</span>
            </Link>
            <Link
              href="#html-forms"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Globe className="w-5 h-5 mr-3 text-orange-600" />
              <span>HTML Forms</span>
            </Link>
            <Link
              href="#javascript-integration"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Code className="w-5 h-5 mr-3 text-red-600" />
              <span>JavaScript/React</span>
            </Link>
            <Link
              href="#frameworks"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Server className="w-5 h-5 mr-3 text-indigo-600" />
              <span>Framework Examples</span>
            </Link>
            <Link
              href="#file-uploads"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Upload className="w-5 h-5 mr-3 text-cyan-600" />
              <span>File Uploads</span>
            </Link>
            <Link
              href="#webhooks"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Webhook className="w-5 h-5 mr-3 text-teal-600" />
              <span>Webhooks</span>
            </Link>
            <Link
              href="#email-notifications"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Mail className="w-5 h-5 mr-3 text-pink-600" />
              <span>Email Notifications</span>
            </Link>
            <Link
              href="#security"
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Shield className="w-5 h-5 mr-3 text-yellow-600" />
              <span>Security</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-blue-600" />
              Quick Start
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Get your form backend up and running in 3 simple steps.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <Card className="border-2 border-blue-200 dark:border-blue-700">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Create Account & Project</CardTitle>
                <CardDescription>
                  Sign up for JSONPost and create your first project to get your
                  unique endpoint URL.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 2 */}
            <Card className="border-2 border-green-200 dark:border-green-700">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <CardTitle>Configure Endpoint</CardTitle>
                <CardDescription>
                  Set up your form endpoint with email notifications, webhooks,
                  and custom settings.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 3 */}
            <Card className="border-2 border-purple-200 dark:border-purple-700">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <CardTitle>Start Submitting</CardTitle>
                <CardDescription>
                  Point your forms to your JSONPost endpoint and start
                  collecting submissions instantly.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Quick Example */}
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                Your First Form Submission
              </CardTitle>
              <CardDescription>
                Here's how simple it is to submit data to JSONPost:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <div className="text-green-400 mb-2">
                  # Your JSONPost endpoint URL
                </div>
                <div className="text-blue-400 mb-4">
                  https://jsonpost.com/api/submit/your-project-id/contact
                </div>

                <div className="text-green-400 mb-2"># Submit with cURL</div>
                <div className="text-white">curl -X POST \</div>
                <div className="text-white ml-2">
                  https://jsonpost.com/api/submit/your-project-id/contact \
                </div>
                <div className="text-white ml-2">
                  -H &quot;Content-Type: application/json&quot; \
                </div>
                <div className="text-white ml-2">
                  -d &apos;{`{`}&quot;name&quot;{`:`} &quot;John Doe&quot;,
                  &quot;email&quot;{`:`} &quot;john@example.com&quot;,
                  &quot;message&quot;{`:`} &quot;Hello!&quot;{`}`}&apos;
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Authentication Section */}
      <section
        id="authentication"
        className="py-16 px-4 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Key className="w-8 h-8 mr-3 text-green-600" />
              Authentication
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              JSONPost provides flexible authentication options to match your security needs. 
              Choose between public endpoints for simple forms or API key authentication for secure applications.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Flexible Authentication</CardTitle>
                <CardDescription>
                  JSONPost supports both public endpoints and secure API key authentication 
                  depending on your security requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Public Endpoints</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      For simple contact forms and public submissions, no API key is required. 
                      Your project ID and endpoint path provide basic access control.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Secure Endpoints</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Enable API key authentication for sensitive forms or when you need 
                      to restrict access to authorized applications only.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Security Note:</strong> You can configure each endpoint 
                        individually to require API key authentication through your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Endpoint URL Structure</CardTitle>
                <CardDescription>
                  Every endpoint follows a consistent URL pattern for easy
                  integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono">
                  <div className="text-gray-400 mb-2"># URL Structure</div>
                  <div className="text-white">
                    https://jsonpost.com/api/submit/
                  </div>
                  <div className="text-blue-400 ml-2">[PROJECT_ID]</div>
                  <div className="text-white">/</div>
                  <div className="text-green-400 ml-2">[ENDPOINT_PATH]</div>

                  <div className="text-gray-400 mt-4 mb-2"># Example</div>
                  <div className="text-white">
                    https://jsonpost.com/api/submit/
                  </div>
                  <div className="text-blue-400 ml-2">abc123-def456-ghi789</div>
                  <div className="text-white">/</div>
                  <div className="text-green-400 ml-2">contact</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Reference Section */}
      <section id="api-reference" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Database className="w-8 h-8 mr-3 text-purple-600" />
              API Reference
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Complete reference for the JSONPost submission API.
            </p>
          </div>

          {/* Endpoint Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Form Submission Endpoint</CardTitle>
              <CardDescription>
                Submit form data to your JSONPost endpoint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* HTTP Methods */}
                <div>
                  <h4 className="font-semibold mb-3">Supported HTTP Methods</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">POST</Badge>
                    <Badge variant="secondary">PUT</Badge>
                    <Badge variant="secondary">PATCH</Badge>
                    <Badge variant="outline">OPTIONS</Badge>
                  </div>
                </div>

                {/* Content Types */}
                <div>
                  <h4 className="font-semibold mb-3">
                    Supported Content Types
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                        application/json
                      </code>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                        application/x-www-form-urlencoded
                      </code>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                        multipart/form-data
                      </code>
                    </li>
                  </ul>
                </div>

                {/* Response Format */}
                <div>
                  <h4 className="font-semibold mb-3">Response Format</h4>
                  <div className="bg-black rounded-lg p-4 text-sm font-mono">
                    <div className="text-green-400 mb-2">
                      # Success Response (200)
                    </div>
                    <div className="text-white">{"{"}</div>
                    <div className="text-blue-400 ml-2">"success": true,</div>
                    <div className="text-blue-400 ml-2">
                      "message": "Submission received successfully",
                    </div>
                    <div className="text-blue-400 ml-2">
                      "submission_id": "uuid-here"
                    </div>
                    <div className="text-white">{"}"}</div>

                    <div className="text-red-400 mt-4 mb-2">
                      # Error Response (4xx/5xx)
                    </div>
                    <div className="text-white">{"{"}</div>
                    <div className="text-red-400 ml-2">
                      "error": "Error message here"
                    </div>
                    <div className="text-white">{"}"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CORS Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                CORS Support
              </CardTitle>
              <CardDescription>
                JSONPost supports cross-origin requests from any domain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Full CORS Support:</strong> All JSONPost endpoints
                      include proper CORS headers, allowing requests from any
                      origin. Perfect for frontend applications, static sites,
                      and SPAs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HTML Forms Section */}
      <section
        id="html-forms"
        className="py-16 px-4 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Globe className="w-8 h-8 mr-3 text-orange-600" />
              HTML Forms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              The simplest way to integrate JSONPost with traditional HTML
              forms.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic HTML Form */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Contact Form</CardTitle>
                <CardDescription>
                  A simple contact form that submits directly to JSONPost
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-blue-400">&lt;form</div>
                  <div className="text-blue-400 ml-2">
                    action="https://jsonpost.com/api/submit/
                  </div>
                  <div className="text-blue-400 ml-4">
                    your-project-id/contact"
                  </div>
                  <div className="text-blue-400 ml-2">method="POST"&gt;</div>

                  <div className="text-green-400 ml-2 mt-2">&lt;input</div>
                  <div className="text-green-400 ml-4">type="text"</div>
                  <div className="text-green-400 ml-4">name="name"</div>
                  <div className="text-green-400 ml-4">
                    placeholder="Your Name"
                  </div>
                  <div className="text-green-400 ml-4">required /&gt;</div>

                  <div className="text-green-400 ml-2 mt-2">&lt;input</div>
                  <div className="text-green-400 ml-4">type="email"</div>
                  <div className="text-green-400 ml-4">name="email"</div>
                  <div className="text-green-400 ml-4">
                    placeholder="your@email.com"
                  </div>
                  <div className="text-green-400 ml-4">required /&gt;</div>

                  <div className="text-green-400 ml-2 mt-2">&lt;textarea</div>
                  <div className="text-green-400 ml-4">name="message"</div>
                  <div className="text-green-400 ml-4">
                    placeholder="Your message"
                  </div>
                  <div className="text-green-400 ml-4">
                    required&gt;&lt;/textarea&gt;
                  </div>

                  <div className="text-yellow-400 ml-2 mt-2">
                    &lt;button type="submit"&gt;
                  </div>
                  <div className="text-yellow-400 ml-4">Send Message</div>
                  <div className="text-yellow-400 ml-2">&lt;/button&gt;</div>

                  <div className="text-blue-400">&lt;/form&gt;</div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced HTML Form */}
            <Card>
              <CardHeader>
                <CardTitle>Advanced Form with Redirect</CardTitle>
                <CardDescription>
                  Form with hidden fields and custom redirect handling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-blue-400">&lt;form</div>
                  <div className="text-blue-400 ml-2">
                    action="https://jsonpost.com/api/submit/
                  </div>
                  <div className="text-blue-400 ml-4">
                    your-project-id/newsletter"
                  </div>
                  <div className="text-blue-400 ml-2">method="POST"&gt;</div>

                  <div className="text-gray-400 ml-2 mt-2">
                    &lt;!-- Visible fields --&gt;
                  </div>
                  <div className="text-green-400 ml-2">
                    &lt;input name="email" type="email" required /&gt;
                  </div>
                  <div className="text-green-400 ml-2">
                    &lt;input name="name" type="text" /&gt;
                  </div>

                  <div className="text-gray-400 ml-2 mt-2">
                    &lt;!-- Hidden metadata --&gt;
                  </div>
                  <div className="text-purple-400 ml-2">
                    &lt;input type="hidden" name="source" value="homepage" /&gt;
                  </div>
                  <div className="text-purple-400 ml-2">
                    &lt;input type="hidden" name="campaign" value="summer2024"
                    /&gt;
                  </div>

                  <div className="text-yellow-400 ml-2 mt-2">
                    &lt;button type="submit"&gt;Subscribe&lt;/button&gt;
                  </div>
                  <div className="text-blue-400">&lt;/form&gt;</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* HTML Form Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2" />
                HTML Form Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">✅ Do</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>
                      • Use descriptive <code>name</code> attributes
                    </li>
                    <li>• Include proper validation attributes</li>
                    <li>• Add hidden fields for tracking</li>
                    <li>• Use HTTPS for secure submissions</li>
                    <li>• Test form submissions thoroughly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">❌ Don't</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Submit sensitive data without encryption</li>
                    <li>• Use generic field names like "field1"</li>
                    <li>• Forget to handle form submission errors</li>
                    <li>• Submit forms without user consent</li>
                    <li>• Ignore accessibility best practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* JavaScript Integration Section */}
      <section id="javascript-integration" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Code className="w-8 h-8 mr-3 text-red-600" />
              JavaScript & React Integration
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Modern JavaScript and React examples for dynamic form handling.
            </p>
          </div>

          <div className="space-y-8">
            {/* Vanilla JavaScript */}
            <Card>
              <CardHeader>
                <CardTitle>Vanilla JavaScript with Fetch API</CardTitle>
                <CardDescription>
                  Handle form submissions with modern JavaScript
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-purple-400">
                    async function submitForm(formData) {`{`}
                  </div>
                  <div className="text-blue-400 ml-2">try {`{`}</div>
                  <div className="text-white ml-4">
                    const response = await fetch(
                  </div>
                  <div className="text-green-400 ml-6">
                    'https://jsonpost.com/api/submit/your-project-id/contact',
                  </div>
                  <div className="text-white ml-6">{`{`}</div>
                  <div className="text-white ml-8">method: 'POST',</div>
                  <div className="text-white ml-8">headers: {`{`}</div>
                  <div className="text-white ml-10">
                    'Content-Type': 'application/json',
                  </div>
                  <div className="text-white ml-8">{`}`},</div>
                  <div className="text-white ml-8">
                    body: JSON.stringify(formData)
                  </div>
                  <div className="text-white ml-6">{`}`}</div>
                  <div className="text-white ml-4">);</div>

                  <div className="text-white ml-4 mt-2">
                    const result = await response.json();
                  </div>

                  <div className="text-green-400 ml-4 mt-2">
                    if (result.success) {`{`}
                  </div>
                  <div className="text-white ml-6">
                    console.log('Form submitted successfully!');
                  </div>
                  <div className="text-white ml-6">
                    // Handle success (show message, redirect, etc.)
                  </div>
                  <div className="text-green-400 ml-4">
                    {`}`} else {`{`}
                  </div>
                  <div className="text-white ml-6">
                    console.error('Submission failed:', result.error);
                  </div>
                  <div className="text-green-400 ml-4">{`}`}</div>

                  <div className="text-blue-400 ml-2">
                    {`}`} catch (error) {`{`}
                  </div>
                  <div className="text-red-400 ml-4">
                    console.error('Network error:', error);
                  </div>
                  <div className="text-blue-400 ml-2">{`}`}</div>
                  <div className="text-purple-400">{`}`}</div>

                  <div className="text-gray-400 mt-4">// Usage</div>
                  <div className="text-white">submitForm({`{`}</div>
                  <div className="text-white ml-2">name: 'John Doe',</div>
                  <div className="text-white ml-2">
                    email: 'john@example.com',
                  </div>
                  <div className="text-white ml-2">
                    message: 'Hello from JavaScript!'
                  </div>
                  <div className="text-white">{`}`});</div>
                </div>
              </CardContent>
            </Card>

            {/* React Hook Example */}
            <Card>
              <CardHeader>
                <CardTitle>React Hook for Form Handling</CardTitle>
                <CardDescription>
                  Custom React hook for JSONPost integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-blue-400">
                    import {`{`} useState {`}`} from 'react';
                  </div>

                  <div className="text-purple-400 mt-4">
                    function useJSONPost(endpoint) {"{"}
                  </div>
                  <div className="text-white ml-2">
                    const [loading, setLoading] = useState(false);
                  </div>
                  <div className="text-white ml-2">
                    const [error, setError] = useState(null);
                  </div>
                  <div className="text-white ml-2">
                    const [success, setSuccess] = useState(false);
                  </div>

                  <div className="text-green-400 ml-2 mt-2">
                    const submit = async (data) =&gt; {"{"}
                  </div>
                  <div className="text-white ml-4">setLoading(true);</div>
                  <div className="text-white ml-4">setError(null);</div>
                  <div className="text-white ml-4">setSuccess(false);</div>

                  <div className="text-blue-400 ml-4 mt-2">try {"{"}</div>
                  <div className="text-white ml-6">
                    const response = await fetch(endpoint, {`{`}
                  </div>
                  <div className="text-white ml-8">method: 'POST',</div>
                  <div className="text-white ml-8">
                    headers: {`{`} 'Content-Type': 'application/json' {`}`},
                  </div>
                  <div className="text-white ml-8">
                    body: JSON.stringify(data)
                  </div>
                  <div className="text-white ml-6">{`}`});</div>

                  <div className="text-white ml-6">
                    const result = await response.json();
                  </div>

                  <div className="text-green-400 ml-6">
                    if (result.success) {`{`}
                  </div>
                  <div className="text-white ml-8">setSuccess(true);</div>
                  <div className="text-green-400 ml-6">
                    {`}`} else {`{`}
                  </div>
                  <div className="text-white ml-8">setError(result.error);</div>
                  <div className="text-green-400 ml-6">{`}`}</div>

                  <div className="text-blue-400 ml-4">
                    {`}`} catch (err) {`{`}
                  </div>
                  <div className="text-red-400 ml-6">
                    setError('Network error occurred');
                  </div>
                  <div className="text-blue-400 ml-4">
                    {`}`} finally {`{`}
                  </div>
                  <div className="text-white ml-6">setLoading(false);</div>
                  <div className="text-blue-400 ml-4">{`}`}</div>
                  <div className="text-green-400 ml-2">{`}`};</div>

                  <div className="text-white ml-2 mt-2">
                    return {`{`} submit, loading, error, success {`}`};
                  </div>
                  <div className="text-purple-400">{`}`}</div>

                  <div className="text-gray-400 mt-4">
                    // Usage in component
                  </div>
                  <div className="text-purple-400">
                    function ContactForm() {`{`}
                  </div>
                  <div className="text-white ml-2">
                    const {`{`} submit, loading, error, success {`}`} =
                    useJSONPost(
                  </div>
                  <div className="text-green-400 ml-4">
                    'https://jsonpost.com/api/submit/your-project-id/contact'
                  </div>
                  <div className="text-white ml-2">);</div>

                  <div className="text-green-400 ml-2 mt-2">
                    const handleSubmit = (e) =&gt; {"{"}
                  </div>
                  <div className="text-white ml-4">e.preventDefault();</div>
                  <div className="text-white ml-4">
                    const formData = new FormData(e.target);
                  </div>
                  <div className="text-white ml-4">
                    submit(Object.fromEntries(formData));
                  </div>
                  <div className="text-green-400 ml-2">{`}`};</div>

                  <div className="text-white ml-2 mt-2">return (</div>
                  <div className="text-blue-400 ml-4">
                    &lt;form onSubmit={`{`}handleSubmit{`}`}&gt;
                  </div>
                  <div className="text-white ml-6">
                    {`{`}/* form fields */{`}`}
                  </div>
                  <div className="text-white ml-6">
                    &lt;button disabled={`{`}loading{`}`}&gt;
                  </div>
                  <div className="text-white ml-8">
                    {`{`}loading ? 'Sending...' : 'Send'{`}`}
                  </div>
                  <div className="text-white ml-6">&lt;/button&gt;</div>
                  <div className="text-blue-400 ml-4">&lt;/form&gt;</div>
                  <div className="text-white ml-2">);</div>
                  <div className="text-purple-400">{`}`}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Framework Examples Section */}
      <section
        id="frameworks"
        className="py-16 px-4 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Server className="w-8 h-8 mr-3 text-indigo-600" />
              Framework Examples
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Integration examples for popular web frameworks and libraries.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Vue.js Example */}
            <Card>
              <CardHeader>
                <CardTitle>Vue.js Integration</CardTitle>
                <CardDescription>
                  Using JSONPost with Vue.js and the Composition API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-blue-400">&lt;template&gt;</div>
                  <div className="text-white ml-2">
                    &lt;form @submit.prevent="submitForm"&gt;
                  </div>
                  <div className="text-green-400 ml-4">
                    &lt;input v-model="form.name" name="name" /&gt;
                  </div>
                  <div className="text-green-400 ml-4">
                    &lt;input v-model="form.email" name="email" /&gt;
                  </div>
                  <div className="text-yellow-400 ml-4">
                    &lt;button :disabled="loading"&gt;
                  </div>
                  <div className="text-white ml-6">
                    {'{{ loading ? "Sending..." : "Send" }}'}
                  </div>
                  <div className="text-yellow-400 ml-4">&lt;/button&gt;</div>
                  <div className="text-white ml-2">&lt;/form&gt;</div>
                  <div className="text-blue-400">&lt;/template&gt;</div>

                  <div className="text-purple-400 mt-4">
                    &lt;script setup&gt;
                  </div>
                  <div className="text-blue-400">
                    import {"{ ref }"} from 'vue'
                  </div>

                  <div className="text-white mt-2">
                    const form = ref({'{ name: "", email: "" }'})
                  </div>
                  <div className="text-white">const loading = ref(false)</div>

                  <div className="text-green-400 mt-2">
                    const submitForm = async () =&gt; {"{"}
                  </div>
                  <div className="text-white ml-2">loading.value = true</div>
                  <div className="text-white ml-2">
                    const response = await fetch(
                  </div>
                  <div className="text-green-400 ml-4">
                    'https://jsonpost.com/api/submit/your-project-id/contact',
                  </div>
                  <div className="text-white ml-4">
                    {'{ method: "POST", body: JSON.stringify(form.value) }'}
                  </div>
                  <div className="text-white ml-2">)</div>
                  <div className="text-white ml-2">loading.value = false</div>
                  <div className="text-green-400">{"}"}</div>
                  <div className="text-purple-400">&lt;/script&gt;</div>
                </div>
              </CardContent>
            </Card>

            {/* Next.js API Route */}
            <Card>
              <CardHeader>
                <CardTitle>Next.js Server Action</CardTitle>
                <CardDescription>
                  Using JSONPost with Next.js Server Actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-gray-400">// app/actions.js</div>
                  <div className="text-blue-400">'use server'</div>

                  <div className="text-purple-400 mt-2">
                    export async function submitToJSONPost(formData) {"{"}
                  </div>
                  <div className="text-white ml-2">const data = {"{"}</div>
                  <div className="text-white ml-4">
                    name: formData.get('name'),
                  </div>
                  <div className="text-white ml-4">
                    email: formData.get('email'),
                  </div>
                  <div className="text-white ml-4">
                    message: formData.get('message')
                  </div>
                  <div className="text-white ml-2">{"}"}</div>

                  <div className="text-blue-400 ml-2 mt-2">try {"{"}</div>
                  <div className="text-white ml-4">
                    const response = await fetch(
                  </div>
                  <div className="text-green-400 ml-6">
                    'https://jsonpost.com/api/submit/your-project-id/contact',
                  </div>
                  <div className="text-white ml-6">{"{"}</div>
                  <div className="text-white ml-8">method: 'POST',</div>
                  <div className="text-white ml-8">
                    headers: {`{ "Content-Type": "application/json" }`},
                  </div>
                  <div className="text-white ml-8">
                    body: JSON.stringify(data)
                  </div>
                  <div className="text-white ml-6">{"}"}</div>
                  <div className="text-white ml-4">)</div>

                  <div className="text-white ml-4">
                    return await response.json()
                  </div>
                  <div className="text-blue-400 ml-2">
                    {"}"} catch (error) {"{"}
                  </div>
                  <div className="text-red-400 ml-4">
                    return {'{ error: "Failed to submit" }'}
                  </div>
                  <div className="text-blue-400 ml-2">{"}"}</div>
                  <div className="text-purple-400">{"}"}</div>

                  <div className="text-gray-400 mt-4">// In your component</div>
                  <div className="text-blue-400">
                    &lt;form action={"{submitToJSONPost}"}&gt;
                  </div>
                  <div className="text-white ml-2">{"/* form fields */"}</div>
                  <div className="text-blue-400">&lt;/form&gt;</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Astro Framework - Full Width */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 mr-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  Astro Framework
                </CardTitle>
                <CardDescription>
                  Integrate JSONPost with Astro for both static sites and
                  server-side rendering.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  {/* Static Astro Form */}
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-600">
                      Static Form (Client-Side)
                    </h4>
                    <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                      <div className="text-gray-400 mb-2">
                        // src/components/ContactForm.astro
                      </div>
                      <div className="text-blue-400">---</div>
                      <div className="text-green-400">
                        // Component script (runs at build time)
                      </div>
                      <div className="text-blue-400">---</div>

                      <div className="text-white mt-4">
                        &lt;form id="contact-form" class="space-y-4"&gt;
                      </div>
                      <div className="text-white ml-2">&lt;div&gt;</div>
                      <div className="text-white ml-4">
                        &lt;label for="name"&gt;Name&lt;/label&gt;
                      </div>
                      <div className="text-white ml-4">
                        &lt;input type="text" id="name" name="name" required
                        /&gt;
                      </div>
                      <div className="text-white ml-2">&lt;/div&gt;</div>

                      <div className="text-white ml-2">&lt;div&gt;</div>
                      <div className="text-white ml-4">
                        &lt;label for="email"&gt;Email&lt;/label&gt;
                      </div>
                      <div className="text-white ml-4">
                        &lt;input type="email" id="email" name="email" required
                        /&gt;
                      </div>
                      <div className="text-white ml-2">&lt;/div&gt;</div>

                      <div className="text-white ml-2">&lt;div&gt;</div>
                      <div className="text-white ml-4">
                        &lt;label for="message"&gt;Message&lt;/label&gt;
                      </div>
                      <div className="text-white ml-4">
                        &lt;textarea id="message" name="message"
                        required&gt;&lt;/textarea&gt;
                      </div>
                      <div className="text-white ml-2">&lt;/div&gt;</div>

                      <div className="text-white ml-2">
                        &lt;button type="submit"&gt;Send Message&lt;/button&gt;
                      </div>
                      <div className="text-white">&lt;/form&gt;</div>

                      <div className="text-blue-400 mt-4">&lt;script&gt;</div>
                      <div className="text-white ml-2">
                        document.getElementById('contact-form').addEventListener('submit',
                        async (e) =&gt; {"{"}
                      </div>
                      <div className="text-white ml-4">e.preventDefault()</div>
                      <div className="text-white ml-4">
                        const formData = new FormData(e.target)
                      </div>
                      <div className="text-white ml-4">
                        const data = Object.fromEntries(formData)
                      </div>

                      <div className="text-white ml-4">try {"{"}</div>
                      <div className="text-white ml-6">
                        const response = await
                        fetch('https://jsonpost.com/api/submit/your-project-id/contact',{" "}
                        {"{"}
                      </div>
                      <div className="text-white ml-8">method: 'POST',</div>
                      <div className="text-white ml-8">
                        headers: {`{ "Content-Type": "application/json" }`},
                      </div>
                      <div className="text-white ml-8">
                        body: JSON.stringify(data)
                      </div>
                      <div className="text-white ml-6">{"}"}</div>

                      <div className="text-white ml-6">
                        if (response.ok) {"{"}
                      </div>
                      <div className="text-white ml-8">
                        alert('Message sent successfully!')
                      </div>
                      <div className="text-white ml-8">e.target.reset()</div>
                      <div className="text-white ml-6">{"}"}</div>
                      <div className="text-white ml-4">
                        {"}"} catch (error) {"{"}
                      </div>
                      <div className="text-red-400 ml-6">
                        alert('Failed to send message')
                      </div>
                      <div className="text-white ml-4">{"}"}</div>
                      <div className="text-white ml-2">{"}"}</div>
                      <div className="text-blue-400">&lt;/script&gt;</div>
                    </div>
                  </div>

                  {/* SSR Astro Form */}
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-600">
                      Server-Side Form (SSR)
                    </h4>
                    <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                      <div className="text-gray-400 mb-2">
                        // src/pages/api/contact.ts
                      </div>
                      <div className="text-blue-400">
                        export async function POST({"{ request }"}) {"{"}
                      </div>
                      <div className="text-white ml-2">try {"{"}</div>
                      <div className="text-white ml-4">
                        const data = await request.json()
                      </div>

                      <div className="text-gray-400 ml-4">
                        // Forward to JSONPost
                      </div>
                      <div className="text-white ml-4">
                        const response = await fetch(
                      </div>
                      <div className="text-white ml-6">
                        'https://jsonpost.com/api/submit/your-project-id/contact',
                      </div>
                      <div className="text-white ml-6">{"{"}</div>
                      <div className="text-white ml-8">method: 'POST',</div>
                      <div className="text-white ml-8">
                        headers: {`{ "Content-Type": "application/json" }`},
                      </div>
                      <div className="text-white ml-8">
                        body: JSON.stringify(data)
                      </div>
                      <div className="text-white ml-6">{"}"}</div>
                      <div className="text-white ml-4">)</div>

                      <div className="text-white ml-4">
                        if (response.ok) {"{"}
                      </div>
                      <div className="text-white ml-6">
                        return new Response(JSON.stringify({"{ success: true }"}
                        ), {"{"}
                      </div>
                      <div className="text-white ml-8">status: 200,</div>
                      <div className="text-white ml-8">
                         headers: {`{ "Content-Type": "application/json" }`}
                        </div>
                      <div className="text-white ml-6">{"}"}</div>
                      <div className="text-white ml-4">{"}"}</div>

                      <div className="text-white ml-4">
                        throw new Error('Submission failed')
                      </div>
                      <div className="text-white ml-2">
                        {"}"} catch (error) {"{"}
                      </div>
                      <div className="text-red-400 ml-4">
                        return new Response(JSON.stringify(
                        {'{ error: "Failed to submit" }'}), {"{"}
                      </div>
                      <div className="text-red-400 ml-6">status: 500,</div>
                      <div className="text-red-400 ml-6">
                         headers: {`{ "Content-Type": "application/json" }`}
                        </div>
                      <div className="text-red-400 ml-4">{"}"}</div>
                      <div className="text-white ml-2">{"}"}</div>
                      <div className="text-blue-400">{"}"}</div>

                      <div className="text-gray-400 mt-4">
                        // src/components/SSRContactForm.astro
                      </div>
                      <div className="text-white">
                        &lt;form method="POST" action="/api/contact"&gt;
                      </div>
                      <div className="text-white ml-2">
                        &lt;input type="text" name="name" required /&gt;
                      </div>
                      <div className="text-white ml-2">
                        &lt;input type="email" name="email" required /&gt;
                      </div>
                      <div className="text-white ml-2">
                        &lt;textarea name="message"
                        required&gt;&lt;/textarea&gt;
                      </div>
                      <div className="text-white ml-2">
                        &lt;button type="submit"&gt;Send&lt;/button&gt;
                      </div>
                      <div className="text-white">&lt;/form&gt;</div>
                    </div>
                  </div>
                </div>

                {/* Astro Configuration */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-orange-600">
                    Configuration
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Configure your Astro project for optimal JSONPost
                    integration
                  </p>
                  <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                    <div className="text-gray-400 mb-2">
                      // astro.config.mjs
                    </div>
                    <div className="text-blue-400">
                      import {"{ defineConfig }"} from 'astro/config'
                    </div>

                    <div className="text-blue-400 mt-4">
                      export default defineConfig({"{"}
                    </div>
                    <div className="text-white ml-2">
                      output: 'hybrid',{" "}
                      <span className="text-gray-400">// For SSR pages</span>
                    </div>
                    <div className="text-white ml-2">
                      adapter: node(),{" "}
                      <span className="text-gray-400">
                        // Or your preferred adapter
                      </span>
                    </div>
                    <div className="text-white ml-2">integrations: [</div>
                    <div className="text-white ml-4">
                      // Add any integrations you need
                    </div>
                    <div className="text-white ml-2">],</div>
                    <div className="text-white ml-2">vite: {"{"}</div>
                    <div className="text-white ml-4">define: {"{"}</div>
                    <div className="text-white ml-6">
                      'process.env.JSONPOST_ENDPOINT': JSON.stringify(
                    </div>
                    <div className="text-white ml-8">
                      'https://jsonpost.com/api/submit/your-project-id'
                    </div>
                    <div className="text-white ml-6">)</div>
                    <div className="text-white ml-4">{"}"}</div>
                    <div className="text-white ml-2">{"}"}</div>
                    <div className="text-blue-400">{"}"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* File Uploads Section */}
      <section id="file-uploads" className="py-16 px-4 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Upload className="w-8 h-8 mr-3 text-cyan-600" />
              File Uploads
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Accept file uploads alongside your form data with automatic storage and management.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Enable File Uploads</CardTitle>
                <CardDescription>
                  Configure your endpoints to accept file uploads in your JSONPost dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-cyan-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Navigate to endpoint settings</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Go to your project dashboard and select the endpoint you want to configure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-cyan-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Enable file uploads</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Toggle the "File Uploads" option to allow file attachments.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-cyan-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Configure limits</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Set maximum file size and allowed file types for security.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>File Upload Limits</CardTitle>
                <CardDescription>
                  Understanding file size and type restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Upload className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800 dark:text-blue-200">Maximum File Size</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Up to 10MB per file (Free tier)<br />
                      Up to 50MB per file (Pro tier)<br />
                      Up to 100MB per file (Enterprise tier)
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="font-medium text-green-800 dark:text-green-200">Supported File Types</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Images: JPG, PNG, GIF, WebP<br />
                      Documents: PDF, DOC, DOCX, TXT<br />
                      Archives: ZIP, RAR<br />
                      And many more...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                HTML Form with File Upload
              </CardTitle>
              <CardDescription>
                Create a form that accepts both data and file uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <div className="text-green-400 mb-2">
                  &lt;!-- HTML form with file upload --&gt;
                </div>
                <div className="text-white">
                  &lt;form action="https://jsonpost.com/api/submit/your-project-id/contact"
                </div>
                <div className="text-white ml-6">
                  method="POST" enctype="multipart/form-data"&gt;
                </div>
                
                <div className="text-white ml-2 mt-2">
                  &lt;div&gt;
                </div>
                <div className="text-white ml-4">
                  &lt;label for="name"&gt;Name:&lt;/label&gt;
                </div>
                <div className="text-white ml-4">
                  &lt;input type="text" id="name" name="name" required&gt;
                </div>
                <div className="text-white ml-2">
                  &lt;/div&gt;
                </div>

                <div className="text-white ml-2 mt-2">
                  &lt;div&gt;
                </div>
                <div className="text-white ml-4">
                  &lt;label for="email"&gt;Email:&lt;/label&gt;
                </div>
                <div className="text-white ml-4">
                  &lt;input type="email" id="email" name="email" required&gt;
                </div>
                <div className="text-white ml-2">
                  &lt;/div&gt;
                </div>

                <div className="text-yellow-400 ml-2 mt-2">
                  &lt;!-- File upload field --&gt;
                </div>
                <div className="text-white ml-2">
                  &lt;div&gt;
                </div>
                <div className="text-white ml-4">
                  &lt;label for="attachment"&gt;Attachment:&lt;/label&gt;
                </div>
                <div className="text-yellow-400 ml-4">
                  &lt;input type="file" id="attachment" name="attachment" 
                </div>
                <div className="text-yellow-400 ml-10">
                  accept=".pdf,.doc,.docx,.jpg,.png" multiple&gt;
                </div>
                <div className="text-white ml-2">
                  &lt;/div&gt;
                </div>

                <div className="text-white ml-2 mt-2">
                  &lt;button type="submit"&gt;Submit with Files&lt;/button&gt;
                </div>
                <div className="text-white">
                  &lt;/form&gt;
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                JavaScript File Upload
              </CardTitle>
              <CardDescription>
                Upload files programmatically using JavaScript and FormData
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <div className="text-green-400 mb-2">
                  // JavaScript file upload with FormData
                </div>
                <div className="text-blue-400">const</div> <div className="text-white inline"> uploadForm = </div><div className="text-blue-400 inline">async</div> <div className="text-white inline"> (formElement) =&gt; {`{`}</div>
                <div className="text-white ml-2">
                  <div className="text-blue-400 inline">const</div> formData = <div className="text-blue-400 inline">new</div> FormData(formElement);
                </div>
                
                <div className="text-green-400 ml-2 mt-2">
                  // Add additional data if needed
                </div>
                <div className="text-white ml-2">
                  formData.append(<div className="text-green-300 inline">'timestamp'</div>, <div className="text-blue-400 inline">new</div> Date().toISOString());
                </div>

                <div className="text-white ml-2 mt-2">
                  <div className="text-blue-400 inline">try</div> {`{`}
                </div>
                <div className="text-white ml-4">
                  <div className="text-blue-400 inline">const</div> response = <div className="text-blue-400 inline">await</div> fetch(
                </div>
                <div className="text-green-300 ml-6">
                  'https://jsonpost.com/api/submit/your-project-id/contact',
                </div>
                <div className="text-white ml-6">
                  {`{`}
                </div>
                <div className="text-white ml-8">
                  method: <div className="text-green-300 inline">'POST'</div>,
                </div>
                <div className="text-yellow-400 ml-8">
                  // Don't set Content-Type header - let browser set it
                </div>
                <div className="text-white ml-8">
                  body: formData
                </div>
                <div className="text-white ml-6">
                  {`}`}
                </div>
                <div className="text-white ml-4">
                  );
                </div>

                <div className="text-white ml-4 mt-2">
                  <div className="text-blue-400 inline">if</div> (response.ok) {`{`}
                </div>
                <div className="text-white ml-6">
                  <div className="text-blue-400 inline">const</div> result = <div className="text-blue-400 inline">await</div> response.json();
                </div>
                <div className="text-white ml-6">
                  console.log(<div className="text-green-300 inline">'Upload successful:'</div>, result);
                </div>
                <div className="text-white ml-4">
                  {`}`} <div className="text-blue-400 inline">else</div> {`{`}
                </div>
                <div className="text-red-400 ml-6">
                  console.error(<div className="text-green-300 inline">'Upload failed'</div>);
                </div>
                <div className="text-white ml-4">
                  {`}`}
                </div>
                <div className="text-white ml-2">
                  {`}`} <div className="text-blue-400 inline">catch</div> (error) {`{`}
                </div>
                <div className="text-red-400 ml-4">
                  console.error(<div className="text-green-300 inline">'Error:'</div>, error);
                </div>
                <div className="text-white ml-2">
                  {`}`}
                </div>
                <div className="text-white">
                  {`}`};
                </div>

                <div className="text-green-400 mt-4">
                  // Usage example
                </div>
                <div className="text-blue-400">const</div> <div className="text-white inline"> form = document.getElementById(</div><div className="text-green-300 inline">'upload-form'</div><div className="text-white inline">);</div>
                <div className="text-white">
                  form.addEventListener(<div className="text-green-300 inline">'submit'</div>, (e) =&gt; {`{`}
                </div>
                <div className="text-white ml-2">
                  e.preventDefault();
                </div>
                <div className="text-white ml-2">
                  uploadForm(form);
                </div>
                <div className="text-white">
                  {`}`});
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                React File Upload Component
              </CardTitle>
              <CardDescription>
                A complete React component for handling file uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <div className="text-blue-400">import</div> <div className="text-white inline"> React, {`{ useState }`} </div><div className="text-blue-400 inline">from</div> <div className="text-green-300 inline">'react'</div><div className="text-white inline">;</div>

                <div className="text-blue-400 mt-4">const</div> <div className="text-white inline"> FileUploadForm = () =&gt; {`{`}</div>
                <div className="text-white ml-2">
                  <div className="text-blue-400 inline">const</div> [files, setFiles] = useState(<div className="text-blue-400 inline">null</div>);
                </div>
                <div className="text-white ml-2">
                  <div className="text-blue-400 inline">const</div> [uploading, setUploading] = useState(<div className="text-blue-400 inline">false</div>);
                </div>
                <div className="text-white ml-2">
                  <div className="text-blue-400 inline">const</div> [message, setMessage] = useState(<div className="text-green-300 inline">''</div>);
                </div>

                <div className="text-white ml-2 mt-4">
                  <div className="text-blue-400 inline">const</div> handleSubmit = <div className="text-blue-400 inline">async</div> (e) =&gt; {`{`}
                </div>
                <div className="text-white ml-4">
                  e.preventDefault();
                </div>
                <div className="text-white ml-4">
                  setUploading(<div className="text-blue-400 inline">true</div>);
                </div>
                <div className="text-white ml-4">
                  setMessage(<div className="text-green-300 inline">''</div>);
                </div>

                <div className="text-white ml-4 mt-2">
                  <div className="text-blue-400 inline">const</div> formData = <div className="text-blue-400 inline">new</div> FormData(e.target);
                </div>

                <div className="text-white ml-4 mt-2">
                  <div className="text-blue-400 inline">try</div> {`{`}
                </div>
                <div className="text-white ml-6">
                  <div className="text-blue-400 inline">const</div> response = <div className="text-blue-400 inline">await</div> fetch(
                </div>
                <div className="text-green-300 ml-8">
                  'https://jsonpost.com/api/submit/your-project-id/contact',
                </div>
                <div className="text-white ml-8">
                  {`{ method: 'POST', body: formData }`}
                </div>
                <div className="text-white ml-6">
                  );
                </div>

                <div className="text-white ml-6 mt-2">
                  <div className="text-blue-400 inline">if</div> (response.ok) {`{`}
                </div>
                <div className="text-white ml-8">
                  setMessage(<div className="text-green-300 inline">'Files uploaded successfully!'</div>);
                </div>
                <div className="text-white ml-8">
                  e.target.reset();
                </div>
                <div className="text-white ml-8">
                  setFiles(<div className="text-blue-400 inline">null</div>);
                </div>
                <div className="text-white ml-6">
                  {`}`} <div className="text-blue-400 inline">else</div> {`{`}
                </div>
                <div className="text-white ml-8">
                  setMessage(<div className="text-red-400 inline">'Upload failed. Please try again.'</div>);
                </div>
                <div className="text-white ml-6">
                  {`}`}
                </div>
                <div className="text-white ml-4">
                  {`}`} <div className="text-blue-400 inline">catch</div> (error) {`{`}
                </div>
                <div className="text-white ml-6">
                  setMessage(<div className="text-red-400 inline">'Error uploading files.'</div>);
                </div>
                <div className="text-white ml-4">
                  {`}`} <div className="text-blue-400 inline">finally</div> {`{`}
                </div>
                <div className="text-white ml-6">
                  setUploading(<div className="text-blue-400 inline">false</div>);
                </div>
                <div className="text-white ml-4">
                  {`}`}
                </div>
                <div className="text-white ml-2">
                  {`}`};
                </div>

                <div className="text-white ml-2 mt-4">
                  <div className="text-blue-400 inline">return</div> (
                </div>
                <div className="text-white ml-4">
                  &lt;form onSubmit={`{handleSubmit}`}&gt;
                </div>
                <div className="text-white ml-6">
                  &lt;input type="text" name="name" placeholder="Your name" required /&gt;
                </div>
                <div className="text-white ml-6">
                  &lt;input type="email" name="email" placeholder="Your email" required /&gt;
                </div>
                <div className="text-white ml-6">
                  &lt;input 
                </div>
                <div className="text-white ml-8">
                  type="file" 
                </div>
                <div className="text-white ml-8">
                  name="files" 
                </div>
                <div className="text-white ml-8">
                  multiple 
                </div>
                <div className="text-white ml-8">
                  onChange={`{(e) => setFiles(e.target.files)}`}
                </div>
                <div className="text-white ml-6">
                  /&gt;
                </div>
                <div className="text-white ml-6">
                  &lt;button type="submit" disabled={`{uploading}`}&gt;
                </div>
                <div className="text-white ml-8">
                  {`{uploading ? 'Uploading...' : 'Submit'}`}
                </div>
                <div className="text-white ml-6">
                  &lt;/button&gt;
                </div>
                <div className="text-white ml-6">
                  {`{message && <p>{message}</p>}`}
                </div>
                <div className="text-white ml-4">
                  &lt;/form&gt;
                </div>
                <div className="text-white ml-2">
                  );
                </div>
                <div className="text-white">
                  {`}`};
                </div>

                <div className="text-blue-400 mt-4">export default</div> <div className="text-white inline"> FileUploadForm;</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2" />
                File Upload Best Practices
              </CardTitle>
              <CardDescription>
                Tips for secure and efficient file uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                        Validate File Types
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Always specify accepted file types using the `accept` attribute to prevent unwanted uploads.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200 mb-1">
                        Show Upload Progress
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Provide visual feedback during uploads, especially for large files.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                        Handle Errors Gracefully
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Implement proper error handling for file size limits, network issues, and unsupported formats.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Lock className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-200 mb-1">
                        Security Considerations
                      </p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        JSONPost automatically scans uploaded files for malware and enforces file type restrictions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Webhooks Section */}
      <section id="webhooks" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Webhook className="w-8 h-8 mr-3 text-teal-600" />
              Webhooks
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Receive real-time notifications when forms are submitted to your
              endpoints.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>
                  Set up webhooks in your JSONPost dashboard to receive instant
                  notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium">
                        Navigate to your project dashboard
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Go to your project settings and find the webhook
                        configuration section.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Add your webhook URL</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Enter the URL where you want to receive webhook
                        notifications.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Test your webhook</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Use the test feature to ensure your webhook endpoint is
                        working correctly.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Payload</CardTitle>
                <CardDescription>
                  Example of the JSON payload sent to your webhook endpoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-white">{"{"}</div>
                  <div className="text-blue-400 ml-2">
                    "event": "form.submitted",
                  </div>
                  <div className="text-blue-400 ml-2">
                    "timestamp": "2024-01-15T10:30:00Z",
                  </div>
                  <div className="text-blue-400 ml-2">
                    "project_id": "abc123-def456",
                  </div>
                  <div className="text-blue-400 ml-2">
                    "endpoint_path": "contact",
                  </div>
                  <div className="text-blue-400 ml-2">
                    "submission_id": "sub_789xyz",
                  </div>
                  <div className="text-blue-400 ml-2">"data": {"{"}</div>
                  <div className="text-green-400 ml-4">"name": "John Doe",</div>
                  <div className="text-green-400 ml-4">
                    "email": "john@example.com",
                  </div>
                  <div className="text-green-400 ml-4">
                    "message": "Hello from the form!"
                  </div>
                  <div className="text-blue-400 ml-2">{"}"},</div>
                  <div className="text-blue-400 ml-2">"metadata": {"{"}</div>
                  <div className="text-purple-400 ml-4">
                    "ip_address": "192.168.1.1",
                  </div>
                  <div className="text-purple-400 ml-4">
                    "user_agent": "Mozilla/5.0...",
                  </div>
                  <div className="text-purple-400 ml-4">
                    "referer": "https://example.com/contact"
                  </div>
                  <div className="text-blue-400 ml-2">{"}"}</div>
                  <div className="text-white">{"}"}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Webhook Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Webhook Security
              </CardTitle>
              <CardDescription>
                Verify webhook authenticity with signature validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <div className="text-gray-400">
                  // Node.js webhook verification example
                </div>
                <div className="text-blue-400">
                  const crypto = require('crypto')
                </div>

                <div className="text-purple-400 mt-2">
                  function verifyWebhook(payload, signature, secret) {"{"}
                </div>
                <div className="text-white ml-2">
                  const expectedSignature = crypto
                </div>
                <div className="text-white ml-4">
                  .createHmac('sha256', secret)
                </div>
                <div className="text-white ml-4">.update(payload)</div>
                <div className="text-white ml-4">.digest('hex')</div>

                <div className="text-white ml-2 mt-2">
                  return crypto.timingSafeEqual(
                </div>
                <div className="text-white ml-4">
                  Buffer.from(signature, 'hex'),
                </div>
                <div className="text-white ml-4">
                  Buffer.from(expectedSignature, 'hex')
                </div>
                <div className="text-white ml-2">)</div>
                <div className="text-purple-400">{"}"}</div>

                <div className="text-gray-400 mt-4">
                  // Express.js middleware
                </div>
                <div className="text-green-400">
                  app.post('/webhook', (req, res) =&gt; {"{"}
                </div>
                <div className="text-white ml-2">
                  const signature = req.headers['x-jsonpost-signature']
                </div>
                <div className="text-white ml-2">
                  const payload = JSON.stringify(req.body)
                </div>

                <div className="text-blue-400 ml-2 mt-2">
                  if (verifyWebhook(payload, signature,
                  process.env.WEBHOOK_SECRET)) {"{"}
                </div>
                <div className="text-white ml-4">// Process the webhook</div>
                <div className="text-white ml-4">
                  console.log('Valid webhook received:', req.body)
                </div>
                <div className="text-white ml-4">
                  res.status(200).send('OK')
                </div>
                <div className="text-blue-400 ml-2">
                  {"}"} else {"{"}
                </div>
                <div className="text-red-400 ml-4">
                  res.status(401).send('Unauthorized')
                </div>
                <div className="text-blue-400 ml-2">{"}"}</div>
                <div className="text-green-400">{"}"}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Email Notifications Section */}
      <section
        id="email-notifications"
        className="py-16 px-4 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Mail className="w-8 h-8 mr-3 text-pink-600" />
              Email Notifications
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Automatically send email notifications when forms are submitted.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>
                  Set up email notifications in your JSONPost dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Notification Types</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Admin notifications (to you)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Auto-reply emails (to submitter)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">Custom email templates</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Multiple recipient support
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Pro Tip:</strong> Use template variables like{" "}
                          {"{name}"} and {"{email}"}
                          to personalize your email notifications with form
                          data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Template Variables</CardTitle>
                <CardDescription>
                  Available variables for customizing your email templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-gray-400">
                    // Available template variables
                  </div>
                  <div className="text-blue-400">
                    {"{"} form_data {"}"}{" "}
                    <span className="text-gray-400">
                      // All submitted form data
                    </span>
                  </div>
                  <div className="text-blue-400">
                    {"{"} submission_id {"}"}{" "}
                    <span className="text-gray-400">
                      // Unique submission ID
                    </span>
                  </div>
                  <div className="text-blue-400">
                    {"{"} timestamp {"}"}{" "}
                    <span className="text-gray-400">
                      // Submission timestamp
                    </span>
                  </div>
                  <div className="text-blue-400">
                    {"{"} ip_address {"}"}{" "}
                    <span className="text-gray-400">
                      // Submitter's IP address
                    </span>
                  </div>
                  <div className="text-blue-400">
                    {"{"} user_agent {"}"}{" "}
                    <span className="text-gray-400">
                      // Browser information
                    </span>
                  </div>
                  <div className="text-blue-400">
                    {"{"} referer {"}"}{" "}
                    <span className="text-gray-400">// Source page URL</span>
                  </div>

                  <div className="text-gray-400 mt-4">
                    // Example email template
                  </div>
                  <div className="text-green-400">
                    Subject: New contact from {"{"} name {"}"}
                  </div>

                  <div className="text-white mt-2">Hello,</div>
                  <div className="text-white">
                    You received a new message from {"{"} name {"}"} ({"{"}{" "}
                    email {"}"})
                  </div>
                  <div className="text-white">
                    Message: {"{"} message {"}"}
                  </div>
                  <div className="text-white">
                    Submitted at: {"{"} timestamp {"}"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-yellow-600" />
              Security & Best Practices
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Keep your forms secure with JSONPost's built-in security features.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Built-in Security Features
                </CardTitle>
                <CardDescription>
                  JSONPost includes comprehensive security measures by default
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">
                      Rate limiting and spam protection
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">
                      HTTPS encryption for all requests
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">
                      Input validation and sanitization
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">CORS origins control</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">API key authentication</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">
                      Webhook signature verification
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">IP-based access controls</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Best Practices</CardTitle>
                <CardDescription>
                  Recommendations for secure form implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">✅ Do</h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Use HTTPS for your website</li>
                      <li>• Validate data on the frontend</li>
                      <li>• Implement CSRF protection</li>
                      <li>• Use descriptive endpoint paths</li>
                      <li>• Monitor submission patterns</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">
                      ❌ Don't
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Submit sensitive data without encryption</li>
                      <li>• Use predictable endpoint paths</li>
                      <li>• Ignore rate limiting warnings</li>
                      <li>• Store sensitive data in hidden fields</li>
                      <li>• Disable browser security features</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CORS Configuration */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  CORS Origins Control
                </CardTitle>
                <CardDescription>
                  Restrict form submissions to specific domains for enhanced security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Configure allowed domains to prevent unauthorized cross-origin requests to your endpoints.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Configuration Options:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">https://example.com</code> - Specific domain</li>
                      <li>• <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">*.example.com</code> - All subdomains</li>
                      <li>• <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">*</code> - All domains (not recommended)</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-green-800 dark:text-green-200">
                          <strong>Smart CORS Handling:</strong> Browser requests return the actual origin, while requests without an Origin header (like Postman or server-to-server calls) receive the first configured domain for security.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Best Practice:</strong> Always specify exact domains or use subdomain wildcards instead of allowing all origins.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  API Key Authentication
                </CardTitle>
                <CardDescription>
                  Add an extra layer of security with API key verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Enable API key authentication to ensure only authorized applications can submit to your endpoints.
                  </p>
                  
                  <div className="bg-black rounded-lg p-4 text-sm font-mono">
                    <div className="text-green-400 mb-2"># Include API key in headers</div>
                    <div className="text-white">curl -X POST \</div>
                    <div className="text-white ml-2">https://jsonpost.com/api/submit/your-project-id/contact \</div>
                    <div className="text-white ml-2">-H "Content-Type: application/json" \</div>
                    <div className="text-yellow-400 ml-2">-H "X-API-Key: your-api-key" \</div>
                    <div className="text-white ml-2">-d {`'{"name": "John", "email": "john@example.com"}'`}</div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Security Note:</strong> Keep your API keys secure and regenerate them regularly. Never expose them in client-side code.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* JavaScript Integration with Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Secure JavaScript Integration
              </CardTitle>
              <CardDescription>
                Examples of implementing security features in your frontend code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">With API Key Authentication</h4>
                  <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                    <div className="text-green-400 mb-2">// Secure form submission with API key</div>
                    <div className="text-blue-400">const</div> <div className="text-white inline"> submitForm = </div><div className="text-blue-400 inline">async</div> <div className="text-white inline"> (formData) =&gt; {`{`}</div>
                    <div className="text-white ml-2">  <div className="text-blue-400 inline">const</div> response = <div className="text-blue-400 inline">await</div> fetch(</div>
                    <div className="text-green-300 ml-4">    'https://jsonpost.com/api/submit/your-project-id/contact',</div>
                    <div className="text-white ml-4">    {`{`}</div>
                    <div className="text-white ml-6">      method: <div className="text-green-300 inline">'POST'</div>,</div>
                    <div className="text-white ml-6">      headers: {`{`}</div>
                    <div className="text-green-300 ml-8">        'Content-Type': 'application/json',</div>
                    <div className="text-yellow-400 ml-8">        'X-API-Key': process.env.NEXT_PUBLIC_JSONPOST_API_KEY</div>
                    <div className="text-white ml-6">      {`}`},</div>
                    <div className="text-white ml-6">      body: JSON.stringify(formData)</div>
                    <div className="text-white ml-4">    {`}`}</div>
                    <div className="text-white ml-2">  );</div>
                    <div className="text-white">{`}`};</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">CORS-Compliant Requests</h4>
                  <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                    <div className="text-green-400 mb-2">// Ensure your domain is in the allowed origins list</div>
                    <div className="text-blue-400">const</div> <div className="text-white inline"> submitFromBrowser = </div><div className="text-blue-400 inline">async</div> <div className="text-white inline"> (data) =&gt; {`{`}</div>
                    <div className="text-white ml-2">  <div className="text-green-400 inline">// This will work if your domain is allowed</div></div>
                    <div className="text-white ml-2">  <div className="text-blue-400 inline">const</div> response = <div className="text-blue-400 inline">await</div> fetch(endpoint, {`{`}</div>
                    <div className="text-white ml-4">    method: <div className="text-green-300 inline">'POST'</div>,</div>
                    <div className="text-white ml-4">    headers: {`{`} <div className="text-green-300 inline">'Content-Type': 'application/json'</div> {`}`},</div>
                    <div className="text-white ml-4">    body: JSON.stringify(data)</div>
                    <div className="text-white ml-2">  {`}`});</div>
                    <div className="text-white">{`}`};</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rate Limiting Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Usage Limits & Billing
              </CardTitle>
              <CardDescription>
                Understanding JSONPost's usage limits and billing tiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    50
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Submissions per month (Free)
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    1,000
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Submissions per month (Pro)
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    Unlimited
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Submissions per month (Enterprise)
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Usage Tracking:</strong> Your submission count is tracked monthly and resets at the beginning of each billing cycle. Upgrade your plan to increase your limits.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Getting Started CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create your free JSONPost account and start collecting form
            submissions in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Create Free Account <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            No credit card required • Free tier includes 50 submissions/month
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

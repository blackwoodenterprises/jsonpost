/* eslint-disable react/no-unescaped-entities, react/jsx-no-comment-textnodes */
import Link from "next/link";
import Image from "next/image";
import { metadata } from "./metadata";
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
  Upload,
  Lock,
  Settings,
  Eye,
  Sparkles,
  Clock,
  Users,
  MessageSquare,
  Layers,
  Server,
  Key,
  AlertCircle,
  Info,
  Terminal,
  Play,
  Copy,
  Star,
  Trophy,
  Bell,
  UserPlus,
  CreditCard,
  HelpCircle,
  Wrench,
  RefreshCw,
  Route,
  Palette,
} from "lucide-react";

export { metadata };

export default function FeaturesAndScreenshotsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Complete Feature Overview
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-green-800 dark:from-white dark:via-emerald-200 dark:to-green-200 bg-clip-text text-transparent">
              JSONPost Features &<br className="hidden sm:block" />
              Screenshots
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore all the powerful features that make JSONPost the best headless form backend service for developers. See real screenshots of the application in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Link href="/auth/signup">
                  Try All Features Free <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#core-features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Application Screenshots</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See JSONPost in action with real screenshots of the dashboard and key features
            </p>
          </div>

          <div className="space-y-12">
            {/* Dashboard Screenshot */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/dashboard-screenshot.png"
                  alt="JSONPost Dashboard Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">Main Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Get a comprehensive overview of all your form endpoints in one place with quick stats and easy project access.
                </p>
              </div>
            </div>

            {/* Typeform Style Forms Screenshot */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/typeform-style-forms-screenshot.png"
                  alt="JSONPost Typeform Style Forms Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">Beautiful Form Interfaces</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Create stunning, modern forms with our Typeform-style interface that provides excellent user experience and higher completion rates.
                </p>
              </div>
            </div>

            {/* Endpoint Detail Screenshot */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/endpoint-detail-screenshot.png"
                  alt="JSONPost Endpoint Detail Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">Endpoint Configuration</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Configure every aspect of your form endpoints with detailed settings for webhooks, email notifications, and validation rules.
                </p>
              </div>
            </div>

            {/* All Submissions Screenshot */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/all-submissions-screenshot.png"
                  alt="JSONPost All Submissions Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">Submissions Management</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  View and manage all your form submissions in one organized interface with advanced filtering and search capabilities.
                </p>
              </div>
            </div>

            {/* Submission Detail Screenshot */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/submission-detail-screenshot.png"
                  alt="JSONPost Submission Detail Screenshot"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">Detailed Submission View</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Dive deep into individual submissions with comprehensive details including form data, metadata, timestamps, and file attachments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features that make JSONPost the most comprehensive form backend solution
            </p>
          </div>

          <div className="space-y-12">
            {/* Autoresponder */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700" style={{ height: 'auto', minHeight: '200px' }}>
                <Image
                  src="/screenshots/autoresponder.png"
                  alt="JSONPost Autoresponder Feature"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">Smart Autoresponder</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Set up intelligent autoresponder emails that are sent automatically to users after form submission with customizable templates.
                </p>
              </div>
            </div>

            {/* Form Builder */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700" style={{ height: 'auto', minHeight: '200px' }}>
                <Image
                  src="/screenshots/form-builder.png"
                  alt="JSONPost Form Builder Feature"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">Visual Form Builder</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Create beautiful forms without writing code using our intuitive drag-and-drop form builder with various field types.
                </p>
              </div>
            </div>

            {/* Google Sheets Integration */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700" style={{ height: 'auto', minHeight: '200px' }}>
                <Image
                  src="/screenshots/google-sheets.png"
                  alt="JSONPost Google Sheets Integration"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">Google Sheets Integration</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Automatically sync form submissions to Google Sheets in real-time for easy data analysis and collaboration.
                </p>
              </div>
            </div>

            {/* JSON Schema Validation */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700" style={{ height: 'auto', minHeight: '200px' }}>
                <Image
                  src="/screenshots/json-schema-validation-feature.png"
                  alt="JSONPost JSON Schema Validation Feature"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <h3 className="text-2xl font-bold mb-3">JSON Schema Validation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Validate incoming form data against custom JSON schemas to ensure data integrity and prevent invalid submissions.
                </p>
              </div>
            </div>

            {/* JSON Transformer */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/json-transformer-feature.png"
                  alt="JSONPost JSON Transformer Feature"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <h3 className="text-xl font-bold mb-2">Data Transformation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Transform and restructure form data before processing with our flexible JSON transformer.
                </p>
              </div>
            </div>

            {/* Multi-file Uploads */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/multi-file-uploads-feature.png"
                  alt="JSONPost Multi-file Uploads Feature"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <h3 className="text-xl font-bold mb-2">Multi-file Upload Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Handle multiple file uploads with ease, supporting various file types and automatic storage.
                </p>
              </div>
            </div>

            {/* Multiple Themes */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/multiple-themes.png"
                  alt="JSONPost Multiple Themes Feature"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <h3 className="text-xl font-bold mb-2">Multiple Themes & Styling</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose from beautiful pre-designed themes or create custom styling to match your brand.
                </p>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/security.png"
                  alt="JSONPost Security Features"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <h3 className="text-xl font-bold mb-2">Advanced Security</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enterprise-grade security with spam protection, rate limiting, and CAPTCHA integration.
                </p>
              </div>
            </div>

            {/* Variable Paths */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/variable-paths-feature.png"
                  alt="JSONPost Variable Paths Feature"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <h3 className="text-xl font-bold mb-2">Variable Paths</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create dynamic form endpoints with variable paths for flexible data routing.
                </p>
              </div>
            </div>
            {/* Webhook Configuration */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/webhook-config-feature.png"
                  alt="JSONPost Webhook Configuration Feature"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <h3 className="text-xl font-bold mb-2">Advanced Webhook Configuration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Set up sophisticated webhook integrations with custom headers and authentication.
                </p>
              </div>
            </div>

            {/* Zapier Integration */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/screenshots/zapier-integration-feature.png"
                  alt="JSONPost Zapier Integration Feature"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <h3 className="text-xl font-bold mb-2">Zapier Integration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect your forms to thousands of applications through seamless Zapier integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="core-features" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to handle form submissions professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Instant Form Endpoints */}
            <Card className="border-2 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Instant Form Endpoints</CardTitle>
                <CardDescription>
                  Create form endpoints in seconds without any backend setup. Get a unique URL instantly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    No server configuration required
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Unique endpoint URLs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Ready in under 30 seconds
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Multiple Content Types */}
            <Card className="border-2 border-green-200 dark:border-green-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Multiple Content Types</CardTitle>
                <CardDescription>
                  Support for JSON, form-data, and URL-encoded submissions from any frontend.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    application/json
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    multipart/form-data
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    application/x-www-form-urlencoded
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* File Upload Support */}
            <Card className="border-2 border-purple-200 dark:border-purple-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>File Upload Support</CardTitle>
                <CardDescription>
                  Accept and manage file uploads with automatic storage and secure download links.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Automatic file storage
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Configurable size limits
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Type restrictions
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* JSON Schema Validation */}
            <Card className="border-2 border-orange-200 dark:border-orange-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>JSON Schema Validation</CardTitle>
                <CardDescription>
                  Validate form submissions against custom JSON schemas using AJV for data integrity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom validation rules
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    AJV-powered validation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Detailed error messages
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Email Notifications */}
            <Card className="border-2 border-pink-200 dark:border-pink-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Get notified instantly when forms are submitted with customizable email templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Instant notifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom email templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Multiple recipients
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Webhook Integration */}
            <Card className="border-2 border-teal-200 dark:border-teal-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                  <Webhook className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle>Webhook Integration</CardTitle>
                <CardDescription>
                  Forward submissions to your own endpoints for custom processing and integrations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Real-time forwarding
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom headers support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Retry mechanisms
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Spam Protection */}
            <Card className="border-2 border-red-200 dark:border-red-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Spam Protection</CardTitle>
                <CardDescription>
                  Built-in spam filtering capabilities to keep your submissions clean and relevant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Intelligent filtering
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Rate limiting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    IP-based protection
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Real-time Analytics */}
            <Card className="border-2 border-indigo-200 dark:border-indigo-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Real-time Analytics</CardTitle>
                <CardDescription>
                  Track submission metrics and trends with detailed analytics and reporting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Submission tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Performance metrics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Trend analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Custom Redirects */}
            <Card className="border-2 border-cyan-200 dark:border-cyan-700 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle>Custom Redirects</CardTitle>
                <CardDescription>
                  Redirect users after successful submissions to thank you pages or custom URLs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom thank you pages
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Conditional redirects
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Success/error handling
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with modern technologies for security, scalability, and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Security & Scalability */}
            <Card className="border-2 border-emerald-200 dark:border-emerald-700">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Secure & Scalable</CardTitle>
                <CardDescription>
                  Built with Supabase and Next.js for enterprise-grade security and scalability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Row Level Security (RLS)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    PostgreSQL database
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Auto-scaling infrastructure
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* CORS Support */}
            <Card className="border-2 border-yellow-200 dark:border-yellow-700">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>CORS Support</CardTitle>
                <CardDescription>
                  Cross-origin requests allowed with configurable domain restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Cross-origin support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Domain whitelisting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Preflight handling
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* API Authentication */}
            <Card className="border-2 border-rose-200 dark:border-rose-700">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-rose-600" />
                </div>
                <CardTitle>Flexible Authentication</CardTitle>
                <CardDescription>
                  Support for both public endpoints and secure API key authentication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Public endpoints
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    API key protection
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Per-endpoint configuration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of developers who trust JSONPost for their form handling needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              asChild
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Link href="/auth/signup">
                Start Free Account <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Trophy className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Trophy className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Trophy className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Trophy className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">5.0</span>
            </div>
            <span className="text-sm">•</span>
            <span className="text-sm">99.9% Uptime</span>
            <span className="text-sm">•</span>
            <span className="text-sm">5-min Setup</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
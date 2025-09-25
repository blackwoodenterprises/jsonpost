/* eslint-disable react/no-unescaped-entities, react/jsx-no-comment-textnodes */
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";

export default function FeaturesAndScreenshotsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Complete Feature Overview
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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

      {/* Core Features Section */}
      <section id="core-features" className="py-20 px-4">
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

      {/* Screenshots Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Application Screenshots</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See JSONPost in action with real screenshots of the dashboard and key features
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Dashboard Screenshot */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Main Dashboard
                  </CardTitle>
                  <CardDescription>
                    Overview of all your projects with quick stats and recent activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src="/screenshots/dashboard-screenshot.png"
                      alt="JSONPost Dashboard Screenshot"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">Project Overview</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Manage all projects</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">Quick Stats</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Real-time metrics</div>
                </div>
              </div>
            </div>

            {/* Endpoint Detail Screenshot */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-purple-600" />
                    Endpoint Configuration
                  </CardTitle>
                  <CardDescription>
                    Detailed endpoint settings with webhooks, email notifications, and validation
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src="/screenshots/endpoint-detail-screenshot.png"
                      alt="JSONPost Endpoint Detail Screenshot"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">Configuration</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Endpoint settings</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">Integrations</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Webhooks & email</div>
                </div>
              </div>
            </div>

            {/* All Submissions Screenshot */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2 text-green-600" />
                    Submissions Overview
                  </CardTitle>
                  <CardDescription>
                    View and manage all form submissions with filtering and search capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src="/screenshots/all-submissions-screenshot.png"
                      alt="JSONPost All Submissions Screenshot"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">Data Management</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">View all submissions</div>
                </div>
                <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-teal-600 mb-1">Search & Filter</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Find specific data</div>
                </div>
              </div>
            </div>

            {/* Submission Detail Screenshot */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-indigo-600" />
                    Individual Submission
                  </CardTitle>
                  <CardDescription>
                    Detailed view of individual submissions with metadata and file attachments
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src="/screenshots/submission-detail-screenshot.png"
                      alt="JSONPost Submission Detail Screenshot"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">Detailed View</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Complete submission data</div>
                </div>
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-pink-600 mb-1">Metadata</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Timestamps & IP info</div>
                </div>
              </div>
            </div>
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
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of developers who trust JSONPost for their form handling needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
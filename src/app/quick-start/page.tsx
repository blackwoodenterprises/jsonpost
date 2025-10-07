/* eslint-disable react/no-unescaped-entities, react/jsx-no-comment-textnodes */
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Lock,
  Upload,
  Copy,
  Play,
  Settings,
  Eye,
  Sparkles,
  Clock,
  Users,
  MessageSquare,
  Layers,
  FileText,
} from "lucide-react";
import { metadata } from "./metadata";

export { metadata };

export default function QuickStartPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Quick Start Guide
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-800 dark:from-white dark:via-emerald-400 dark:to-slate-200 bg-clip-text text-transparent leading-tight">
              Get Started in Minutes
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Transform your forms from simple HTML to powerful automation workflows. 
              No backend coding required - just point, configure, and collect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30"
                asChild
              >
                <Link href="/auth/signup">
                  Start Building <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full text-sm font-medium text-green-800 dark:text-green-200 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get your forms up and running in minutes with our streamlined
              process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Create Your Endpoint
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up and create a custom endpoint for your form in seconds.
                No complex configuration needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Point Your Form</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Update your form&apos;s action URL to point to your JSONPost
                endpoint. Works with any HTML form or JavaScript.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Collect Submissions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start receiving form submissions instantly. View, manage, and
                export your data from the dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section
        id="dashboard-section"
        className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200">
                <BarChart3 className="w-4 h-4 mr-2" />
                Step 1: Dashboard
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Your Project Dashboard
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                After signing up, you&apos;ll land on your clean, intuitive dashboard
                where you can manage all your projects and see submission
                statistics at a glance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Create unlimited projects on the free plan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Real-time submission statistics and analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Quick access to all your form endpoints</span>
                </div>
              </div>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/auth/signup">
                  Create Your Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/screenshots/dashboard-screenshot.png"
                  alt="JSONPost Dashboard Screenshot"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoint Detail Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/screenshots/endpoint-detail-screenshot.png"
                  alt="Endpoint Configuration Screenshot"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="space-y-6 lg:order-2">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full text-sm font-medium text-green-800 dark:text-green-200">
                <Settings className="w-4 h-4 mr-2" />
                Step 2: Configuration
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Configure Your Endpoint
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Set up your form endpoint with custom settings, email
                notifications, webhooks, and validation rules. Everything you
                need to handle form submissions professionally.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Custom endpoint URLs and paths</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Email notifications and webhook integrations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>JSON schema validation and file upload support</span>
                </div>
              </div>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Link href="/auth/signup">
                  Start Configuring <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Submissions Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full text-sm font-medium text-purple-800 dark:text-purple-200">
                <Database className="w-4 h-4 mr-2" />
                Step 3: Submissions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                View All Submissions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Monitor all your form submissions in one organized dashboard.
                Search, filter, export, and manage your data with powerful tools
                designed for productivity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Real-time submission tracking and notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Advanced search and filtering capabilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Export to CSV for analysis and reporting</span>
                </div>
              </div>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Link href="/auth/signup">
                  See Your Submissions <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/screenshots/all-submissions-screenshot.png"
                  alt="All Submissions Dashboard Screenshot"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Detail Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/screenshots/submission-detail-screenshot.png"
                  alt="Submission Detail Screenshot"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="space-y-6 lg:order-2">
              <div className="inline-flex items-center px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full text-sm font-medium text-orange-800 dark:text-orange-200">
                <FileText className="w-4 h-4 mr-2" />
                Step 4: Details
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Detailed Submission View
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Dive deep into individual submissions with comprehensive details
                including metadata, IP addresses, user agents, and timestamps.
                Perfect for debugging and analysis.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Complete submission data and metadata</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>IP address and user agent tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>File attachments and download links</span>
                </div>
              </div>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                <Link href="/auth/signup">
                  Explore Details <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Code Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full text-sm font-medium text-green-800 dark:text-green-200 mb-6">
              <Code className="w-4 h-4 mr-2" />
              Integration Made Simple
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Add to Any Website
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Works with any frontend framework or plain HTML. Just point your
              form to your JSONPost endpoint and you're done.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  HTML Form
                </CardTitle>
                <CardDescription>
                  Works with any HTML form - no JavaScript required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-gray-400">&lt;form</div>
                  <div className="text-blue-400 ml-2">
                    action=&quot;https://jsonpost.com/api/submit/your-project/contact&quot;
                  </div>
                  <div className="text-blue-400 ml-2">method=&quot;POST&quot;&gt;</div>
                  <div className="text-green-400 ml-2">
                    &lt;input name=&quot;email&quot; type=&quot;email&quot; /&gt;
                  </div>
                  <div className="text-green-400 ml-2">
                    &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
                  </div>
                  <div className="text-gray-400">&lt;/form&gt;</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-600" />
                  JavaScript/React
                </CardTitle>
                <CardDescription>
                  Perfect for modern frameworks and SPAs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-blue-400">
                    fetch(&apos;https://jsonpost.com/api/submit/your-project/contact&apos;, {`{`}
                  </div>
                  <div className="text-white ml-2">method: &apos;POST&apos;,</div>
                  <div className="text-white ml-2">
                    headers: {`{`} &apos;Content-Type&apos;: &apos;application/json&apos; {`}`},
                  </div>
                  <div className="text-white ml-2">
                    body: JSON.stringify(formData)
                  </div>
                  <div className="text-blue-400">{`}`})</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready to Get Started?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-800 dark:from-white dark:via-emerald-400 dark:to-slate-200 bg-clip-text text-transparent">
              Start Building Today
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Join thousands of developers who trust JSONPost for their form automation needs. 
              Set up your first workflow in under 5 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30"
                asChild
              >
                <Link href="/auth/signup">
                  Create Free Account <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Free forever plan
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  No credit card required
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  500 submissions/month
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

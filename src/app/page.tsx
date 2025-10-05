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
import { PLANS } from "@/lib/plans";
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
  Sparkles,
  Clock,
  Database,
  MessageSquare,
  Star,
  FileText,
  Settings,
  Users,
  Layers,
  TrendingUp,
  PaletteIcon,
  LayoutGrid,
  Smartphone,
  GitBranch,
  Check,
  X,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero Section - Modern & Clean */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Complete Form Builder & Automation Platform
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              Build Beautiful Forms.<br />
              <span className="text-emerald-600 dark:text-emerald-500">Automate Everything.</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Create stunning conversational forms, multi-step wizards, and single-page forms with our visual builder. Connect to Google Sheets, Zapier, n8n, webhooks, and more—no backend required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 dark:shadow-emerald-500/20"
                asChild
              >
                <Link href="/auth/signup">
                  Start Building for Free <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600"
                asChild
              >
                <Link href="https://forms.jsonpost.com" target="_blank" rel="noopener noreferrer">
                  Browse Gallery <Globe className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-8 justify-center items-center text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>500 submissions free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do with JSONPost */}
      <section className="py-20 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              What You Can Do with JSONPost
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to build, deploy, and automate forms—all in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Form Builder */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center mb-4">
                  <LayoutGrid className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl">Visual Form Builder</CardTitle>
                <CardDescription>
                  Drag-and-drop builder with 16 field types, 29 themes, and 14 pre-built templates. Create forms in minutes without writing code.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Conversational Forms */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-950 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <CardTitle className="text-xl">Conversational Forms</CardTitle>
                <CardDescription>
                  Build chat-like conversational forms that feel natural and increase completion rates by up to 40%.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Multi-Step Forms */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 rounded-xl flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-xl">Multi-Step Wizards</CardTitle>
                <CardDescription>
                  Break complex forms into simple steps. Perfect for surveys, registrations, and applications with progress tracking.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Google Sheets Integration */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Google Sheets Sync</CardTitle>
                <CardDescription>
                  Automatically push submissions to Google Sheets. No Zapier needed. OAuth authentication with automatic token refresh.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Zapier & n8n */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-950 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <CardTitle className="text-xl">Zapier & n8n Integration</CardTitle>
                <CardDescription>
                  Native support for Zapier and n8n. Connect to 5000+ apps and build complex automation workflows.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Webhooks */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950 rounded-xl flex items-center justify-center mb-4">
                  <Webhook className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <CardTitle className="text-xl">Powerful Webhooks</CardTitle>
                <CardDescription>
                  Send data to any endpoint with Svix webhooks (signatures + retries) or direct webhooks. JSON transformation included.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Email Notifications */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Email Automation</CardTitle>
                <CardDescription>
                  Instant notifications to your team and automated responses to users. Custom templates and multiple recipients supported.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* File Uploads */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl">File Upload Handling</CardTitle>
                <CardDescription>
                  Accept file uploads with validation and secure storage. No need to set up AWS S3 or configure storage yourself.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Themes & Customization */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-950 rounded-xl flex items-center justify-center mb-4">
                  <PaletteIcon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-xl">29 Beautiful Themes</CardTitle>
                <CardDescription>
                  Choose from 29 professionally designed themes. From minimal to bold, light to dark—match your brand perfectly.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Embed Options */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-950 rounded-xl flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle className="text-xl">Flexible Embedding</CardTitle>
                <CardDescription>
                  Embed as modal popup, floating chatbox, side drawer, or button trigger. Works on any website—no backend required.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Spam Protection */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-xl">Built-in Spam Protection</CardTitle>
                <CardDescription>
                  Honeypot fields and intelligent rate limiting (5 req/10s, 100 req/min). Block spam before it hits your inbox.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Analytics */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-950 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-xl">Submission Analytics</CardTitle>
                <CardDescription>
                  Track submissions, conversion rates, and form performance. Export data as CSV or JSON anytime you need.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Types Showcase */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Build Any Type of Form
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From simple contact forms to complex multi-step surveys—we&apos;ve got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-center">
                <Smartphone className="w-20 h-20 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Conversational Forms</CardTitle>
                <CardDescription className="text-base">
                  Chat-like interface that asks one question at a time. Perfect for mobile users and increases engagement by making forms feel like conversations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>One question at a time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Mobile-first design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Higher completion rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-950 dark:to-blue-950 flex items-center justify-center">
                <Layers className="w-20 h-20 text-sky-600 dark:text-sky-400" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Multi-Step Wizards</CardTitle>
                <CardDescription className="text-base">
                  Break long forms into logical steps with progress indicators. Ideal for registrations, applications, and complex surveys.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Progress tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Back/forward navigation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Welcome & thank you screens</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 flex items-center justify-center">
                <FileText className="w-20 h-20 text-amber-600 dark:text-amber-400" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Single-Page Forms</CardTitle>
                <CardDescription className="text-base">
                  Classic all-in-one forms with all fields visible. Best for contact forms, feedback, and quick data collection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>All fields at once</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Fast completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Traditional UX</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="border-2">
              <Link href="https://forms.jsonpost.com" target="_blank" rel="noopener noreferrer">
                Explore Form Gallery <Globe className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Integrations Showcase */}
      <section className="py-20 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Connect to Everything
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Native integrations with your favorite tools. No complex setup, no middleware needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Google Sheets</CardTitle>
                <CardDescription>
                  Auto-sync submissions to spreadsheets with OAuth authentication
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Zapier</CardTitle>
                <CardDescription>
                  Connect to 5000+ apps with native Zapier integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-violet-100 dark:bg-violet-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                </div>
                <CardTitle>n8n</CardTitle>
                <CardDescription>
                  Build complex workflows with open-source automation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Webhook className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                </div>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Send data to any endpoint with Svix or direct webhooks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Email</CardTitle>
                <CardDescription>
                  Instant notifications and automated user responses
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-sky-100 dark:bg-sky-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                </div>
                <CardTitle>Slack</CardTitle>
                <CardDescription>
                  Real-time submission alerts in your Slack channels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Discord</CardTitle>
                <CardDescription>
                  Notify your Discord server instantly on submissions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle>Custom API</CardTitle>
                <CardDescription>
                  REST API for custom integrations and workflows
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Highlights - Why Choose JSONPost */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Developers & Teams Love JSONPost
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Built for speed, security, and scale—without the complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">5-Minute Setup</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Create a form, get your endpoint, and start receiving submissions in minutes—not hours or days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-950 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Enterprise Security</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  SSL/TLS encryption, AES-256 data encryption, SOC 2 Type II compliance, and GDPR-ready out of the box.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Scales Automatically</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  From 10 to 10,000 submissions per day. Infrastructure scales automatically with no configuration needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950 rounded-xl flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Developer-Friendly API</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Clean REST API with JSON/FormData support. Works with React, Vue, Next.js, and any framework you love.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-950 rounded-xl flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Your Data, Your Control</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Export everything as CSV or JSON. No vendor lock-in. Delete anytime with one click.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Backend Required</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  No servers to manage, no databases to configure, no infrastructure to maintain. We handle everything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">10,000+</div>
              <div className="text-slate-600 dark:text-slate-300">Forms Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">100+</div>
              <div className="text-slate-600 dark:text-slate-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">99.9%</div>
              <div className="text-slate-600 dark:text-slate-300">Uptime SLA</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-500 mb-2">4.9/5</div>
              <div className="text-slate-600 dark:text-slate-300">User Rating</div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  &ldquo;JSONPost saved us weeks of development time. The form builder is intuitive, and the Google Sheets integration works flawlessly. Highly recommended!&rdquo;
                </CardDescription>
                <div className="mt-4">
                  <p className="font-semibold text-slate-900 dark:text-white">Sarah Chen</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Product Manager, TechCorp</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  &ldquo;As a freelance developer, JSONPost is a game-changer. I can deliver complex forms to clients without building backends. The conversational forms are amazing!&rdquo;
                </CardDescription>
                <div className="mt-4">
                  <p className="font-semibold text-slate-900 dark:text-white">Marcus Rodriguez</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Freelance Developer</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  &ldquo;The Zapier integration alone is worth it. We automated our entire lead generation workflow in an afternoon. Customer support is excellent too.&rdquo;
                </CardDescription>
                <div className="mt-4">
                  <p className="font-semibold text-slate-900 dark:text-white">Emily Watson</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Marketing Director, GrowthLab</p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Perfect for Every Use Case
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From simple contact forms to complex workflows—JSONPost adapts to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: Mail, title: "Contact Forms", desc: "Connect with website visitors" },
              { icon: MessageSquare, title: "Feedback Collection", desc: "Gather user insights" },
              { icon: FileText, title: "Lead Generation", desc: "Capture qualified leads" },
              { icon: Users, title: "Event Registration", desc: "Manage attendees easily" },
              { icon: Star, title: "Customer Surveys", desc: "Measure satisfaction" },
              { icon: Webhook, title: "Support Tickets", desc: "Streamline customer support" },
              { icon: Database, title: "Job Applications", desc: "Hire top talent faster" },
              { icon: CheckCircle, title: "Order Forms", desc: "Process orders smoothly" },
              { icon: Settings, title: "Booking Forms", desc: "Schedule appointments" },
              { icon: BarChart3, title: "Market Research", desc: "Collect valuable data" },
              { icon: Globe, title: "Newsletter Signups", desc: "Grow your audience" },
              { icon: Sparkles, title: "And Much More...", desc: "Unlimited possibilities" }
            ].map((useCase, idx) => (
              <Card key={idx} className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950 rounded-lg flex items-center justify-center mb-3">
                    <useCase.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription className="text-sm">{useCase.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section - JSONPost vs DIY */}
      <section className="py-20 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Build It Yourself?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Compare JSONPost to building your own form backend
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* JSONPost Column */}
            <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-emerald-700 dark:text-emerald-400">
                  With JSONPost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "5-minute setup, no coding required",
                    "Visual form builder with 29 themes",
                    "Built-in spam protection & rate limiting",
                    "Automatic Google Sheets sync",
                    "Native Zapier & n8n integration",
                    "Email notifications included",
                    "File upload handling (no S3 setup)",
                    "99.9% uptime with auto-scaling",
                    "SOC 2 & GDPR compliant",
                    "24/7 monitoring & support",
                    "Start free, scale as you grow"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* DIY Column */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-slate-700 dark:text-slate-300">
                  Building Your Own
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    "Weeks of development time",
                    "Build form UI from scratch",
                    "Implement spam filtering yourself",
                    "Manually code Google Sheets API",
                    "Configure Zapier webhooks",
                    "Set up email service (Resend/SendGrid)",
                    "Configure AWS S3 for uploads",
                    "Manage servers & scaling",
                    "Handle security & compliance",
                    "Monitor & debug issues 24/7",
                    "Ongoing maintenance costs"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-slate-400 dark:text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg" asChild>
              <Link href="/auth/signup">
                Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Start free, upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* FREE Plan */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Badge className="w-fit mb-4 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {PLANS.FREE.name.toUpperCase()}
                </Badge>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">${PLANS.FREE.price}</span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <CardDescription className="text-base">Perfect for personal projects and testing</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-6 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900" asChild>
                  <Link href="/auth/signup">Start Free</Link>
                </Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{PLANS.FREE.limits.submissions} submissions/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{PLANS.FREE.limits.projects} projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{PLANS.FREE.limits.endpoints} endpoints per project</span>
                  </li>
                  {PLANS.FREE.features.slice(3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* PRO Plan - Highlighted */}
            <Card className="border-emerald-500 dark:border-emerald-600 shadow-2xl shadow-emerald-500/20 relative hover:shadow-emerald-500/30 transition-all duration-300 scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-emerald-600 text-white px-4 py-1">MOST POPULAR</Badge>
              </div>
              <CardHeader>
                <Badge className="w-fit mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {PLANS.PRO.name.toUpperCase()}
                </Badge>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">${PLANS.PRO.price}</span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <CardDescription className="text-base">For growing businesses and agencies</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30" asChild>
                  <Link href="/auth/signup">Start Pro Trial</Link>
                </Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{PLANS.PRO.limits.submissions} submissions/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{PLANS.PRO.limits.projects} projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{PLANS.PRO.limits.endpoints} endpoints</span>
                  </li>
                  {PLANS.PRO.features.slice(3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* GROWTH Plan */}
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Badge className="w-fit mb-4 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  {PLANS.GROWTH.name.toUpperCase()}
                </Badge>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">${PLANS.GROWTH.price}</span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <CardDescription className="text-base">For high-volume applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-6 bg-amber-600 hover:bg-amber-700 text-white" asChild>
                  <Link href="/auth/signup">Start Growth</Link>
                </Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{PLANS.GROWTH.limits.submissions} submissions/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{PLANS.GROWTH.limits.projects} projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{PLANS.GROWTH.limits.endpoints} endpoints</span>
                  </li>
                  {PLANS.GROWTH.features.slice(3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Need more? <Link href="/help" className="text-emerald-600 hover:text-emerald-700 font-semibold">Contact us for Enterprise plans</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Amazing Forms?
          </h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
            Join hundreds of developers, agencies, and businesses using JSONPost to handle forms without the backend complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl"
              asChild
            >
              <Link href="/auth/signup">
                Start Building for Free <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-white text-white bg-transparent hover:bg-white hover:text-emerald-700 hover:border-white"
              asChild
            >
              <Link href="https://forms.jsonpost.com" target="_blank" rel="noopener noreferrer">
                Browse Gallery <Globe className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center text-emerald-50">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>500 free submissions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

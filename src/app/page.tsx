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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  HelpCircle,
  UserPlus,
  CreditCard,
  Trophy,
  AlertTriangle,
  Bell,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            {/* Badge and heading combined */}
            <div className="mb-6">
              <Badge
                variant="secondary"
                className="mb-6 bg-blue-50 text-blue-700 border-blue-200"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Complete Form Platform
              </Badge>

              {/* Main heading directly after badge */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent text-center leading-tight">
                The Complete Platform for <br className="hidden sm:block" />
                Building and Managing Forms.
              </h1>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto text-center">
              Create forms with our builder and gallery. Single page forms or
              conversational-style multi-step forms. JSONPost takes care of
              storage, notifications, and integrations.
            </p>

            {/* New CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                asChild
              >
                <Link href="/auth/signup">
                  Start Building Forms Free{" "}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2"
                asChild
              >
                <Link
                  href="https://forms.jsonpost.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse Form Gallery <Globe className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>
                ✓ Free forever plan • ✓ No credit card required • ✓ 500
                submissions/month
              </p>
              <p>
                ✓ Drag & drop builder • ✓ Beautiful themes • ✓ Works with any
                website
              </p>
            </div>
          </div>

          {/* Frontend Capabilities Showcase */}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              From Idea to Live Form in Minutes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you&apos;re building from scratch or using our templates,
              getting started is simple
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Method</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use our drag & drop builder, browse the template gallery, or
                code your own HTML form
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Customize & Style</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Apply themes, add your branding, and configure validation rules
                and notifications
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Go Live</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Publish your form and start collecting submissions with
                automatic storage and notifications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Types Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
              🎨 Form Variety
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 dark:from-white dark:via-purple-200 dark:to-indigo-200 bg-clip-text text-transparent">
              Every Form Type You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Create the perfect form experience for your users with our
              flexible form types
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Single Page Forms */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Single Page Forms</CardTitle>
                <CardDescription>
                  Classic forms with all fields on one page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Perfect for contact forms, feedback surveys, and simple data
                  collection. Quick to fill out and familiar to users.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Fast completion</li>
                  <li>• Mobile optimized</li>
                  <li>• Real-time validation</li>
                  <li>• Custom styling</li>
                </ul>
              </CardContent>
            </Card>

            {/* Multi-Step Forms */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Multi-Step Forms</CardTitle>
                <CardDescription>
                  Break complex forms into manageable steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Ideal for detailed applications, surveys, and onboarding
                  flows. Reduce abandonment with progressive disclosure.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Progress indicators</li>
                  <li>• Step validation</li>
                  <li>• Save & resume</li>
                  <li>• Conditional logic</li>
                </ul>
              </CardContent>
            </Card>

            {/* Conversational Forms */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Conversational Forms</CardTitle>
                <CardDescription>
                  Chat-like forms that feel natural
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Engage users with a conversation-style interface. Higher
                  completion rates and better user experience.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Chat interface</li>
                  <li>• Dynamic responses</li>
                  <li>• Personality & tone</li>
                  <li>• Smart branching</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-lg font-semibold">
              🚀 All form types work seamlessly with our backend
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              ⚡ Complete Form Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Everything You Need for Forms
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From beautiful form creation to powerful submission handling -
              we&apos;ve got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Visual Form Builder</CardTitle>
                <CardDescription>
                  Drag & drop interface for creating beautiful forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Build forms visually with our intuitive drag & drop builder.
                  No coding required.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Instant Notifications</CardTitle>
                <CardDescription>
                  Get notified the moment someone submits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Instant email notifications with custom templates. Never miss
                  a submission again.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Webhook className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Stop Wiring Complex Integrations
                </CardTitle>
                <CardDescription>
                  One webhook connects to any tool you use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  One webhook connects to Slack, Discord, Zapier, or any tool.
                  No more hours spent on integration hell.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Block Spam Before It Hits
                </CardTitle>
                <CardDescription>
                  Built-in honeypot and validation protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Built-in honeypot and validation keeps bots out of your inbox.
                  No more sifting through junk submissions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  See What&apos;s Actually Working
                </CardTitle>
                <CardDescription>
                  Track conversion rates and spot trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Track conversion rates, spot trends, and export data. Know
                  which forms drive results, not just submissions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Developer-Friendly API
                </CardTitle>
                <CardDescription>
                  Clean REST API and documentation that doesn&apos;t suck
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Clean REST API, JSON/form-data support, and docs that
                  don&apos;t suck. Integrate in minutes, not days.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Handle Files Without Headaches
                </CardTitle>
                <CardDescription>
                  Accept uploads with size limits and validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Accept uploads, set size limits, validate file types. No AWS
                  S3 setup or storage nightmares.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Security That Just Works
                </CardTitle>
                <CardDescription>
                  Enterprise-grade security without complexity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Domain restrictions, API keys, CORS protection.
                  Enterprise-grade security without the enterprise complexity.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Validate Data Automatically
                </CardTitle>
                <CardDescription>
                  Custom JSON schemas catch bad data before it reaches you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Custom JSON schemas catch bad data before it reaches you. No
                  more debugging broken form submissions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Delight Users with Custom Responses
                </CardTitle>
                <CardDescription>
                  Branded success messages and smart redirects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Branded success messages and smart redirects. Turn form
                  submissions into great user experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Keep Your Team in the Loop
                </CardTitle>
                <CardDescription>
                  Multiple notification emails and webhooks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Multiple notification emails and webhooks. Everyone stays
                  updated without manual forwarding.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Your Data, Your Control
                </CardTitle>
                <CardDescription>
                  Export everything anytime, no vendor lock-in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Export everything anytime. No vendor lock-in means you own
                  your submissions and can leave whenever.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Section */}
          <section className="py-20 px-4 bg-white dark:bg-slate-900">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
                  🤔 The Real Question
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 dark:from-white dark:via-orange-200 dark:to-red-200 bg-clip-text text-transparent">
                  Why not just roll your own forms?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Sure, you could build your own form handling. But here&apos;s
                  what you&apos;re really signing up for...
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* JSONPost Column */}
                <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-green-800 dark:text-green-200">
                          JSONPost
                        </CardTitle>
                        <CardDescription className="text-green-600 dark:text-green-300">
                          The smart choice
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          5-minute setup
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Copy endpoint, paste in form. Done.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          Built-in spam protection
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Honeypot fields, rate limiting, CORS protection.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          99.9% uptime SLA
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Your forms work when your clients need them.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          Auto-scaling
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Handle 10 or 10,000 submissions without thinking.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          Multiple integrations
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Email, Slack, webhooks, Zapier - all included.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          Focus on your product
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Build features that matter, not form infrastructure.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DIY Column */}
                <Card className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-red-800 dark:text-red-200">
                          DIY Solutions
                        </CardTitle>
                        <CardDescription className="text-red-600 dark:text-red-300">
                          SMTP, PHP mail, Supabase, Netlify Forms
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200">
                          Hours of setup & debugging
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          SMTP configs, server setup, email deliverability
                          issues.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200">
                          Spam nightmare
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Build your own captcha, rate limiting, validation.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200">
                          Downtime = lost leads
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Server crashes, email bounces, silent failures.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200">
                          Scaling headaches
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Traffic spikes break your forms when you need them
                          most.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200">
                          Maintenance burden
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Security updates, monitoring, backup strategies.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200">
                          Time sink
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Weeks building what should take minutes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-lg font-semibold">
                  💡 Smart builders choose the path of least resistance
                </div>
              </div>
            </div>
          </section>

          {/* Built for Builders of All Kinds Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                  🔹 For Everyone
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                  Built for Builders of All Kinds
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Whether you&apos;re coding your first app or scaling your
                  agency, JSONPost adapts to your workflow
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Developers */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Developers</CardTitle>
                    <CardDescription>
                      Skip boilerplate, wire up forms in minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Focus on features, not form infrastructure. Get a working
                      endpoint with validation, notifications, and webhooks
                      instantly.
                    </p>
                  </CardContent>
                </Card>

                {/* Agencies */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Agencies</CardTitle>
                    <CardDescription>
                      Manage all client forms in one clean dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      White-label forms for every client. Centralized
                      management, branded experiences, and detailed analytics
                      for all projects.
                    </p>
                  </CardContent>
                </Card>

                {/* Marketers */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Marketers</CardTitle>
                    <CardDescription>
                      Capture leads, push them straight to HubSpot/Zapier
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Turn every form into a lead magnet. Instant CRM
                      integration, automated follow-ups, and conversion tracking
                      built-in.
                    </p>
                  </CardContent>
                </Card>

                {/* Freelancers */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Freelancers</CardTitle>
                    <CardDescription>
                      Ship projects fast without babysitting backend code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Deliver client projects faster. No server setup, no
                      maintenance headaches. Just working forms that scale with
                      your business.
                    </p>
                  </CardContent>
                </Card>

                {/* Founders */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Founders</CardTitle>
                    <CardDescription>
                      Validate MVPs with working forms in 5 minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Test ideas fast. Get user feedback, collect signups, and
                      validate concepts without building backend infrastructure.
                    </p>
                  </CardContent>
                </Card>

                {/* Website Owners */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Website Owners</CardTitle>
                    <CardDescription>
                      Add a reliable &quot;Contact Us&quot; form without
                      touching code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      Simple copy-paste forms that just work. No coding
                      required, no server management. Just reliable contact
                      forms for your site.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Testimonials / Social Proof Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm font-medium mb-4">
                  ⭐ Loved by Users
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-yellow-800 to-orange-800 dark:from-white dark:via-yellow-200 dark:to-orange-200 bg-clip-text text-transparent">
                  What Our Users Are Saying
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Join thousands of businesses who&apos;ve simplified their form
                  handling with JSONPost
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {/* Testimonial 1 */}
                <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">S</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">Sarah Chen</CardTitle>
                        <CardDescription>
                          Frontend Developer at TechCorp
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      &quot;JSONPost saved me hours of setup time. I went from
                      struggling with SMTP configs to having a working contact
                      form in 5 minutes. The spam protection is fantastic
                      too!&quot;
                    </p>
                  </CardContent>
                </Card>

                {/* Testimonial 2 */}
                <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">M</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          Marcus Rodriguez
                        </CardTitle>
                        <CardDescription>
                          Agency Owner, PixelCraft
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      &quot;We use JSONPost for all our client projects. The
                      reliability is incredible - never had a form go down. Our
                      clients love the instant notifications.&quot;
                    </p>
                  </CardContent>
                </Card>

                {/* Testimonial 3 */}
                <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">A</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">Alex Thompson</CardTitle>
                        <CardDescription>
                          Indie Hacker & SaaS Builder
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      &quot;Perfect for my Webflow sites. No more dealing with
                      Zapier complexity or expensive form plugins. JSONPost just
                      works, and the free tier is generous.&quot;
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Social Proof Stats */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Trusted by the Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Real feedback from real developers
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      100+
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      Active Users
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                      10000+
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      Forms Processed
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      4.9/5
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      Average Rating
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      99.9%
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      Uptime
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Mentions */}
              <div className="mt-16 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
                  Featured in Tech Communities
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">HN</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Hacker News
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">r/</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      r/webdev
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">IH</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Indie Hackers
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">PH</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Product Hunt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
              🎯 Common Use Cases
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
              Use Cases
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From simple contact forms to complex workflows, JSONPost handles
              all your form submission needs with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* HTML Form Notifications */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  HTML Form Notifications
                </CardTitle>
                <CardDescription>
                  Perfect for static sites and landing pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Serverless HTML form notifications. JSONPost effortlessly
                  handles submissions, storage, and notifications for your HTML
                  forms. Perfect for static sites and landing pages.
                </p>
              </CardContent>
            </Card>

            {/* Contact Forms */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Contact Us Forms</CardTitle>
                <CardDescription>
                  Get instant email alerts from customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Perfect for HTML contact us form notifications. Get instant
                  email alerts when customers reach out through your website.
                </p>
              </CardContent>
            </Card>

            {/* User Feedback */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">User Feedback</CardTitle>
                <CardDescription>
                  Collect valuable insights from your users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive customer reviews and feedback ratings. Collect
                  valuable insights from your users to improve your products and
                  services.
                </p>
              </CardContent>
            </Card>

            {/* Surveys & Quizzes */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Surveys & Quizzes</CardTitle>
                <CardDescription>
                  Gather data and insights from your audience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Collect responses from your audience. Create engaging surveys
                  and quizzes to gather data and insights from your users.
                </p>
              </CardContent>
            </Card>

            {/* Support Tickets */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Support Tickets</CardTitle>
                <CardDescription>
                  Provide timely customer support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Get alerted when a user submits a support ticket. Provide
                  timely customer support with instant notifications.
                </p>
              </CardContent>
            </Card>

            {/* Sign-up Tracking */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Sign-up Tracking</CardTitle>
                <CardDescription>
                  Stay informed about your growing user base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Notifications for each new user account creation. Stay
                  informed about your growing user base with real-time alerts.
                </p>
              </CardContent>
            </Card>

            {/* Payment Updates */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Payment Updates</CardTitle>
                <CardDescription>
                  Monitor payment events and subscription changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Get alerted for changes in user subscription status. Monitor
                  payment events and subscription changes in real-time.
                </p>
              </CardContent>
            </Card>

            {/* User Milestones */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">User Milestones</CardTitle>
                <CardDescription>
                  Track important user achievements and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Notifications for user behaviors & milestones. Track important
                  user achievements and engagement events.
                </p>
              </CardContent>
            </Card>

            {/* Website Errors */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Website Errors</CardTitle>
                <CardDescription>
                  Monitor and respond to critical issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Get notified of specific errors in your website. Monitor and
                  respond to critical issues before they impact users.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Versatile API Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">
                  Versatile Notification API
                </CardTitle>
                <CardDescription className="text-lg max-w-3xl mx-auto">
                  <strong>Go beyond form submissions.</strong> HTML form
                  submissions are just the tip of the iceberg. JSONPost doubles
                  as a notification API that works server-side and in the
                  browser.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Free Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 dark:from-white dark:via-green-200 dark:to-blue-200 bg-clip-text text-transparent">
              Developer Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Free utilities to help you build better forms and work with data
              structures
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* HTML Form Generator */}
            <Card className="border-2 border-transparent hover-border-blue-200 dark:hover-border-blue-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">
                  Free HTML Form Generator
                </CardTitle>
                <CardDescription className="text-base">
                  Create beautiful, responsive HTML forms with our visual form
                  builder. Choose from templates, customize fields, and export
                  clean HTML code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/free-html-form-generator">
                    Try Form Generator
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* JSON Schema Builder */}
            <Card className="border-2 border-transparent hover-border-purple-200 dark:hover-border-purple-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">
                  Free JSON Schema Builder
                </CardTitle>
                <CardDescription className="text-base">
                  Create, edit, and validate JSON schemas visually. Infer
                  schemas from JSON data, test validation, and export code in
                  multiple languages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/free-json-schema-builder">
                    Try Schema Builder
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
              🎯 Real-World Scenarios
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
              Perfect for Every Use Case
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From simple contact forms to complex workflows, JSONPost adapts to
              your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Static Site Contact Forms */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Static Site Contact Forms
                </CardTitle>
                <CardDescription>
                  Perfect for Gatsby, Next.js, Hugo, or plain HTML sites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Add a contact form to your static site in minutes. No server
                  required, no complex setup. Just paste the endpoint and start
                  collecting leads immediately.
                </p>
              </CardContent>
            </Card>

            {/* Agency Client Management */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Agency Client Projects
                </CardTitle>
                <CardDescription>
                  Streamline client communication and project intake
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Create branded forms for each client. Automatically route
                  submissions to the right team members. Integrate with your
                  project management tools via webhooks.
                </p>
              </CardContent>
            </Card>

            {/* No-Code Builders */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">No-Code Builders</CardTitle>
                <CardDescription>
                  Webflow, Carrd, Bubble, Framer - we work with them all
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Skip the expensive form plugins. JSONPost works seamlessly
                  with any no-code platform. Just point your form to our
                  endpoint and you&apos;re done.
                </p>
              </CardContent>
            </Card>

            {/* Product Feedback */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Product Feedback & Surveys
                </CardTitle>
                <CardDescription>
                  Collect user insights and feature requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Embed feedback forms anywhere in your app. Collect feature
                  requests, bug reports, and user satisfaction surveys. Auto-tag
                  and route to the right team.
                </p>
              </CardContent>
            </Card>

            {/* Error Logging */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Error Logging & Notifications
                </CardTitle>
                <CardDescription>
                  Monitor your apps with instant alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Send error reports directly to JSONPost. Get instant Slack
                  notifications when things break. Perfect for client-side error
                  tracking and monitoring.
                </p>
              </CardContent>
            </Card>

            {/* Newsletter Signups */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Newsletter & Lead Capture
                </CardTitle>
                <CardDescription>
                  Build your email list effortlessly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Create beautiful signup forms that integrate with your email
                  marketing tools. Automatic double opt-in, spam protection, and
                  lead scoring included.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/auth/signup">
                Start Building Your Forms{" "}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
              Free tier includes everything you need to get started
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <Code className="w-4 h-4 mr-1" />
              Developer Integration
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Simple Integration
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you prefer our visual builder or custom code, JSONPost
              works with any framework
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="html" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="ajax">AJAX</TabsTrigger>
                <TabsTrigger value="jquery">jQuery</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="server">Server</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="space-y-4">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`<form action="http://jsonpost.com/api/submit/project-id/contact-form" method="POST">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message"></textarea>
  <button type="submit">Send Message</button>
</form>`}</code>
                  </pre>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Pure HTML - works anywhere, no JavaScript required
                </p>
              </TabsContent>

              <TabsContent value="ajax" className="space-y-4">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`fetch('http://jsonpost.com/api/submit/project-id/contact-form', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello from my website!'
  })
}).then(response => response.json())
  .then(data => console.log('Success:', data));`}</code>
                  </pre>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Modern JavaScript with fetch API
                </p>
              </TabsContent>

              <TabsContent value="jquery" className="space-y-4">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`$.ajax({
  url: 'http://jsonpost.com/api/submit/project-id/contact-form',
  method: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
    name: $('#name').val(),
    email: $('#email').val(),
    message: $('#message').val()
  }),
  success: function(data) {
    alert('Message sent successfully!');
  }
});`}</code>
                  </pre>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  jQuery for legacy projects
                </p>
              </TabsContent>

              <TabsContent value="react" className="space-y-4">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const response = await fetch('http://jsonpost.com/api/submit/project-id/contact-form', {
    method: 'POST',
    body: formData
  });
  
  if (response.ok) {
    setMessage('Thank you! Your message has been sent.');
  }
};

<form onSubmit={handleSubmit}>
  <input name="name" placeholder="Your Name" required />
  <input name="email" type="email" placeholder="Your Email" required />
  <textarea name="message" placeholder="Your Message"></textarea>
  <button type="submit">Send Message</button>
</form>`}</code>
                  </pre>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  React component with hooks
                </p>
              </TabsContent>

              <TabsContent value="server" className="space-y-4">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`// Node.js / Express
app.post('/contact', async (req, res) => {
  const response = await fetch('http://jsonpost.com/api/submit/project-id/contact-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  
  const result = await response.json();
  res.json(result);
});

// Python / Flask
@app.route('/contact', methods=['POST'])
def contact():
    response = requests.post(
        'http://jsonpost.com/api/submit/project-id/contact-form',
        json=request.json
    )
    return response.json()`}</code>
                  </pre>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Server-side integration examples
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Form Gallery Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-orange-900/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Form Templates
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
              Beautiful Form Gallery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose from our collection of professionally designed form
              templates. Single-page forms, multi-step conversational forms, and
              more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Form Template */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 flex items-center justify-center">
                <div className="w-32 h-24 bg-white dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Contact Form</CardTitle>
                <CardDescription>
                  Clean, professional contact form with validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link href="https://forms.jsonpost.com" target="_blank">
                    Preview & Use <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Multi-Step Survey */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center">
                <div className="w-32 h-24 bg-white dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Multi-Step Survey</CardTitle>
                <CardDescription>
                  Conversational-style forms with progress tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link href="https://forms.jsonpost.com" target="_blank">
                    Preview & Use <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 flex items-center justify-center">
                <div className="w-32 h-24 bg-white dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Newsletter Signup</CardTitle>
                <CardDescription>
                  Beautiful email capture with double opt-in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link href="https://forms.jsonpost.com" target="_blank">
                    Preview & Use <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="https://forms.jsonpost.com" target="_blank">
                Explore All Templates <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
              50+ professional templates to choose from
            </p>
          </div>
        </div>
      </section>

      {/* Security & Reliability Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
              🔒 Enterprise-Grade Security
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 dark:from-white dark:via-green-200 dark:to-emerald-200 bg-clip-text text-transparent">
              Security & Reliability You Can Trust
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built for developers and agencies who can&apos;t afford downtime
              or security breaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* API Security */}
            <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">Secure API Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Encrypted API keys with domain restrictions and rate limiting.
                  Your endpoints are protected from unauthorized access.
                </p>
              </CardContent>
            </Card>

            {/* CORS Protection */}
            <Card className="text-center border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">CORS Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Configurable CORS policies ensure your forms only accept
                  submissions from authorized domains and origins.
                </p>
              </CardContent>
            </Card>

            {/* Spam Protection */}
            <Card className="text-center border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">
                  Honeypot Spam Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Built-in honeypot fields, rate limiting, and IP-based
                  filtering keep spam bots away from your inbox.
                </p>
              </CardContent>
            </Card>

            {/* Uptime SLA */}
            <Card className="text-center border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">99.9% Uptime SLA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Redundant infrastructure across multiple regions ensures your
                  forms are always available when your customers need them.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Security Features */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Enterprise Security Standards
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      SSL/TLS Encryption
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      All data transmitted over HTTPS with TLS 1.3
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Data Encryption at Rest
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      AES-256 encryption for all stored form submissions
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      GDPR Compliant
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Data processing agreements and right to deletion
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      SOC 2 Type II
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Audited security controls and compliance reporting
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Trusted by Agencies & Enterprises
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  When reliability matters, professionals choose JSONPost
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    99.9%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Uptime SLA
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    &lt;100ms
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Response Time
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    24/7
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Monitoring
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    0
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Data Breaches
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              💰 Transparent Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Start Free, Scale When Ready
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              No hidden fees, no surprises. Pay only for what you use as you
              grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {Object.values(PLANS)
              .filter((plan) => plan.id !== "ENTERPRISE")
              .map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative overflow-visible transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    plan.popular
                      ? "border-2 border-blue-500 shadow-xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-blue-900/20 dark:to-indigo-900/20"
                      : "border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
                >
                  {plan.popular && (
                    <>
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 shadow-lg whitespace-nowrap">
                          ⭐ Most Popular
                        </Badge>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    </>
                  )}
                  <CardHeader className="pb-4 pt-6">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.contactUs ? (
                        <span className="text-2xl">Contact Us</span>
                      ) : (
                        <>
                          <span
                            className={
                              plan.popular
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                : ""
                            }
                          >
                            {plan.priceDisplay}
                          </span>
                        </>
                      )}
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-300 font-medium">
                      {plan.id === "FREE" && "🚀 Try it out, no commitment"}
                      {plan.id === "PRO" &&
                        "📈 Serious usage, advanced automation"}
                      {plan.id === "GROWTH" &&
                        "🏢 Agencies & teams with scaling needs"}
                      {plan.id === "ENTERPRISE" && "🏛️ For large organizations"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 text-sm mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full py-3 font-semibold transition-all duration-200 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                          : "border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      {plan.contactUs ? (
                        <Link
                          href="/help"
                          className="inline-flex items-center justify-center"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Contact Sales
                        </Link>
                      ) : (
                        <Link
                          href="/auth/signup"
                          className="inline-flex items-center justify-center"
                        >
                          {plan.id === "FREE" ? (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Start Free — No Credit Card
                            </>
                          ) : plan.id === "PRO" ? (
                            <>
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Upgrade for Advanced Features
                            </>
                          ) : (
                            <>
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Scale Your Business
                            </>
                          )}
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              All plans include SSL encryption, spam protection, and 24/7
              support.
              <Link
                href="/help"
                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
              >
                Need a custom plan?
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              💡 Got Questions?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about integrating JSONPost into your
              projects
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <Card className="border-0 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-start">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  How do I integrate JSONPost with my static site?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  It&apos;s incredibly simple! Just point your form&apos;s
                  action to your JSONPost endpoint and set the method to POST.
                  Works with any HTML form - no JavaScript required. For
                  frameworks like React or Vue, you can use fetch() or axios to
                  submit form data to your endpoint.
                </CardDescription>
                <div className="mt-4 p-4 bg-gray-100 dark:bg-slate-600 rounded-lg">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    &lt;form
                    action=&quot;https://jsonpost.com/api/submit/your-project/contact&quot;
                    method=&quot;POST&quot;&gt;
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 2 */}
            <Card className="border-0 bg-gradient-to-r from-slate-50 to-green-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-start">
                  <Code className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                  Can I use this with React/Next.js/Vue?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  Absolutely! JSONPost works with any frontend framework. You
                  can use it with React, Next.js, Vue, Angular, Svelte, or any
                  other framework. Just make a POST request to your endpoint
                  with your form data. We provide examples and starter code for
                  popular frameworks.
                </CardDescription>
                <div className="mt-4 p-4 bg-gray-100 dark:bg-slate-600 rounded-lg">
                  <code className="text-sm text-gray-800 dark:text-gray-200">
                    fetch(&apos;https://jsonpost.com/api/submit/your-project/contact&apos;,
                    &#123; method: &apos;POST&apos;, body: formData &#125;)
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* FAQ 3 */}
            <Card className="border-0 bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-start">
                  <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                  What happens if I exceed the free tier?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  Your forms will continue to work! We&apos;ll send you a
                  notification when you&apos;re approaching your limit. You can
                  upgrade to a paid plan anytime to increase your limits. We
                  never shut down your forms abruptly - we believe in keeping
                  your business running smoothly.
                </CardDescription>
              </CardContent>
            </Card>

            {/* FAQ 4 */}
            <Card className="border-0 bg-gradient-to-r from-slate-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-start">
                  <Database className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3 mt-1 flex-shrink-0" />
                  Do you keep my form submission data?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  We store your form submissions securely for 30 days by
                  default, so you can access them in your dashboard. After that,
                  they&apos;re automatically deleted unless you&apos;ve exported
                  them. You can also configure immediate deletion if you prefer.
                  All data is encrypted at rest and in transit.
                </CardDescription>
              </CardContent>
            </Card>

            {/* FAQ 5 */}
            <Card className="border-0 bg-gradient-to-r from-slate-50 to-red-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-start">
                  <Shield className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />
                  How does spam protection work?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  We use multiple layers of spam protection including honeypot
                  fields, rate limiting, and intelligent content filtering. You
                  can also enable reCAPTCHA integration for additional
                  protection. Our system learns and adapts to block spam while
                  ensuring legitimate submissions always get through.
                </CardDescription>
              </CardContent>
            </Card>

            {/* FAQ 6 */}
            <Card className="border-0 bg-gradient-to-r from-slate-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-start">
                  <Webhook className="w-6 h-6 text-teal-600 dark:text-teal-400 mr-3 mt-1 flex-shrink-0" />
                  Can I integrate with other services like Slack or Zapier?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  Yes! JSONPost supports webhooks, so you can send form
                  submissions to any service that accepts HTTP requests. We have
                  native integrations with popular services like Slack, Discord,
                  and Zapier. You can also use our API to build custom
                  integrations with your existing tools.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              🚀 Ready to Get Started?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Stop Losing Leads.
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Start Handling Forms the Easy Way.
              </span>
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of developers who&apos;ve simplified their form
              handling. Get started in under 2 minutes with our generous free
              tier.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 text-center text-white/80">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                2 Minutes
              </div>
              <div className="text-sm">Setup Time</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-green-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm">Uptime SLA</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-sm">Happy Developers</div>
            </div>
          </div>

          {/* Final Value Props */}
          <div className="mt-16 grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-300 mr-3" />
                <h3 className="text-xl font-semibold text-white">
                  No Credit Card Required
                </h3>
              </div>
              <p className="text-blue-100">
                Start with our generous free tier.{" "}
                {PLANS.FREE.limits.submissions} submissions per month, forever
                free. Upgrade only when you need more.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-300 mr-3" />
                <h3 className="text-xl font-semibold text-white">
                  Instant Setup
                </h3>
              </div>
              <p className="text-blue-100">
                No complex configurations or server setup. Just create an
                endpoint and start receiving form submissions immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

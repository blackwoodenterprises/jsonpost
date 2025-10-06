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
  Play,
  ExternalLink,
  Palette,
  MousePointer,
  SidebarOpen,
  Eye,
  EyeOff,
  Lock,
  Gauge,
  DollarSign,
  Target,
  Lightbulb,
} from "lucide-react";

export { metadata } from "./metadata";

export default function FreeTypeformAlternativePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white dark:from-emerald-900/20 dark:via-slate-950 dark:to-slate-950">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Free Typeform Alternative
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              JSONPost vs Typeform
              <br />
              <span className="text-emerald-600 dark:text-emerald-500">
                The Complete Comparison
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover why JSONPost is the modern alternative to Typeform. Build
              beautiful forms with advanced embedding, developer-friendly APIs,
              and powerful integrations—all at a fraction of the cost.
            </p>

            {/* YouTube Video */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/eWORcWJU0WI"
                  title="JSONPost vs Typeform Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 dark:shadow-emerald-500/20"
                asChild
              >
                <Link href="/auth/signup">
                  Try JSONPost Free <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                asChild
              >
                <Link
                  href="https://forms.jsonpost.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live Demo <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Comparison */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Quick Overview
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              See how JSONPost compares to Typeform at a glance
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead className="bg-emerald-50 dark:bg-emerald-900/20">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-emerald-700 dark:text-emerald-300">
                    JSONPost
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-600 dark:text-slate-400">
                    Typeform
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    Product Type
                  </td>
                  <td className="px-6 py-4 text-center text-emerald-700 dark:text-emerald-300">
                    Full-stack form platform
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                    SaaS form builder
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    Ideal For
                  </td>
                  <td className="px-6 py-4 text-center text-emerald-700 dark:text-emerald-300">
                    Developers, marketers, SaaS apps
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                    Marketing teams, surveys
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    Embedding Options
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      <Check className="w-4 h-4 mr-1" />
                      Advanced SDK
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Limited iframe
                    </Badge>
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    Developer API
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      <Check className="w-4 h-4 mr-1" />
                      Full REST API
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    >
                      Limited
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    Privacy & Performance
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      <Check className="w-4 h-4 mr-1" />
                      Cookie-free, fast
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Tracking scripts
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Feature Comparison */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Detailed Feature Comparison
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Dive deep into the features that matter most for your forms
            </p>
          </div>

          <div className="grid gap-8">
            {/* Form Types & Presentation */}
            <Card className="border-2 border-emerald-100 dark:border-emerald-900">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <LayoutGrid className="w-6 h-6 mr-3 text-emerald-600" />
                  Form Types & Presentation
                </CardTitle>
                <CardDescription>
                  Different ways to present your forms to users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                      JSONPost
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Conversational forms (chat-style)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">Single-page forms</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">Modal popups (built-in)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">Chatbox forms</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">Drawer-style forms</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-3">
                      Typeform
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Conversational forms (chat-style)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Single-page forms (limited)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          No native modal support
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Not available
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Not available
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Embedding & Integration */}
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Code className="w-6 h-6 mr-3 text-blue-600" />
                  Embedding & Integration
                </CardTitle>
                <CardDescription>
                  How easily you can integrate forms into your website or app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                      JSONPost
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">Complete JavaScript SDK</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Auto-trigger logic (exit intent, delay)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          30+ DaisyUI themes + custom CSS
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Multiple forms on one page
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-3">
                      Typeform
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Basic embed script
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          No auto-trigger logic
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Limited branding options
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Not recommended
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Developer Friendliness */}
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <GitBranch className="w-6 h-6 mr-3 text-purple-600" />
                  Developer Friendliness
                </CardTitle>
                <CardDescription>
                  APIs, SDKs, and integration capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                      JSONPost
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Full REST API for submissions & management
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          JavaScript SDK (embed + API)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Native n8n & Zapier integration
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">Customizable webhooks</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Built-in Google Sheets integration
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-3">
                      Typeform
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Limited API access
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Basic embed script only
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Zapier integration available
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">Webhooks available</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          Google Sheets integration
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance & Privacy */}
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Gauge className="w-6 h-6 mr-3 text-green-600" />
                  Performance & Privacy
                </CardTitle>
                <CardDescription>
                  Speed, privacy, and user experience considerations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                      JSONPost
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Minimal page speed impact (~20KB SDK)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Cookie-free, GDPR-friendly
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">No tracking scripts</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Sandboxed iframe security
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-3">
                      Typeform
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Heavier scripts (100KB+)
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Uses cookies for tracking
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Analytics and tracking pixels
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">
                          HTTPS-only, sandboxed iframe
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Value */}
            <Card className="border-2 border-yellow-100 dark:border-yellow-900">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <DollarSign className="w-6 h-6 mr-3 text-yellow-600" />
                  Pricing & Value
                </CardTitle>
                <CardDescription>
                  Cost comparison and value proposition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                      JSONPost
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">Generous free plan</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          Affordable paid plans for indie developers
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">No per-response billing</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">Unlimited embeds</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm">
                          White-labeling included in Pro
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-3">
                      Typeform
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">Free plan available</span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Higher-tier pricing for teams
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Per-response billing model
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          Limited embeds on lower plans
                        </span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">
                          White-labeling only in Enterprise
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Perfect Use Cases
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              When to choose JSONPost over Typeform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-emerald-100 dark:border-emerald-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="w-8 h-8 text-emerald-600 mb-2" />
                <CardTitle className="text-lg">
                  Lead Generation Popups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Create modal popups that appear on exit intent, after a delay,
                  or when users scroll. Perfect for capturing leads without
                  disrupting the user experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 dark:border-blue-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Feedback Widgets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Embed chatbox-style feedback forms that float on your website.
                  Collect user feedback without taking them away from your
                  content.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 dark:border-purple-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">
                  Developer Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Build forms programmatically with our REST API. Perfect for
                  SaaS applications that need dynamic form generation and
                  submission handling.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 dark:border-green-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Onboarding Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Create embedded onboarding flows within your application.
                  Collect user information seamlessly as part of your product
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 dark:border-orange-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle className="text-lg">Automation Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Connect forms to n8n, Zapier, or custom webhooks for powerful
                  automation. Trigger complex workflows based on form
                  submissions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-100 dark:border-red-900 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle className="text-lg">Mobile-First Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Build forms optimized for mobile devices with touch-friendly
                  interfaces and responsive design that works perfectly on any
                  screen size.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Verdict */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              The Final Verdict
            </h2>
          </div>

          <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">
                    Choose Typeform if you want:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm">
                        Beautiful hosted forms with minimal setup
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm">
                        Simple survey and questionnaire creation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                      <span className="text-sm">
                        Non-technical team members to manage forms
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">
                    Choose JSONPost if you want:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" />
                      <span className="text-sm">
                        Advanced embedding options (modals, chatboxes, drawers)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" />
                      <span className="text-sm">
                        Developer-friendly APIs and SDKs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" />
                      <span className="text-sm">
                        Better performance and privacy
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-4 h-4 text-emerald-600 mr-2 mt-0.5" />
                      <span className="text-sm">
                        More affordable pricing with better value
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <div className="flex items-start">
                  <Lightbulb className="w-6 h-6 text-emerald-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                      Our Recommendation
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong>JSONPost is the modern choice</strong> for
                      developers, marketers, and founders who want full control
                      over their forms. It bridges the gap between &ldquo;simple
                      form builder&rdquo; and &ldquo;full-stack form
                      platform&rdquo; — giving you the flexibility to embed
                      forms anywhere, automate everything, and scale without
                      vendor lock-in.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Try the Better Alternative?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers and marketers who&rsquo;ve made the
            switch to JSONPost
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-white text-emerald-700 hover:bg-gray-100 shadow-lg"
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
              <Link
                href="https://forms.jsonpost.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse Gallery <Globe className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              Free plan forever
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2" />
              Setup in 5 minutes
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

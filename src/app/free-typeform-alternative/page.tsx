import Link from "next/link";
import { Button } from "@/components/ui/button";
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
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white dark:from-emerald-900/20 dark:via-slate-950 dark:to-slate-950">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header Content */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Free Typeform Alternative
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              JSONPost vs Typeform
              <br />
              <span className="text-emerald-600 dark:text-emerald-500">
                The Complete Comparison
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover why JSONPost is the modern alternative to Typeform. Build
              beautiful forms with advanced embedding, developer-friendly APIs,
              and powerful integrations—all at a fraction of the cost.
            </p>
          </div>

          {/* Vertically Stacked Layout */}
          <div className="space-y-8 mb-16">
            {/* First Box - Description */}
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 dark:border-emerald-900/50 shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                Why Choose JSONPost?
              </h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-center max-w-4xl mx-auto">
                If you love Typeform&rsquo;s design but need developer control,
                JSONPost is the modern alternative built for performance,
                privacy, and full API flexibility.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Unlimited embeds
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    White-labeling
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Generous Free Tier
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    No vendor lock-in
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-emerald-100 dark:border-emerald-900 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Perfect for SaaS applications, marketing teams, and
                  developers. Explore our{" "}
                  <Link
                    href="/free-html-form-generator"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline font-medium"
                  >
                    free HTML form generator
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/free-json-schema-builder"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline font-medium"
                  >
                    JSON schema builder
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Second Box - Video */}
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/50 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                See JSONPost in Action
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 text-center">
                Watch how to create a Typeform-style conversational form for
                free using JSONPost&rsquo;s API form builder and embed SDK.
              </p>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/eWORcWJU0WI"
                  title="JSONPost vs Typeform Demo - Free Form Builder with API Access"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* Single Comprehensive Comparison Table */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Complete Feature Comparison
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Comprehensive side-by-side comparison of all features and
              capabilities
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-emerald-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-50 dark:bg-emerald-900/20">
                  <tr>
                    <th className="px-6 py-6 text-left font-bold text-lg text-slate-900 dark:text-white border-b border-emerald-100 dark:border-emerald-900/50">
                      Feature
                    </th>
                    <th className="px-6 py-6 text-center font-bold text-lg text-emerald-700 dark:text-emerald-300 border-b border-emerald-100 dark:border-emerald-900/50">
                      JSONPost
                    </th>
                    <th className="px-6 py-6 text-center font-bold text-lg text-slate-600 dark:text-slate-400 border-b border-emerald-100 dark:border-emerald-900/50">
                      Typeform
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {/* Form Types */}
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Conversational Forms
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Full Support
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Full Support
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Single-Page Forms
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Yes
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Limited
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Modal Popups
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Yes
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <X className="w-4 h-4 mr-1" />
                        No
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Chatbox & Drawer Styles
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Yes
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <X className="w-4 h-4 mr-1" />
                        No
                      </Badge>
                    </td>
                  </tr>

                  {/* Embedding */}
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      JavaScript SDK
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
                        Basic Embed
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      White-labeling
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Complete
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Branded
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Custom Domains
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Yes
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        Pro Plan Only
                      </Badge>
                    </td>
                  </tr>

                  {/* Developer Features */}
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      REST API
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Full API
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
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Webhooks
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Advanced
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Basic
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Data Export
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        JSON, CSV, Excel
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        CSV, Excel
                      </Badge>
                    </td>
                  </tr>

                  {/* Privacy & Performance */}
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Cookie-free
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Yes
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Uses Cookies
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      GDPR Compliant
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Built-in
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        Yes
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Load Speed
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Gauge className="w-4 h-4 mr-1" />
                        Ultra Fast
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Slower
                      </Badge>
                    </td>
                  </tr>

                  {/* Pricing */}
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Free Plan
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <Check className="w-4 h-4 mr-1" />
                        500 submissions/month
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        10 responses/month
                      </Badge>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-slate-900">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      Starting Price
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <DollarSign className="w-4 h-4 mr-1" />
                        FREE
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        $99/month
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Common questions about switching from Typeform to JSONPost
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Can I migrate my existing Typeform forms to JSONPost?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! JSONPost provides migration tools and support to help you
                transfer your forms, responses, and integrations from Typeform.
                Our team can assist with the migration process to ensure a
                smooth transition.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                How does JSONPost&rsquo;s embedding work compared to Typeform?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                JSONPost offers advanced embedding options including JavaScript
                SDK, iframe embeds, modal popups, and drawer-style forms. Unlike
                Typeform&rsquo;s limited iframe embedding, our SDK gives you
                complete control over styling, behavior, and integration with
                your application. Check our{" "}
                <Link
                  href="/embed"
                  className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline font-medium"
                >
                  embedding documentation
                </Link>{" "}
                for detailed implementation guides.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                What makes JSONPost more developer-friendly than Typeform?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                JSONPost provides a complete REST API, advanced webhooks, custom
                domains, white-labeling, and flexible embedding options. You can
                programmatically create forms, manage submissions, and integrate
                deeply with your applications—something that&rsquo;s limited or
                expensive with Typeform.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Is JSONPost really more affordable than Typeform?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! JSONPost starts at FREE compared to Typeform&rsquo;s
                $99/month, and includes more features in the base plan. Our free
                tier offers 500 submissions per month (vs Typeform&rsquo;s 10),
                and you get advanced features like API access and white-labeling
                without paying premium prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-emerald-50 dark:bg-emerald-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Ready to Switch from Typeform?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers and businesses who&rsquo;ve made the
            switch to JSONPost for better performance, more features, and lower
            costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 dark:shadow-emerald-500/20"
              asChild
            >
              <Link href="/auth/signup">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-emerald-600 hover:border-emerald-700 text-emerald-600 hover:text-emerald-700 dark:border-emerald-400 dark:text-emerald-400 dark:hover:border-emerald-300 dark:hover:text-emerald-300"
              asChild
            >
              <Link href="/contact">
                Contact Sales <MessageSquare className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

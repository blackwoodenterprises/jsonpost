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
import {
  Code,
  Zap,
  Mail,
  Webhook,
  Shield,
  BarChart3,
  ArrowRight,
  Copy,
  CheckCircle,
  Globe,
  Sparkles,
  Clock,
  Database,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">JSONPost</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Headless Form Backend
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Forms Backend
              <br />
              in 30 seconds
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Skip the backend setup. Create form endpoints instantly and start
              collecting submissions. Perfect for developers, founders, and
              freelancers who need forms fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Start Building <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#demo">See Code Examples</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Free tier • No credit card • 100 submissions/month
            </p>
          </div>

          {/* Quick Demo */}
          <div
            id="demo"
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600" />
                  1. Create endpoint (30 seconds)
                </h3>
                <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span>POST /api/submit/contact-form</span>
                    <Copy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
                  </div>
                  <div className="text-gray-400">✓ Endpoint created</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-purple-600" />
                  2. Send data (any way you want)
                </h3>
                <div className="bg-black rounded-lg p-4 text-blue-400 font-mono text-sm">
                  <div className="text-gray-400">{/* HTML Form */}</div>
                  <div>&lt;form action=&quot;your-endpoint&quot;&gt;</div>
                  <div className="ml-2">
                    &lt;input name=&quot;email&quot; /&gt;
                  </div>
                  <div>&lt;/form&gt;</div>
                  <div className="mt-2 text-gray-400">
                    {/* or fetch(), axios, curl... */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Works with everything</h2>
            <p className="text-gray-600 dark:text-gray-300">
              HTML forms, React, Vue, vanilla JS, mobile apps - if it can make
              HTTP requests, it works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* HTML Example */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  HTML Form
                </CardTitle>
                <CardDescription>Classic form submission</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-blue-400">&lt;form</div>
                  <div className="text-blue-400 ml-2">
                    action=&quot;https://api.jsonpost.io/submit/your-id/contact&quot;
                  </div>
                  <div className="text-blue-400 ml-2">
                    method=&quot;POST&quot;&gt;
                  </div>
                  <div className="text-green-400 ml-2">
                    &lt;input name=&quot;email&quot; required /&gt;
                  </div>
                  <div className="text-green-400 ml-2">
                    &lt;textarea name=&quot;message&quot;&gt;&lt;/textarea&gt;
                  </div>
                  <div className="text-yellow-400 ml-2">
                    &lt;button type=&quot;submit&quot;&gt;Send&lt;/button&gt;
                  </div>
                  <div className="text-blue-400">&lt;/form&gt;</div>
                </div>
              </CardContent>
            </Card>

            {/* JavaScript Example */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  JavaScript/React
                </CardTitle>
                <CardDescription>Modern fetch API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-purple-400">
                    const response = await fetch(
                  </div>
                  <div className="text-green-400 ml-2">
                    &apos;https://api.jsonpost.io/submit/your-id/contact&apos;,
                  </div>
                  <div className="text-blue-400 ml-2">{`{`}</div>
                  <div className="text-blue-400 ml-4">
                    method: &apos;POST&apos;,
                  </div>
                  <div className="text-blue-400 ml-4">
                    headers: {`{`} &apos;Content-Type&apos;:
                    &apos;application/json&apos; {`}`},
                  </div>
                  <div className="text-blue-400 ml-4">
                    body: JSON.stringify(formData)
                  </div>
                  <div className="text-blue-400 ml-2">{`}`}</div>
                  <div className="text-purple-400">)</div>
                </div>
              </CardContent>
            </Card>

            {/* cURL Example */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  cURL/API Testing
                </CardTitle>
                <CardDescription>Command line or Postman</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-yellow-400">curl -X POST \</div>
                  <div className="text-green-400 ml-2">
                    https://api.jsonpost.io/submit/your-id/contact \
                  </div>
                  <div className="text-blue-400 ml-2">
                    -H &quot;Content-Type: application/json&quot; \
                  </div>
                  <div className="text-purple-400 ml-2">
                    -d {`'{"email": "user@example.com"}'`}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Example */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Response
                </CardTitle>
                <CardDescription>What you get back</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-blue-400">{`{`}</div>
                  <div className="text-green-400 ml-2">
                    &quot;success&quot;: true,
                  </div>
                  <div className="text-green-400 ml-2">
                    &quot;message&quot;: &quot;Submission received&quot;,
                  </div>
                  <div className="text-yellow-400 ml-2">
                    &quot;id&quot;: &quot;uuid-here&quot;
                  </div>
                  <div className="text-blue-400">{`}`}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
            <p className="text-gray-600 dark:text-gray-300">
              From simple contact forms to complex workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-transparent hover:border-blue-200 transition-colors">
              <CardHeader>
                <Zap className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Instant Setup</CardTitle>
                <CardDescription>
                  Create endpoints in seconds. No server setup, no database
                  config.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-transparent hover:border-green-200 transition-colors">
              <CardHeader>
                <Mail className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Get submissions in your inbox instantly with custom templates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-transparent hover:border-purple-200 transition-colors">
              <CardHeader>
                <Webhook className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Webhook Integration</CardTitle>
                <CardDescription>
                  Forward data to Slack, Discord, Zapier, or any webhook URL.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-transparent hover:border-red-200 transition-colors">
              <CardHeader>
                <Shield className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>Spam Protection</CardTitle>
                <CardDescription>
                  Built-in honeypot and domain validation keeps spam away.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-transparent hover:border-orange-200 transition-colors">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Track submissions, view trends, export data as CSV.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-transparent hover:border-indigo-200 transition-colors">
              <CardHeader>
                <Code className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle>Developer Friendly</CardTitle>
                <CardDescription>
                  RESTful API, JSON/form-data support, comprehensive docs.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Clock className="w-4 h-4 mr-1" />
              Coming Soon
            </Badge>
            <h2 className="text-3xl font-bold mb-4">What&apos;s next</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We&apos;re constantly shipping new features for developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">File Uploads</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Handle file uploads with automatic cloud storage
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Auto-Responders</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Send automatic thank you emails to users
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Advanced Validation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Custom validation rules and field requirements
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Conversion tracking and detailed insights
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple pricing</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <div className="text-2xl font-bold">$0</div>
                <CardDescription>Perfect for side projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    100 submissions/month
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />1
                    project
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Email notifications
                  </li>
                </ul>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/auth/signup">Start Free</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="text-2xl font-bold">
                  $9<span className="text-sm font-normal">/mo</span>
                </div>
                <CardDescription>For growing projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    5,000 submissions/month
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />5
                    projects
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Webhooks & analytics
                  </li>
                </ul>
                <Button className="w-full mt-4" asChild>
                  <Link href="/auth/signup">Start Pro</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team</CardTitle>
                <div className="text-2xl font-bold">
                  $29<span className="text-sm font-normal">/mo</span>
                </div>
                <CardDescription>For agencies & teams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    50,000 submissions/month
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Team collaboration
                  </li>
                </ul>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/auth/signup">Start Team</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to ship faster?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Stop building form backends. Start building features that matter.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/signup">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <p className="text-blue-200 text-sm mt-4">
            No credit card required • 100 submissions free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">JSONPost</span>
              </div>
              <p className="text-gray-400 text-sm">
                Headless form backend for developers who want to ship fast.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#demo" className="hover:text-white">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-white">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:support@jsonpost.io"
                    className="hover:text-white"
                  >
                    Email Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 JSONPost. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

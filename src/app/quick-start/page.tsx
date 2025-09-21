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
} from "lucide-react";

export default function QuickStartPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Quick Start Guide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get Started with JSONPost
              <br />
              in 5 Minutes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Learn how to integrate JSONPost's headless form backend into your website. 
              From HTML forms to React components, we'll show you exactly how to collect 
              form submissions without writing any backend code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Start Free Account <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#step-1">Follow Along</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              This guide will walk you through everything you need to know to start collecting 
              form submissions with JSONPost, from basic HTML forms to advanced integrations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-2 border-transparent hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Account Setup</CardTitle>
                <CardDescription>
                  Create your account and first project in under 2 minutes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 border-transparent hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Endpoint Configuration</CardTitle>
                <CardDescription>
                  Configure your form endpoint with notifications and webhooks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 border-transparent hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Form Integration</CardTitle>
                <CardDescription>
                  Connect your HTML, React, or any frontend to JSONPost
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 border-transparent hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">View Submissions</CardTitle>
                <CardDescription>
                  Monitor and manage your form submissions in real-time
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Time Estimate */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                Total Time: 5-10 minutes
              </span>
            </div>
            <p className="text-blue-700 dark:text-blue-300">
              Perfect for developers who want to add form handling to their website quickly
            </p>
          </div>
        </div>
      </section>

      {/* Step 1: Account Setup */}
      <section id="step-1" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                1
              </div>
              <h2 className="text-3xl font-bold">Create Your Account & Project</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg ml-14">
              First, let's get you set up with a JSONPost account and create your first project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Instructions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Sign Up Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Visit the signup page</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Click "Start Free Account" and enter your email and password
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Verify your email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Check your inbox and click the verification link
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Create your first project</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Give your project a name like "My Website Forms"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Free Tier Includes:
                    </p>
                    <ul className="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
                      <li>• 100 form submissions per month</li>
                      <li>• Email notifications</li>
                      <li>• Basic webhook support</li>
                      <li>• File uploads up to 10MB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot Placeholder */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                    Screenshot: Dashboard After Signup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        JSONPost Dashboard
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Your project overview with quick stats
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: Create Endpoint */}
      <section id="step-2" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                2
              </div>
              <h2 className="text-3xl font-bold">Create Your First Endpoint</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg ml-14">
              Now let's create an endpoint that will receive your form submissions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Instructions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-green-600" />
                    Endpoint Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="font-medium">Endpoint Name</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Give it a descriptive name like "Contact Form" or "Newsletter Signup"
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium">Endpoint Path</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose a path like "contact" or "newsletter" (letters, numbers, hyphens only)
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Enter your email to get notified when someone submits the form
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Endpoint URL</CardTitle>
                  <CardDescription>
                    After creating the endpoint, you'll get a URL like this:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-4 text-sm font-mono">
                    <div className="text-green-400 mb-2"># Your unique endpoint URL</div>
                    <div className="text-white break-all">
                      https://jsonpost.com/api/submit/
                    </div>
                    <div className="text-blue-400 ml-2">your-project-id</div>
                    <div className="text-white">/</div>
                    <div className="text-purple-400 ml-2">contact</div>
                  </div>
                  <div className="flex items-center mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Copy className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">
                      Copy this URL - you'll need it for your form
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Screenshot Placeholder */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                    Screenshot: Create Endpoint Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center mx-auto mb-4">
                        <Settings className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        Endpoint Configuration
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Form to create your endpoint
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: HTML Form Integration */}
      <section id="step-3" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                3
              </div>
              <h2 className="text-3xl font-bold">Connect Your HTML Form</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg ml-14">
              The simplest way to get started - just point your HTML form to your JSONPost endpoint.
            </p>
          </div>

          <div className="space-y-8">
            {/* Basic HTML Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-600" />
                  Basic HTML Contact Form
                </CardTitle>
                <CardDescription>
                  Copy and paste this code into your HTML file, replacing the action URL with your endpoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-green-400 mb-2">&lt;!-- Simple contact form --&gt;</div>
                  <div className="text-blue-400">&lt;form</div>
                  <div className="text-blue-400 ml-2">action=&quot;https://jsonpost.com/api/submit/your-project-id/contact&quot;</div>
                  <div className="text-blue-400 ml-2">method=&quot;POST&quot;</div>
                  <div className="text-blue-400 ml-2">class=&quot;contact-form&quot;&gt;</div>
                  
                  <div className="text-white ml-2 mt-2">&lt;div class=&quot;form-group&quot;&gt;</div>
                  <div className="text-white ml-4">&lt;label for=&quot;name&quot;&gt;Name:&lt;/label&gt;</div>
                  <div className="text-yellow-400 ml-4">&lt;input type=&quot;text&quot; id=&quot;name&quot; name=&quot;name&quot; required&gt;</div>
                  <div className="text-white ml-2">&lt;/div&gt;</div>

                  <div className="text-white ml-2 mt-2">&lt;div class=&quot;form-group&quot;&gt;</div>
                  <div className="text-white ml-4">&lt;label for=&quot;email&quot;&gt;Email:&lt;/label&gt;</div>
                  <div className="text-yellow-400 ml-4">&lt;input type=&quot;email&quot; id=&quot;email&quot; name=&quot;email&quot; required&gt;</div>
                  <div className="text-white ml-2">&lt;/div&gt;</div>

                  <div className="text-white ml-2 mt-2">&lt;div class=&quot;form-group&quot;&gt;</div>
                  <div className="text-white ml-4">&lt;label for=&quot;message&quot;&gt;Message:&lt;/label&gt;</div>
                  <div className="text-yellow-400 ml-4">&lt;textarea id=&quot;message&quot; name=&quot;message&quot; rows=&quot;4&quot; required&gt;&lt;/textarea&gt;</div>
                  <div className="text-white ml-2">&lt;/div&gt;</div>

                  <div className="text-purple-400 ml-2 mt-2">&lt;button type=&quot;submit&quot;&gt;Send Message&lt;/button&gt;</div>
                  <div className="text-blue-400">&lt;/form&gt;</div>
                </div>
              </CardContent>
            </Card>

            {/* JavaScript/React Example */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-purple-600" />
                  JavaScript/React Integration
                </CardTitle>
                <CardDescription>
                  For more control, use JavaScript fetch or React to submit forms programmatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <div className="text-green-400 mb-2">// React component with form submission</div>
                  <div className="text-blue-400">const</div> <div className="text-white inline"> ContactForm = () =&gt; {`{`}</div>
                  <div className="text-white ml-2">  <div className="text-blue-400 inline">const</div> [formData, setFormData] = useState({`{`}</div>
                  <div className="text-white ml-4">    name: <div className="text-green-300 inline">''</div>,</div>
                  <div className="text-white ml-4">    email: <div className="text-green-300 inline">''</div>,</div>
                  <div className="text-white ml-4">    message: <div className="text-green-300 inline">''</div></div>
                  <div className="text-white ml-2">  {`}`});</div>

                  <div className="text-white ml-2 mt-2">  <div className="text-blue-400 inline">const</div> handleSubmit = <div className="text-blue-400 inline">async</div> (e) =&gt; {`{`}</div>
                  <div className="text-white ml-4">    e.preventDefault();</div>
                  
                  <div className="text-white ml-4 mt-2">    <div className="text-blue-400 inline">try</div> {`{`}</div>
                  <div className="text-white ml-6">      <div className="text-blue-400 inline">const</div> response = <div className="text-blue-400 inline">await</div> fetch(</div>
                  <div className="text-green-300 ml-8">        'https://jsonpost.com/api/submit/your-project-id/contact',</div>
                  <div className="text-white ml-8">        {`{`}</div>
                  <div className="text-white ml-10">          method: <div className="text-green-300 inline">'POST'</div>,</div>
                  <div className="text-white ml-10">          headers: {`{`}</div>
                  <div className="text-green-300 ml-12">            'Content-Type': 'application/json'</div>
                  <div className="text-white ml-10">          {`}`},</div>
                  <div className="text-white ml-10">          body: JSON.stringify(formData)</div>
                  <div className="text-white ml-8">        {`}`}</div>
                  <div className="text-white ml-6">      );</div>
                  
                  <div className="text-white ml-6 mt-2">      <div className="text-blue-400 inline">if</div> (response.ok) {`{`}</div>
                  <div className="text-white ml-8">        alert(<div className="text-green-300 inline">'Message sent successfully!'</div>);</div>
                  <div className="text-white ml-8">        setFormData({`{`} name: <div className="text-green-300 inline">''</div>, email: <div className="text-green-300 inline">''</div>, message: <div className="text-green-300 inline">''</div> {`}`});</div>
                  <div className="text-white ml-6">      {`}`}</div>
                  <div className="text-white ml-4">    {`}`} <div className="text-blue-400 inline">catch</div> (error) {`{`}</div>
                  <div className="text-white ml-6">      alert(<div className="text-green-300 inline">'Error sending message'</div>);</div>
                  <div className="text-white ml-4">    {`}`}</div>
                  <div className="text-white ml-2">  {`}`};</div>

                  <div className="text-white ml-2 mt-2">  <div className="text-blue-400 inline">return</div> (</div>
                  <div className="text-green-400 ml-4">    // Your JSX form here</div>
                  <div className="text-white ml-2">  );</div>
                  <div className="text-white">{`}`};</div>
                </div>
              </CardContent>
            </Card>

            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Important Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-sm">Replace "your-project-id" with your actual project ID</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-sm">Form field names become keys in your submission data</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p className="text-sm">JSONPost supports JSON, form-data, and URL-encoded submissions</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2 text-green-600" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p className="text-sm">Add a hidden "redirect" field to redirect users after submission</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p className="text-sm">Use descriptive field names for better organization</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p className="text-sm">Test your form with sample data before going live</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: Test & View Submissions */}
      <section id="step-4" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                4
              </div>
              <h2 className="text-3xl font-bold">Test Your Form & View Submissions</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg ml-14">
              Now let's test your form and see how to view and manage submissions in your dashboard.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Testing Instructions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="w-5 h-5 mr-2 text-orange-600" />
                    Testing Your Form
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-sm font-semibold text-orange-600 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Fill out your form</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Enter some test data and submit the form
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-sm font-semibold text-orange-600 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Check your email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        You should receive an email notification (if enabled)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-sm font-semibold text-orange-600 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium">View in dashboard</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Go to your JSONPost dashboard to see the submission
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-orange-600" />
                    Managing Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">View all submissions in a clean table format</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Search and filter submissions by date or content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Export submissions as CSV for analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">View detailed information including IP and user agent</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Screenshot Placeholder */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                    Screenshot: Submissions Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center mx-auto mb-4">
                        <Database className="w-8 h-8 text-orange-600" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">
                        Submissions Dashboard
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        View and manage all your form submissions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Take your forms to the next level with these powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-transparent hover:border-blue-200 transition-colors">
              <CardHeader>
                <Upload className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>File Uploads</CardTitle>
                <CardDescription>
                  Accept file uploads with automatic storage and validation. Support for images, documents, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-3 text-xs font-mono">
                  <div className="text-green-400">&lt;input type=&quot;file&quot;</div>
                  <div className="text-green-400 ml-2">name=&quot;attachment&quot;</div>
                  <div className="text-green-400 ml-2">accept=&quot;.pdf,.jpg,.png&quot; /&gt;</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-green-200 transition-colors">
              <CardHeader>
                <Webhook className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Forward submissions to Slack, Discord, Zapier, or any webhook URL for automated workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-3 text-xs font-mono">
                  <div className="text-blue-400">POST</div> <div className="text-white inline"> to webhook</div>
                  <div className="text-green-400">Content-Type: application/json</div>
                  <div className="text-white">{`{`} submission_data {`}`}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-purple-200 transition-colors">
              <CardHeader>
                <Shield className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>JSON Validation</CardTitle>
                <CardDescription>
                  Validate form submissions against custom JSON schemas to ensure data quality and structure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black rounded-lg p-3 text-xs font-mono">
                  <div className="text-blue-400">{`{`}</div>
                  <div className="text-white ml-2">&quot;type&quot;: &quot;object&quot;,</div>
                  <div className="text-white ml-2">&quot;required&quot;: [&quot;email&quot;]</div>
                  <div className="text-blue-400">{`}`}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-red-200 transition-colors">
              <CardHeader>
                <Mail className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle>Custom Email Templates</CardTitle>
                <CardDescription>
                  Customize email notifications with your own templates and branding for a professional look.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-transparent hover:border-yellow-200 transition-colors">
              <CardHeader>
                <Lock className="w-8 h-8 text-yellow-600 mb-2" />
                <CardTitle>API Key Authentication</CardTitle>
                <CardDescription>
                  Secure your endpoints with API key authentication for sensitive forms and applications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-transparent hover:border-indigo-200 transition-colors">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Track submission trends, popular form fields, and user behavior with detailed analytics.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">You're All Set! 🎉</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Congratulations! You now have a fully functional form backend. Here's what you can do next:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Customize Your Endpoint</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Add webhooks, file uploads, custom validation, and more advanced features
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Join our community or contact support if you have questions or need assistance
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/help">Get Support</Link>
              </Button>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Building Your Forms <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Free tier • No credit card required • 100 submissions/month
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Label({ children, className, ...props }: { children: React.ReactNode; className?: string; } & React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`text-sm font-medium ${className || ''}`} {...props}>
      {children}
    </label>
  );
}
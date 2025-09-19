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
  DollarSign,
  Lock,
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
              Headless Form Backend
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
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Free tier • No credit card • 100 submissions/month
            </p>
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

          {/* Framework Logos Cloud */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Works with all your favorite frameworks</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center max-w-4xl mx-auto">
              {/* React */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-blue-500 group-hover:text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">React</p>
              </div>

              {/* Vue */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-green-500 group-hover:text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2,3L12,22L22,3H18.5L12,14.5L5.5,3H2Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Vue.js</p>
              </div>

              {/* Angular */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-red-500 group-hover:text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2.5L3,6L4,17.5L12,21.5L20,17.5L21,6L12,2.5M12,4.5L18.5,7L17.7,16.5L12,19.5L6.3,16.5L5.5,7L12,4.5M12,6.5L8.5,15.5H10.25L11,13.5H13L13.75,15.5H15.5L12,6.5M12,9.5L13,12H11L12,9.5Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Angular</p>
              </div>

              {/* Django */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-green-700 group-hover:text-green-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.146,0.955A11.055,11.055,0,0,0,.09,12.009,11.055,11.055,0,0,0,11.146,23.064,11.055,11.055,0,0,0,22.2,12.009,11.055,11.055,0,0,0,11.146.955ZM7.3,19.266c-.4,0-.818-.061-1.146-.122V14.6c.328.061.736.122,1.146.122A2.4,2.4,0,0,1,9.834,17.2,2.4,2.4,0,0,1,7.3,19.266Zm0-6.1c-.41,0-.818-.061-1.146-.122V8.5c.328-.061.736-.122,1.146-.122A2.4,2.4,0,0,1,9.834,10.9,2.4,2.4,0,0,1,7.3,13.166Zm9.225,6.1c-.4,0-.818-.061-1.146-.122V14.6c.328.061.736.122,1.146.122A2.4,2.4,0,0,1,19.059,17.2,2.4,2.4,0,0,1,16.525,19.266Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Django</p>
              </div>

              {/* Flask */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-gray-700 group-hover:text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Flask</p>
              </div>

              {/* FastAPI */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-teal-500 group-hover:text-teal-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6L15.5,10.5L12,15L8.5,10.5L12,6Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">FastAPI</p>
              </div>

              {/* Next.js */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6L16,10L12,14L8,10L12,6Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Next.js</p>
              </div>

              {/* Nuxt.js */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-green-500 group-hover:text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.146.955A11.055,11.055,0,0,0,1.09,12.009,11.055,11.055,0,0,0,12.146,23.064,11.055,11.055,0,0,0,23.2,12.009,11.055,11.055,0,0,0,12.146.955ZM7.5,19.5L4.5,14.5L10.5,14.5L7.5,19.5ZM16.5,19.5L13.5,14.5L19.5,14.5L16.5,19.5ZM12,4.5L15,9.5L9,9.5L12,4.5Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Nuxt.js</p>
              </div>

              {/* Svelte */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-orange-500 group-hover:text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.354 21.125a2.847 2.847 0 0 0 4.539.853 2.847 2.847 0 0 0 .853-4.539L9.708 11.4a2.847 2.847 0 0 0-4.539-.853 2.847 2.847 0 0 0-.853 4.539l6.038 6.039zm3.292-9.708a2.847 2.847 0 0 0 4.539-.853 2.847 2.847 0 0 0-.853-4.539L11.292 0a2.847 2.847 0 0 0-4.539.853 2.847 2.847 0 0 0 .853 4.539l6.04 6.025z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Svelte</p>
              </div>

              {/* Laravel */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-red-500 group-hover:text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.02c-.01.003-.021.005-.032.005-.05 0-.102-.015-.146-.04L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033.012.009.025.018.037.027.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.030.033-.043.012-.012.025-.02.037-.027.014-.013.026-.023.041-.034h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.027.013.014.022.03.034.046.008.012.018.02.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Laravel</p>
              </div>

              {/* Express.js */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-gray-700 group-hover:text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24,18.588a1.529,1.529,0,0,1-1.895-.72l-3.45-4.771-.5-.667-4.003,5.444a1.466,1.466,0,0,1-1.802.708A1.4,1.4,0,0,1,11.708,17a1.8,1.8,0,0,1,.384-1.188l5.353-7.284-4.91-6.526a1.686,1.686,0,0,1,.028-2.304A1.618,1.618,0,0,1,14.88.68L18.22,6.01,21.560.68a1.618,1.618,0,0,1,2.316.028,1.686,1.686,0,0,1,.028,2.304l-4.91,6.526,5.353,7.284a1.8,1.8,0,0,1,.384,1.188A1.4,1.4,0,0,1,24,18.588Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Express.js</p>
              </div>

              {/* Node.js */}
              <div className="group cursor-pointer transition-transform hover:scale-110">
                <svg className="w-12 h-12 text-green-600 group-hover:text-green-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1.85C11.73,1.85 11.45,1.92 11.22,2.05L3.78,6.35C3.32,6.61 3.07,7.11 3.07,7.65V16.35C3.07,16.89 3.32,17.39 3.78,17.65L11.22,21.95C11.45,22.08 11.73,22.15 12,22.15C12.27,22.15 12.55,22.08 12.78,21.95L20.22,17.65C20.68,17.39 20.93,16.89 20.93,16.35V7.65C20.93,7.11 20.68,6.61 20.22,6.35L12.78,2.05C12.55,1.92 12.27,1.85 12,1.85M12,3.05L18.9,7L12,10.95L5.1,7L12,3.05M4.27,8.2L11,12V20.9L4.27,16.8V8.2M19.73,8.2V16.8L13,20.9V12L19.73,8.2Z"/>
                </svg>
                <p className="text-sm mt-2 font-medium">Node.js</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-8 text-lg">
              And many more! JSONPost works with any technology that can make HTTP requests.
            </p>
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
                <div className="bg-black rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-hidden">
                  <div className="text-blue-400 break-all">&lt;form</div>
                  <div className="text-blue-400 ml-2 break-all">
                    action=&quot;{process.env.NEXT_PUBLIC_APP_URL}
                  </div>
                  <div className="text-blue-400 ml-4 break-all">
                    /api/submit/your-id/contact&quot;
                  </div>
                  <div className="text-blue-400 ml-2">
                    method=&quot;POST&quot;&gt;
                  </div>
                  <div className="text-green-400 ml-2 break-all">
                    &lt;input name=&quot;email&quot; required /&gt;
                  </div>
                  <div className="text-green-400 ml-2 break-all">
                    &lt;textarea name=&quot;message&quot;&gt;&lt;/textarea&gt;
                  </div>
                  <div className="text-yellow-400 ml-2 break-all">
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
                <div className="bg-black rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-hidden">
                  <div className="text-purple-400 break-all">
                    const response = await fetch(
                  </div>
                  <div className="text-green-400 ml-2 break-all">
                    &apos;{process.env.NEXT_PUBLIC_APP_URL}
                  </div>
                  <div className="text-green-400 ml-4 break-all">
                    /api/submit/your-id/contact&apos;,
                  </div>
                  <div className="text-blue-400 ml-2">{`{`}</div>
                  <div className="text-blue-400 ml-4">
                    method: &apos;POST&apos;,
                  </div>
                  <div className="text-blue-400 ml-4 break-all">
                    headers: {`{`} &apos;Content-Type&apos;:
                  </div>
                  <div className="text-blue-400 ml-6 break-all">
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
                <div className="bg-black rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-hidden">
                  <div className="text-yellow-400">curl -X POST \</div>
                  <div className="text-green-400 ml-2 break-all">
                    {process.env.NEXT_PUBLIC_APP_URL}/api/submit/
                  </div>
                  <div className="text-green-400 ml-4 break-all">
                    your-id/contact \
                  </div>
                  <div className="text-blue-400 ml-2 break-all">
                    -H &quot;Content-Type: application/json&quot; \
                  </div>
                  <div className="text-purple-400 ml-2 break-all">
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
                <div className="bg-black rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-mono overflow-hidden">
                  <div className="text-blue-400">{`{`}</div>
                  <div className="text-green-400 ml-2 break-all">
                    &quot;success&quot;: true,
                  </div>
                  <div className="text-green-400 ml-2 break-all">
                    &quot;message&quot;: &quot;Submission received&quot;,
                  </div>
                  <div className="text-yellow-400 ml-2 break-all">
                    &quot;id&quot;: &quot;uuid-here&quot;
                  </div>
                  <div className="text-blue-400">{`}`}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Perfect For
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Use Cases</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From simple contact forms to complex workflows, JSONPost handles
              all your form submission needs with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* HTML Form Notifications */}
            <Card className="border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">
                  HTML Form Notifications
                </CardTitle>
                <CardDescription>
                  Serverless HTML form notifications. Submit JSON effortlessly
                  handles submissions, storage, and notifications for your HTML
                  forms. Perfect for static sites and landing pages.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Contact Forms */}
            <Card className="border-2 border-transparent hover:border-green-200 dark:hover:border-green-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Contact Us Forms</CardTitle>
                <CardDescription>
                  Perfect for HTML contact us form notifications. Get instant
                  email alerts when customers reach out through your website.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* User Feedback */}
            <Card className="border-2 border-transparent hover:border-yellow-200 dark:hover:border-yellow-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">User Feedback</CardTitle>
                <CardDescription>
                  Receive customer reviews and feedback ratings. Collect
                  valuable insights from your users to improve your products and
                  services.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Surveys & Quizzes */}
            <Card className="border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Surveys & Quizzes</CardTitle>
                <CardDescription>
                  Collect responses from your audience. Create engaging surveys
                  and quizzes to gather data and insights from your users.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Support Tickets */}
            <Card className="border-2 border-transparent hover:border-red-200 dark:hover:border-red-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <HelpCircle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Support Tickets</CardTitle>
                <CardDescription>
                  Get alerted when a user submits a support ticket. Provide
                  timely customer support with instant notifications.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Sign-up Tracking */}
            <Card className="border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserPlus className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-lg">Sign-up Tracking</CardTitle>
                <CardDescription>
                  Notifications for each new user account creation. Stay
                  informed about your growing user base with real-time alerts.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Payment Updates */}
            <Card className="border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-lg">Payment Updates</CardTitle>
                <CardDescription>
                  Get alerted for changes in user subscription status. Monitor
                  payment events and subscription changes in real-time.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* User Milestones */}
            <Card className="border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">User Milestones</CardTitle>
                <CardDescription>
                  Notifications for user behaviors & milestones. Track important
                  user achievements and engagement events.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Website Errors */}
            <Card className="border-2 border-transparent hover:border-rose-200 dark:hover:border-rose-700 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-6 h-6 text-rose-600" />
                </div>
                <CardTitle className="text-lg">Website Errors</CardTitle>
                <CardDescription>
                  Get notified of specific errors in your website. Monitor and
                  respond to critical issues before they impact users.
                </CardDescription>
              </CardHeader>
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

      {/* Made for Pros Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Users className="w-4 h-4 mr-1" />
              Made for Pros
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Pushing to Production</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Why developer teams prefer JSONPost
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Versatility */}
            <Card className="border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg group text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Versatility</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Powerful form backend, modern notification API that works
                  server-side and in the browser.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Affordability */}
            <Card className="border-2 border-transparent hover:border-green-200 dark:hover:border-green-700 transition-all duration-300 hover:shadow-lg group text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Affordability</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Generous usage limits and free tier with zero compromises.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Security */}
            <Card className="border-2 border-transparent hover:border-red-200 dark:hover:border-red-700 transition-all duration-300 hover:shadow-lg group text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Security</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Fight spam & bots with multiple security layers. The only form
                  backend secured by API key.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Simplicity */}
            <Card className="border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-lg group text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Simplicity</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Make a typesafe submission in one line of code with the JS
                  Client. Easy as pie.
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
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="hover:text-white">
                    Refund Policy
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

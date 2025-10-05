/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import {
  Code,
  Copy,
  ExternalLink,
  Zap,
  MessageSquare,
  SidebarOpen,
  MousePointer,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmbedDocumentationPage() {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    toast({
      title: "Copied to clipboard",
      description: `${label} code copied successfully`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const embedTypes = [
    {
      id: "modal",
      name: "Modal Popup",
      icon: <Zap className="h-5 w-5" />,
      description:
        "Opens a centered modal dialog with your form. Perfect for capturing attention without leaving the page.",
      code: `<script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>
<script>
  const modal = FormEmbed.createModal('your-form-id', {
    theme: 'bumblebee',
    width: 800,
    height: 600
  });
  
  // Call modal.open() when you want to show the form
  modal.open();
</script>`,
    },
    {
      id: "chatbox",
      name: "Floating Chatbox",
      icon: <MessageSquare className="h-5 w-5" />,
      description:
        "Floating chat icon that opens a popover window. Great for support forms and feedback collection.",
      code: `<script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>
<script>
  FormEmbed.createChatbox('your-form-id', {
    theme: 'bumblebee',
    position: 'bottom-right',
    buttonColor: '#3a7685',
    width: 400,
    height: 600
  });
</script>`,
    },
    {
      id: "drawer",
      name: "Side Drawer",
      icon: <SidebarOpen className="h-5 w-5" />,
      description:
        "Slides in from left or right side of the screen. Ideal for detailed forms that need more space.",
      code: `<script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>
<script>
  FormEmbed.createDrawer('your-form-id', {
    theme: 'bumblebee',
    side: 'right',
    width: 500,
    buttonText: 'Open Form',
    buttonColor: '#3a7685'
  });
</script>`,
    },
    {
      id: "button",
      name: "Button Trigger",
      icon: <MousePointer className="h-5 w-5" />,
      description:
        "Attach the form to any existing button on your website. The form opens as a modal when clicked.",
      code: `<button id="my-form-button">Open Form</button>

<script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>
<script>
  FormEmbed.createButton('your-form-id', {
    theme: 'bumblebee',
    buttonSelector: '#my-form-button',
    openAs: 'modal',
    width: 800,
    height: 600
  });
</script>`,
    },
  ];

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4"></div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              FormEmbed SDK Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Embed your JSONPost forms anywhere with a simple JavaScript
              snippet. Choose from multiple embed types and customize the
              appearance to match your website.
            </p>
          </div>

          {/* Quick Start */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-emerald-600" />
                Quick Start
              </CardTitle>
              <CardDescription>
                Get started in seconds by adding the SDK to your HTML
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <code className="text-emerald-400 text-sm">
                  &lt;script
                  src="https://forms.jsonpost.com/embed/v1/embed.js"&gt;&lt;/script&gt;
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() =>
                    copyToClipboard(
                      '<script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>',
                      "SDK Script"
                    )
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Embed Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Embed Types
            </h2>
            <Tabs defaultValue="modal" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                {embedTypes.map((type) => (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    className="flex items-center gap-2"
                  >
                    {type.icon}
                    <span className="hidden sm:inline">{type.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {embedTypes.map((type) => (
                <TabsContent key={type.id} value={type.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {type.icon}
                        <span className="ml-2">{type.name}</span>
                      </CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 rounded-lg p-4 relative">
                        <pre className="text-emerald-400 text-sm overflow-x-auto">
                          <code>{type.code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 text-gray-400 hover:text-white"
                          onClick={() => copyToClipboard(type.code, type.name)}
                        >
                          {copiedCode === type.name ? (
                            <span className="text-emerald-400">Copied!</span>
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Configuration Options */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Configuration Options
            </h2>
            <div className="grid gap-6">
              {/* Modal Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Modal Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">
                            Option
                          </th>
                          <th className="text-left p-3 font-semibold">Type</th>
                          <th className="text-left p-3 font-semibold">
                            Default
                          </th>
                          <th className="text-left p-3 font-semibold">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">theme</td>
                          <td className="p-3">string</td>
                          <td className="p-3">'light'</td>
                          <td className="p-3">DaisyUI theme name</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">width</td>
                          <td className="p-3">number|string</td>
                          <td className="p-3">800</td>
                          <td className="p-3">Modal width (px or %)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">height</td>
                          <td className="p-3">number|string</td>
                          <td className="p-3">600</td>
                          <td className="p-3">Modal height (px or vh)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Chatbox Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Chatbox Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">
                            Option
                          </th>
                          <th className="text-left p-3 font-semibold">Type</th>
                          <th className="text-left p-3 font-semibold">
                            Default
                          </th>
                          <th className="text-left p-3 font-semibold">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">theme</td>
                          <td className="p-3">string</td>
                          <td className="p-3">'light'</td>
                          <td className="p-3">DaisyUI theme name</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">position</td>
                          <td className="p-3">string</td>
                          <td className="p-3">'bottom-right'</td>
                          <td className="p-3">
                            'bottom-right' or 'bottom-left'
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">buttonIcon</td>
                          <td className="p-3">string</td>
                          <td className="p-3">(default)</td>
                          <td className="p-3">URL to custom icon image</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">buttonColor</td>
                          <td className="p-3">string</td>
                          <td className="p-3">'#3a7685'</td>
                          <td className="p-3">Button background color</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">width</td>
                          <td className="p-3">number|string</td>
                          <td className="p-3">400</td>
                          <td className="p-3">Window width</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-mono text-sm">height</td>
                          <td className="p-3">number|string</td>
                          <td className="p-3">600</td>
                          <td className="p-3">Window height</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Available Themes */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Available Themes</CardTitle>
              <CardDescription>
                Use any DaisyUI theme name to style your embedded forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {themes.map((theme) => (
                  <Badge
                    key={theme}
                    variant="secondary"
                    className="justify-center py-2"
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Complete Examples */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Complete Examples
            </h2>
            <div className="space-y-6">
              {/* Example 1 */}
              <Card>
                <CardHeader>
                  <CardTitle>Example 1: Modal on Button Click</CardTitle>
                  <CardDescription>
                    Complete HTML page with a button that opens a modal form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <pre className="text-emerald-400 text-sm overflow-x-auto">
                      <code>{`<!DOCTYPE html>
<html>
<head>
  <title>Customer Feedback</title>
</head>
<body>
  <h1>Welcome to Our Site</h1>
  <button id="feedback-btn">Give Feedback</button>
  
  <script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>
  <script>
    const modal = FormEmbed.createModal('your-form-id', {
      theme: 'bumblebee',
      width: 700,
      height: '80vh'
    });
    
    document.getElementById('feedback-btn').onclick = () => modal.open();
  </script>
</body>
</html>`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() =>
                        copyToClipboard(
                          `<!DOCTYPE html>
<html>
<head>
  <title>Customer Feedback</title>
</head>
<body>
  <h1>Welcome to Our Site</h1>
  <button id="feedback-btn">Give Feedback</button>
  
  <script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>
  <script>
    const modal = FormEmbed.createModal('your-form-id', {
      theme: 'bumblebee',
      width: 700,
      height: '80vh'
    });
    
    document.getElementById('feedback-btn').onclick = () => modal.open();
  </script>
</body>
</html>`,
                          "Complete Example"
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Example 2 */}
              <Card>
                <CardHeader>
                  <CardTitle>Example 2: Auto-Open Modal After Delay</CardTitle>
                  <CardDescription>
                    Automatically show a form modal after a few seconds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <pre className="text-emerald-400 text-sm overflow-x-auto">
                      <code>{`<script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>
<script>
  // Open modal after 3 seconds
  setTimeout(() => {
    FormEmbed.createModal('your-form-id', {
      theme: 'corporate',
      width: '80%',
      height: 600
    }).open();
  }, 3000);
</script>`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() =>
                        copyToClipboard(
                          `<script src="https://forms.jsonpost.com/embed/v1/embed.js"></script>
<script>
  // Open modal after 3 seconds
  setTimeout(() => {
    FormEmbed.createModal('your-form-id', {
      theme: 'corporate',
      width: '80%',
      height: 600
    }).open();
  }, 3000);
</script>`,
                          "Auto-Open Example"
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile Behavior */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Mobile Behavior</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-800 dark:text-yellow-200">
                  <strong>Important:</strong> On mobile devices (width &lt;
                  768px), all embed modes automatically convert to fullscreen
                  modals. Borders and rounded corners are removed for
                  edge-to-edge display.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* API Methods */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>API Methods</CardTitle>
              <CardDescription>
                Control your embedded forms programmatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Modal Methods</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-emerald-400 text-sm">
                      <code>{`const modal = FormEmbed.createModal(formId, options);

modal.open();    // Open the modal
modal.close();   // Close the modal
modal.toggle();  // Toggle open/closed state`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Chatbox Methods</h4>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-emerald-400 text-sm">
                      <code>{`const chatbox = FormEmbed.createChatbox(formId, options);

chatbox.open();    // Open the chatbox window
chatbox.close();   // Close the chatbox window
chatbox.toggle();  // Toggle open/closed state
chatbox.destroy(); // Remove chatbox and button from page`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <strong>Load SDK once:</strong> Include the script tag only
                  once per page
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <strong>Wait for DOM:</strong> Initialize embeds after DOM is
                  ready or use{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                    defer
                  </code>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <strong>Mobile-first:</strong> Test on mobile - embeds
                  auto-adapt to fullscreen
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <strong>Theme consistency:</strong> Match form theme to your
                  site design
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <strong>Performance:</strong> Lazy load embeds (don't
                  auto-open immediately)
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <strong>User experience:</strong> Don't show modal immediately
                  on page load
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Form not loading?</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Verify your form ID is correct</li>
                    <li>• Check browser console for errors</li>
                    <li>• Ensure the SDK script loads before your code</li>
                    <li>• Check if your page blocks iframes (CSP headers)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Modal not centered?</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>
                      • Try percentage-based dimensions:{" "}
                      <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                        width: '80%'
                      </code>
                    </li>
                    <li>• Check for CSS conflicts (z-index, position)</li>
                    <li>
                      • Verify no parent elements have{" "}
                      <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                        overflow: hidden
                      </code>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Embed Your Forms?
                </h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  Start building beautiful forms with JSONPost and embed them
                  anywhere on the web with our powerful SDK.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => window.open("/dashboard", "_blank")}
                    className="bg-white text-emerald-600 hover:bg-gray-100"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open("/docs", "_blank")}
                    className="border-white bg-transparent text-white hover:bg-white hover:text-emerald-600"
                  >
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

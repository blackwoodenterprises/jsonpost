"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { HelpCircle, Send, ChevronDown, ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "How do I get started with JSONPost?",
    answer: "Getting started is easy! Simply sign up for an account, create your first project, and you'll get a unique endpoint URL. You can then start sending form submissions to this endpoint from your website or application."
  },
  {
    question: "What happens to my form submissions?",
    answer: "All form submissions are securely stored in your JSONPost dashboard where you can view, manage, and export them. You can also set up email notifications to be alerted when new submissions arrive."
  },
  {
    question: "Is there a free plan available?",
    answer: "Yes! We offer a generous free plan that includes 50 form submissions per month. This is perfect for personal projects, portfolios, or small websites."
  },
  {
    question: "Can I customize the response after form submission?",
    answer: "Absolutely! You can customize the success page, redirect users to a specific URL, or return custom JSON responses. All of this can be configured in your project settings."
  },
  {
    question: "How do I prevent spam submissions?",
    answer: "JSONPost includes built-in spam protection features including rate limiting, honeypot fields, and the ability to block specific IP addresses or domains."
  },
  {
    question: "Can I integrate JSONPost with other tools?",
    answer: "Yes! JSONPost supports webhooks, so you can integrate with tools like Slack, Discord, Zapier, or any other service that accepts webhook notifications."
  },
  {
    question: "What file types can I accept in form uploads?",
    answer: "You can accept most common file types including images (JPG, PNG, GIF), documents (PDF, DOC, TXT), and more. File size limits depend on your plan."
  },
  {
    question: "How do I upgrade or downgrade my plan?",
    answer: "You can change your plan anytime from your dashboard billing section. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle."
  }
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* FAQs Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to the most common questions about JSONPost
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <button
                    className="flex items-center justify-between w-full text-left py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Contact Support</CardTitle>
            <CardDescription>
              Can&apos;t find what you&apos;re looking for? Send us a message and we&apos;ll get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200">
                  Thank you for your message! We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200">
                  Sorry, there was an error sending your message. Please try again.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Please describe your question or issue in detail..."
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
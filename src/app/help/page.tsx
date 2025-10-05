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
import { HelpCircle, Send, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-slate-100/50 opacity-40"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-4 py-2 text-sm font-medium">
              <HelpCircle className="w-4 h-4 mr-2" />
              Support Center
            </Badge>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Help Center
            <Sparkles className="inline-block w-8 h-8 ml-3 text-emerald-500" />
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

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
                <div key={index} className="border-b border-slate-200 dark:border-slate-700 pb-4">
                  <button
                    className="flex items-center justify-between w-full text-left py-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
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
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <p className="text-emerald-800 dark:text-emerald-200">
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
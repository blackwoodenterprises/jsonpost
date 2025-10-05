"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FormGeneratorWizard } from "@/components/form-generator/form-generator-wizard";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function HtmlFormGeneratorClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Free Tool
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-800 dark:from-white dark:via-emerald-400 dark:to-slate-200 bg-clip-text text-transparent">
              HTML Form Generator
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Create beautiful, functional forms in minutes. Choose from templates, 
              customize fields, select themes, and get ready-to-use code that works 
              perfectly with JSONPost.
            </p>
          </div>

          <FormGeneratorWizard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
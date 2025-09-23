"use client";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FormGeneratorWizard } from "@/components/form-generator/form-generator-wizard";

export default function FormGeneratorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Free HTML Form Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create beautiful, functional forms in minutes. Choose from
              templates, customize fields, select themes, and get ready-to-use
              code.
            </p>
          </div>

          <FormGeneratorWizard />
        </div>
      </main>

      <Footer />
    </div>
  );
}

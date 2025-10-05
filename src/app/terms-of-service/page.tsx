import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Scale, Sparkles } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />
      
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-emerald-900/5 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-slate-800/50 text-slate-200 border-slate-700 hover:bg-slate-700/50">
              <Scale className="w-3 h-3 mr-1.5" />
              Legal Terms
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Terms of Service
              <Sparkles className="inline-block w-8 h-8 md:w-12 md:h-12 ml-3 text-emerald-400" />
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Clear, fair terms that govern your use of JSONPost. We believe in transparency and building trust through straightforward policies.
            </p>
            <div className="mt-8 text-sm text-slate-400">
              Last updated: December 2024
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="shadow-xl border-slate-200 dark:border-slate-800">
          <CardContent className="prose prose-slate dark:prose-invert max-w-none p-8 lg:p-12">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  By accessing and using JSONPost, you accept and agree to be
                  bound by the terms and provision of this agreement. If you do
                  not agree to abide by the above, please do not use this
                  service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. Description of Service
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  JSONPost is a form backend service that allows developers to
                  collect form submissions without building their own backend
                  infrastructure. We provide endpoints for form data collection,
                  storage, and basic analytics.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. User Accounts
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  To use our service, you must create an account. You are
                  responsible for:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  4. Acceptable Use
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  You agree not to use the service to:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>
                    Collect sensitive personal information without proper
                    consent
                  </li>
                  <li>Send spam or unsolicited communications</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with or disrupt the service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  5. Data and Privacy
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Your use of JSONPost is also governed by our Privacy Policy.
                  We are committed to protecting your data and the data you
                  collect through our service. Please review our Privacy Policy
                  to understand how we handle data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  6. Service Availability
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  While we strive to maintain high availability, we do not
                  guarantee uninterrupted service. We may temporarily suspend
                  the service for maintenance, updates, or other operational
                  reasons.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  JSONPost shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other
                  intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We may terminate or suspend your account and access to the
                  service immediately, without prior notice, for conduct that we
                  believe violates these Terms of Service or is harmful to other
                  users or the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  9. Changes to Terms
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We reserve the right to modify these terms at any time. We
                  will notify users of significant changes via email or through
                  the service. Continued use of the service after changes
                  constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  10. Contact Information
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  If you have any questions about these Terms of Service, please
                  contact us at{" "}
                  <a
                    href="mailto:support@jsonpost.com"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    support@jsonpost.com
                  </a>
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Shield, Sparkles } from "lucide-react";

export { metadata } from "./metadata";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-slate-100/50 opacity-40"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-4 py-2 text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Privacy & Security
            </Badge>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Privacy Policy
            <Sparkles className="inline-block w-8 h-8 ml-3 text-emerald-500" />
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Last updated: December 2024
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Privacy Policy Details</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  1. Information We Collect
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  We collect information you provide directly to us, such as
                  when you create an account, use our services, or contact us
                  for support. This may include:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Account information (email address, name)</li>
                  <li>Form data submitted through your endpoints</li>
                  <li>Usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze usage patterns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. Information Sharing
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except as
                  described in this policy. We may share information in the
                  following circumstances:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2 mt-3">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers who assist in our operations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  4. Data Security
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. This includes
                  encryption of data in transit and at rest, regular security
                  assessments, and access controls.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  5. Data Retention
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We retain your information for as long as your account is
                  active or as needed to provide services. We will delete or
                  anonymize your information when it is no longer necessary for
                  the purposes outlined in this policy, unless we are required
                  to retain it by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  Depending on your location, you may have certain rights
                  regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your information</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  7. Cookies and Tracking
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We use cookies and similar tracking technologies to collect
                  information about your browsing activities. These help us
                  provide and improve our services, remember your preferences,
                  and analyze usage patterns. You can control cookie settings
                  through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  8. Third-Party Services
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Our service may contain links to third-party websites or
                  integrate with third-party services. We are not responsible
                  for the privacy practices of these third parties. We encourage
                  you to review their privacy policies before providing any
                  information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  9. International Data Transfers
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place to protect your information in
                  accordance with this privacy policy and applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  10. Changes to This Policy
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We may update this privacy policy from time to time. We will
                  notify you of any material changes by posting the new policy
                  on this page and updating the &ldquo;Last updated&rdquo; date.
                  We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us at{" "}
                  <a
                    href="mailto:privacy@jsonpost.com"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    privacy@jsonpost.com
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
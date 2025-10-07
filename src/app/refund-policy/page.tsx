import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { RefreshCw, Sparkles } from "lucide-react";

export { metadata } from "./metadata";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />
      
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-emerald-900/5 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-slate-800/50 text-slate-200 border-slate-700 hover:bg-slate-700/50">
              <RefreshCw className="w-3 h-3 mr-1.5" />
              Money-Back Guarantee
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Refund Policy
              <Sparkles className="inline-block w-8 h-8 md:w-12 md:h-12 ml-3 text-emerald-400" />
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We stand behind our service with a 30-day money-back guarantee. Your satisfaction is our priority.
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
                  1. Refund Eligibility
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We want you to be satisfied with JSONPost. If you&rsquo;re not
                  completely satisfied with our service, you may be eligible for
                  a refund under the conditions outlined in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. 30-Day Money-Back Guarantee
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We offer a 30-day money-back guarantee for new subscribers. If
                  you&rsquo;re not satisfied with our service within the first
                  30 days of your subscription, you can request a full refund.
                  This applies to your first billing cycle only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  3. Refund Conditions
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  To be eligible for a refund, the following conditions must be
                  met:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>
                    The refund request is made within 30 days of the initial
                    purchase
                  </li>
                  <li>You have not violated our Terms of Service</li>
                  <li>Your account is in good standing</li>
                  <li>You provide a valid reason for the refund request</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  4. Non-Refundable Items
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  The following items are not eligible for refunds:
                </p>
                <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Subscription renewals after the initial 30-day period</li>
                  <li>Partial months of service</li>
                  <li>
                    Add-on services or premium features purchased separately
                  </li>
                  <li>Accounts terminated for Terms of Service violations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  5. How to Request a Refund
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>
                    Contact our support team at{" "}
                    <a
                      href="mailto:support@jsonpost.com"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      support@jsonpost.com
                    </a>
                  </li>
                  <li>Include your account email and subscription details</li>
                  <li>Provide a reason for your refund request</li>
                  <li>
                    Allow up to 5 business days for our team to review your
                    request
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  6. Refund Processing
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Once your refund request is approved, we will process the
                  refund to your original payment method within 5-10 business
                  days. The exact timing may vary depending on your payment
                  provider. You will receive an email confirmation once the
                  refund has been processed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  7. Service Cancellation
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  You can cancel your subscription at any time through your
                  account dashboard. Cancellation will prevent future billing,
                  but you will retain access to the service until the end of
                  your current billing period. Cancellation does not
                  automatically qualify for a refund unless within the 30-day
                  guarantee period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  8. Downgrade Policy
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  If you downgrade your plan, the change will take effect at the
                  start of your next billing cycle. We do not provide prorated
                  refunds for downgrades, but you will continue to have access
                  to your current plan features until the billing period ends.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  9. Dispute Resolution
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  If you have a billing dispute or are unsatisfied with our
                  refund decision, please contact our support team first. We are
                  committed to resolving issues fairly and promptly. If we
                  cannot reach a satisfactory resolution, you may pursue other
                  legal remedies available to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  10. Policy Changes
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  We may update this refund policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date. Changes to this policy will not affect refund requests
                  made before the policy change.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  11. Contact Information
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  For questions about this refund policy or to request a refund,
                  please contact us at{" "}
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

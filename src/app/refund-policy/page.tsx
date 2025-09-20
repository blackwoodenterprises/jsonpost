import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Refund Policy</CardTitle>
            <CardDescription>Last updated: December 2024</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  1. Refund Eligibility
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We want you to be satisfied with JSONPost. If you&rsquo;re not
                  completely satisfied with our service, you may be eligible for
                  a refund under the conditions outlined in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  2. 30-Day Money-Back Guarantee
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  To be eligible for a refund, the following conditions must be
                  met:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  The following items are not eligible for refunds:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>
                    Contact our support team at{" "}
                    <a
                      href="mailto:support@jsonpost.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For questions about this refund policy or to request a refund,
                  please contact us at{" "}
                  <a
                    href="mailto:support@jsonpost.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
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

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import {
  getUserUsage,
  getUserProfile,
  type UserUsage,
  type UserProfile,
} from "@/lib/billing";
import {
  PLANS,
  getPlanById,
  getUsagePercentage,
} from "@/lib/plans";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  TrendingUp,
  Globe,
  Mail,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";

export default function BillingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<UserUsage | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBillingData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const [usageData, profileData] = await Promise.all([
        getUserUsage(user.id),
        getUserProfile(user.id),
      ]);

      setUsage(usageData);
      setProfile(profileData);
    } catch (err) {
      console.error("Error fetching billing data:", err);
      setError("Failed to load billing information");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchBillingData();
    }
  }, [user, fetchBillingData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Loading billing information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !usage || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || "Failed to load billing information"}
            </h1>
            <Button onClick={fetchBillingData}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  const currentPlan = getPlanById(profile.plan);
  const projectsPercentage = getUsagePercentage(
    usage.projects,
    currentPlan.limits.projects
  );
  const endpointsPercentage = getUsagePercentage(
    usage.endpoints,
    currentPlan.limits.endpoints
  );
  const submissionsPercentage = getUsagePercentage(
    usage.submissions,
    currentPlan.limits.submissions
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Billing & Usage"
        subtitle="Manage your subscription and monitor your usage"
        actions={
          <Button asChild>
            <Link href="/dashboard">
              Back to Dashboard
            </Link>
          </Button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Usage Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Current Usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Projects Usage */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {usage.projects} /{" "}
                  {currentPlan.limits.projects === Infinity
                    ? "∞"
                    : currentPlan.limits.projects}
                </div>
                {currentPlan.limits.projects !== Infinity && (
                  <Progress value={projectsPercentage} className="mb-2" />
                )}
                <p className="text-xs text-muted-foreground">
                  {currentPlan.limits.projects === Infinity
                    ? "Unlimited projects"
                    : `${Math.round(projectsPercentage)}% of limit used`}
                </p>
              </CardContent>
            </Card>

            {/* Endpoints Usage */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Endpoints</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {usage.endpoints} /{" "}
                  {currentPlan.limits.endpoints === Infinity
                    ? "∞"
                    : currentPlan.limits.endpoints}
                </div>
                {currentPlan.limits.endpoints !== Infinity && (
                  <Progress value={endpointsPercentage} className="mb-2" />
                )}
                <p className="text-xs text-muted-foreground">
                  {currentPlan.limits.endpoints === Infinity
                    ? "Unlimited endpoints"
                    : `${Math.round(endpointsPercentage)}% of limit used`}
                </p>
              </CardContent>
            </Card>

            {/* Submissions Usage */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Submissions
                </CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {usage.submissions} /{" "}
                  {currentPlan.limits.submissions === Infinity
                    ? "∞"
                    : currentPlan.limits.submissions}
                </div>
                {currentPlan.limits.submissions !== Infinity && (
                  <Progress value={submissionsPercentage} className="mb-2" />
                )}
                <p className="text-xs text-muted-foreground">
                  {currentPlan.limits.submissions === Infinity
                    ? "Unlimited submissions"
                    : `${Math.round(submissionsPercentage)}% of limit used`}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Plans Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Available Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(PLANS).map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  profile.plan === plan.id
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950"
                    : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    {plan.popular && (
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {profile.plan === plan.id && (
                      <Badge
                        variant="default"
                        className="bg-blue-100 text-blue-800"
                      >
                        Current
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.priceDisplay}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.contactUs ? (
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/help" target="_blank" rel="noopener noreferrer">
                        Contact Sales
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  ) : profile.plan === plan.id ? (
                    <Button className="w-full" variant="outline" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button className="w-full" asChild>
                      <Link href="/dashboard">
                        {profile.plan === "FREE" ? "Upgrade" : "Change Plan"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing Information */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Billing Information
              </CardTitle>
              <CardDescription>
                Manage your payment methods and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current Plan</p>
                    <p className="text-sm text-muted-foreground">
                      {currentPlan.name} - {currentPlan.priceDisplay}
                    </p>
                  </div>
                  {!currentPlan.contactUs && currentPlan.price > 0 && (
                    <Badge variant="outline">Active</Badge>
                  )}
                </div>

                {currentPlan.price > 0 && (
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="mr-4">
                      Update Payment Method
                    </Button>
                    <Button variant="outline">Download Invoices</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

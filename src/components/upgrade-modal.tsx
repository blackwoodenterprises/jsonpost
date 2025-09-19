"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, ArrowRight } from "lucide-react";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { PLANS } from "@/lib/plans";
import type { LimitCheckResult } from "@/lib/billing";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  limitType: "projects" | "endpoints";
  limitResult: LimitCheckResult;
}

export function UpgradeModal({
  isOpen,
  onClose,
  limitType,
  limitResult,
}: UpgradeModalProps) {
  const router = useRouter();
  const { currentCount, limit, planType } = limitResult;

  const handleClose = () => {
    onClose();
    // Navigate back to the previous page
    router.back();
  };

  // Get suggested plans (plans with higher limits than current)
  const currentPlan = PLANS[planType];
  const suggestedPlans = Object.entries(PLANS)
    .filter(
      ([, plan]) => plan.limits[limitType] > currentPlan.limits[limitType]
    )
    .sort((a, b) => a[1].limits[limitType] - b[1].limits[limitType]);

  const resourceNamePlural =
    limitType === "projects" ? "projects" : "endpoints";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Upgrade Required" size="lg">
      <div className="space-y-6">
        {/* Current Status */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {limitType === "projects" ? "Project" : "Endpoint"} Limit Reached
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            You&apos;ve reached your {currentPlan.name} plan limit of {limit}{" "}
            {resourceNamePlural}. You currently have {currentCount}{" "}
            {resourceNamePlural}.
          </p>
        </div>

        {/* Current Plan Info */}
        <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Current Plan: {currentPlan.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {currentCount} / {limit} {resourceNamePlural} used
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {Math.round((currentCount / limit) * 100)}%
                </div>
                <div className="text-xs text-gray-500">used</div>
              </div>
            </div>
            <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((currentCount / limit) * 100, 100)}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Suggested Plans */}
        {suggestedPlans.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Upgrade Options
            </h4>
            <div className="space-y-3">
              {suggestedPlans.slice(0, 2).map(([planId, plan]) => (
                <Card
                  key={planId}
                  className="border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {plan.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Up to {plan.limits[limitType] === Infinity ? "Unlimited" : plan.limits[limitType]} {resourceNamePlural}
                        </p>
                        <div className="flex items-center mt-1">
                          {plan.features.slice(0, 2).map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs text-blue-600 dark:text-blue-400 mr-3"
                            >
                              • {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {plan.contactUs ? "Contact Us" : plan.price === 0 ? "Free" : `$${plan.price}/mo`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button asChild className="flex-1">
            <Link href="/dashboard/billing" onClick={onClose}>
              View Plans & Upgrade
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Maybe Later
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Need help choosing a plan? Visit our billing page to compare all
          features and pricing options.
        </p>
      </div>
    </Modal>
  );
}

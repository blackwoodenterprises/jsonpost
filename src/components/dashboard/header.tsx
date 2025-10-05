"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/auth-provider";
import { getUserProfile, type UserProfile } from "@/lib/billing";
import { ChevronDown, Menu, Code } from "lucide-react";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({
  title,
  subtitle,
  actions,
}: DashboardHeaderProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Use window.location.href for full page navigation to bypass middleware
      window.location.href = "/";
    } catch (error) {
      console.error('Error signing out:', error);
      // Still redirect to homepage even if there's an error
      window.location.href = "/";
    }
  };

  // Fetch user profile to get plan information
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const profile = await getUserProfile(user.id);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user?.id]);



  // Get badge color classes based on plan type
  const getPlanBadgeClasses = (plan: string) => {
    switch (plan) {
      case 'FREE':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'PRO':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'GROWTH':
        return 'bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="JSONPost Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold">JSONPost</span>
            </Link>
            {/* Plan Badge */}
            {userProfile?.plan && (
              <Badge 
                className={`ml-3 text-xs font-medium ${getPlanBadgeClasses(userProfile.plan)}`}
              >
                {userProfile.plan}
              </Badge>
            )}
          </div>

          {/* Right side - User Menu */}
          <div className="flex items-center justify-end flex-1">
            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 p-0 rounded-full bg-emerald-600 hover:bg-emerald-700 border-2 border-emerald-500 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </Button>

              {/* User Dropdown */}
              {isMobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black/5 dark:ring-white/10 border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {user?.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user?.email?.split('@')[0]}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate" title={user?.email}>
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Homepage</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/billing"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Billing & Usage</span>
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Profile & Settings</span>
                      </Link>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-2">
              {/* Mobile menu content can be added here if needed */}
            </div>
          </div>
        )}
      </div>

      {/* Page Title Section (if provided) */}
      {title && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {/* Page Actions */}
              {actions && (
                <div className="flex items-center space-x-2">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

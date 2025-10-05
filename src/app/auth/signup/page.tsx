"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Code,
  CheckCircle,
  Zap,
  Shield,
  Database,
  Globe,
  BarChart3,
  Webhook,
  ArrowRight,
  Star,
  ArrowLeft,
} from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setError("");

    if (!validateForm()) {
      setEmailLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=${encodeURIComponent("/dashboard")}`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Note: User will be automatically logged in and redirected to dashboard after email verification
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=${encodeURIComponent("/dashboard")}`,
        },
      });
      if (error) {
        setError(error.message);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setGoogleLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="w-full max-w-md space-y-6">
          {/* JSONPost Logo */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Image 
                src="/logo.png" 
                alt="JSONPost Logo" 
                width={40} 
                height={40} 
                className="rounded-lg"
              />
              <span className="text-2xl font-bold">JSONPost</span>
            </Link>
          </div>

          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-green-600">
                Check your email
              </CardTitle>
              <CardDescription className="text-center">
                We&apos;ve sent you a confirmation link at{" "}
                <strong>{formData.email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Click the link in the email to activate your account and
                you&apos;ll be automatically logged in and redirected to your
                dashboard.
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/auth/login">Return to Sign In</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Features Section */}
        <div className="hidden lg:flex flex-col justify-center items-end p-8 lg:p-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
          <div className="relative z-10 max-w-md">
            {/* Back to Homepage Button */}
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Homepage
            </Link>

            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <Image 
                src="/logo.png" 
                alt="JSONPost Logo" 
                width={40} 
                height={40} 
                className="rounded-lg"
              />
              <span className="text-2xl font-bold">JSONPost</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl font-bold mb-4 leading-tight">
              Start Building Forms
              <span className="block text-emerald-600">In Minutes</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Join thousands of developers who trust JSONPost. No backend
              required.
            </p>

            {/* Free Plan Features */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-sm font-medium mb-4 text-emerald-800 dark:text-emerald-200">
                <Star className="w-4 h-4 mr-2" />
                Free Plan Includes
              </div>

              <div className="grid gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">500 Submissions/Month</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">Instant Setup</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">Email Notifications</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">Spam Protection</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Database className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium">Data Export</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Globe className="w-3 h-3" />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>SOC 2 Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="flex items-center justify-start p-8 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="text-center lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Image 
                  src="/logo.png" 
                  alt="JSONPost Logo" 
                  width={40} 
                  height={40} 
                  className="rounded-lg"
                />
                <span className="text-2xl font-bold">JSONPost</span>
              </Link>
            </div>

            <Card className="w-full border-0 shadow-lg bg-white dark:bg-gray-900">
              <CardHeader className="space-y-3 text-left">
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Start building forms in under 2 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  variant="outline"
                  className="w-full h-11 text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={handleGoogleSignup}
                  disabled={googleLoading || emailLoading}
                >
                  {googleLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Connecting to Google...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 1c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-3 text-gray-500 dark:text-gray-400 font-medium">
                      Or continue with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 h-11 text-sm border border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-11 text-sm border border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-11 text-sm border border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 text-sm bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 font-medium"
                    disabled={emailLoading || googleLoading}
                  >
                    {emailLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <LoadingSpinner size="sm" />
                        <span>Creating your account...</span>
                      </div>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Mobile Features */}
                <div className="lg:hidden pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        500 submissions/month
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        No credit card required
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Instant setup
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Email notifications
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms-of-service"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-800 rounded-b-lg">
                <div className="text-sm text-center w-full text-gray-600 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

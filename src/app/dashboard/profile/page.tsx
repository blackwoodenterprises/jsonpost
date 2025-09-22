"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import { DashboardHeader } from "@/components/dashboard/header";
import { useAuth } from "@/components/auth/auth-provider";
import { supabase } from "@/lib/supabase";
import {
  User,
  Settings,
  Bell,
  Shield,
  Mail,
  Zap,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
  });

  // Zapier integration state
  const [zapierEnabled, setZapierEnabled] = useState(false);
  const [zapierApiKey, setZapierApiKey] = useState("");
  const [showZapierKey, setShowZapierKey] = useState(false);
  const [regeneratingKey, setRegeneratingKey] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const fetchZapierSettings = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("zapier_api_key")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data?.zapier_api_key) {
        setZapierEnabled(true);
        setZapierApiKey(data.zapier_api_key);
      }
    } catch (error) {
      console.error("Error fetching Zapier settings:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        firstName: "",
        lastName: "",
        company: "",
        phone: "",
      });
      fetchZapierSettings();
    }
  }, [user, fetchZapierSettings]);

  const generateApiKey = () => {
    return (
      "zap_" +
      Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
  };

  const handleZapierToggle = async (enabled: boolean) => {
    if (!user) return;

    try {
      let apiKey = zapierApiKey;

      if (enabled && !apiKey) {
        // Generate new API key when enabling
        apiKey = generateApiKey();
      } else if (!enabled) {
        // Clear API key when disabling
        apiKey = "";
      }

      const { error } = await supabase
        .from("profiles")
        .update({ zapier_api_key: enabled ? apiKey : null })
        .eq("id", user.id);

      if (error) throw error;

      setZapierEnabled(enabled);
      setZapierApiKey(apiKey);

      toast({
        title: enabled
          ? "Zapier integration enabled"
          : "Zapier integration disabled",
        description: enabled
          ? "Your API key has been generated"
          : "Your API key has been removed",
        variant: enabled ? "default" : "default",
      });
    } catch (error) {
      console.error("Error updating Zapier settings:", error);
      toast({
        title: "Error",
        description: "Failed to update Zapier settings",
        variant: "destructive",
      });
    }
  };

  const handleRegenerateKey = async () => {
    if (!user) return;

    setRegeneratingKey(true);

    try {
      const newApiKey = generateApiKey();

      const { error } = await supabase
        .from("profiles")
        .update({ zapier_api_key: newApiKey })
        .eq("id", user.id);

      if (error) throw error;

      setZapierApiKey(newApiKey);
      toast({
        title: "API key regenerated",
        description: "Your new API key has been generated successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error regenerating API key:", error);
      toast({
        title: "Error",
        description: "Failed to regenerate API key",
        variant: "destructive",
      });
    } finally {
      setRegeneratingKey(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(zapierApiKey);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard",
      variant: "default",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        title="Profile & Settings"
        subtitle="Manage your account settings and preferences"
        actions={
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{user.email}</h3>
                    <p className="text-sm text-gray-500">
                      Member since{" "}
                      {new Date(user.created_at || "").toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled={true}
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                  <p className="text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zapier Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-orange-500" />
                Zapier Integration
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Beta
                </span>
              </CardTitle>
              <CardDescription>
                Connect your JSONPost account with Zapier to automate workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Beta Feature:</strong> Our Zapier integration is
                  currently in beta. Please{" "}
                  <Link href="/help" className="underline hover:no-underline">
                    visit our help center
                  </Link>{" "}
                  to request access.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">Enable Zapier Integration</p>
                    <p className="text-sm text-gray-500">
                      Generate an API key to authenticate with Zapier
                    </p>
                  </div>
                </div>
                <Switch
                  checked={zapierEnabled}
                  onCheckedChange={handleZapierToggle}
                />
              </div>

              {zapierEnabled && zapierApiKey && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                  <div className="space-y-3">
                    <Label htmlFor="zapierApiKey">Zapier API Key</Label>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Input
                          id="zapierApiKey"
                          type={showZapierKey ? "text" : "password"}
                          value={zapierApiKey}
                          readOnly
                          className="pr-10 font-mono text-sm"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowZapierKey(!showZapierKey)}
                        >
                          {showZapierKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCopyKey}
                        className="flex items-center space-x-1"
                      >
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRegenerateKey}
                        disabled={regeneratingKey}
                        className="flex items-center space-x-1"
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${regeneratingKey ? "animate-spin" : ""}`}
                        />
                        <span>Regenerate</span>
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Use this API key in your Zapier integration to
                      authenticate requests. Keep this key secure and don&apos;t
                      share it publicly.
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      How to use with Zapier:
                    </h4>
                    <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                      <li>Copy the API key above</li>
                      <li>In Zapier, create a new Zap with JSONPost</li>
                      <li>
                        Paste this API key when prompted for authentication
                      </li>
                      <li>Your JSONPost account will be connected to Zapier</li>
                    </ol>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your account preferences and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive updates about your submissions
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Configure</Link>
                </Button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Enable 2FA</Link>
                </Button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">API Keys</p>
                    <p className="text-sm text-gray-500">
                      Manage your API access keys
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Manage Keys</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

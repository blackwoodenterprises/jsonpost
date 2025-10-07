import { Metadata } from "next";

const BASE_URL = "https://jsonpost.com";

export const metadata: Metadata = {
  title: "Features & Screenshots - JSONPost Form Backend Platform | Complete Overview",
  description: "Explore all JSONPost features with real screenshots. See our form builder, dashboard, submission management, webhook integrations, email notifications, file uploads, and advanced automation tools in action.",
  keywords: [
    "JSONPost features",
    "form backend features",
    "JSONPost screenshots",
    "form builder screenshots",
    "dashboard screenshots",
    "form automation features",
    "webhook integration",
    "email notifications",
    "file upload features",
    "submission management",
    "form validation",
    "typeform alternative",
    "headless forms",
    "form backend platform",
    "API form processing",
    "form analytics",
    "spam protection",
    "custom redirects",
    "JSON validation",
    "form security features",
    "multi-step forms",
    "conditional logic",
    "form themes",
    "integration features"
  ],
  authors: [{ name: "JSONPost Team" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${BASE_URL}/features-and-screenshots`,
    title: "Features & Screenshots - JSONPost Form Backend Platform",
    description: "Explore all JSONPost features with real screenshots. See our form builder, dashboard, submission management, webhook integrations, email notifications, file uploads, and advanced automation tools in action.",
    siteName: "JSONPost",
    images: [
      {
        url: `${BASE_URL}/screenshots/dashboard-screenshot.png`,
        width: 1200,
        height: 630,
        alt: "JSONPost Features and Screenshots - Complete Form Backend Platform Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features & Screenshots - JSONPost Form Backend Platform",
    description: "Explore all JSONPost features with real screenshots. See our form builder, dashboard, submission management, webhook integrations, email notifications, file uploads, and advanced automation tools in action.",
    images: [`${BASE_URL}/screenshots/dashboard-screenshot.png`],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: `${BASE_URL}/features-and-screenshots`,
  },
  category: "Product Features",
};
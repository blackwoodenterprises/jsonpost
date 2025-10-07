import { Metadata } from "next";

const BASE_URL = "https://jsonpost.com";

export const metadata: Metadata = {
  title: "Developer Documentation - JSONPost API Integration Guide | Form Backend",
  description: "Complete developer documentation for JSONPost form backend API. Learn how to integrate form submissions, webhooks, email notifications, file uploads, and JSON validation with detailed code examples and tutorials.",
  keywords: [
    "JSONPost documentation",
    "form backend API",
    "developer guide",
    "API integration",
    "form submission API",
    "webhook integration",
    "email notifications",
    "file upload API",
    "JSON validation",
    "form automation",
    "REST API documentation",
    "JavaScript form integration",
    "React form backend",
    "HTML form processing",
    "form data collection",
    "backend as a service",
    "form endpoint",
    "API authentication",
    "CORS configuration",
    "form security"
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
    url: `${BASE_URL}/docs`,
    title: "Developer Documentation - JSONPost API Integration Guide",
    description: "Complete developer documentation for JSONPost form backend API. Learn how to integrate form submissions, webhooks, email notifications, file uploads, and JSON validation with detailed code examples and tutorials.",
    siteName: "JSONPost",
    images: [
      {
        url: `${BASE_URL}/ogimage.png`,
        width: 1200,
        height: 630,
        alt: "JSONPost Developer Documentation - Complete API Integration Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Documentation - JSONPost API Integration Guide",
    description: "Complete developer documentation for JSONPost form backend API. Learn how to integrate form submissions, webhooks, email notifications, file uploads, and JSON validation with detailed code examples and tutorials.",
    images: [`${BASE_URL}/ogimage.png`],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: `${BASE_URL}/docs`,
  },
  category: "Developer Tools",
};
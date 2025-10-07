import { Metadata } from "next";

const BASE_URL = "https://jsonpost.com";

export const metadata: Metadata = {
  title: "Help Center & Support - JSONPost FAQ and Contact | Form Backend Support",
  description: "Get help with JSONPost form backend service. Find answers to frequently asked questions about form submissions, integrations, billing, spam protection, and more. Contact our support team for assistance.",
  keywords: [
    "JSONPost help",
    "form backend support",
    "JSONPost FAQ",
    "customer support",
    "form submission help",
    "API support",
    "webhook integration help",
    "billing support",
    "spam protection",
    "file upload help",
    "form automation support",
    "technical support",
    "JSONPost documentation",
    "contact support",
    "help center",
    "troubleshooting",
    "form backend FAQ",
    "API integration help",
    "form processing support",
    "JSONPost assistance"
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
    url: `${BASE_URL}/help`,
    title: "Help Center & Support - JSONPost FAQ and Contact",
    description: "Get help with JSONPost form backend service. Find answers to frequently asked questions about form submissions, integrations, billing, spam protection, and more. Contact our support team for assistance.",
    siteName: "JSONPost",
    images: [
      {
        url: `${BASE_URL}/ogimage.png`,
        width: 1200,
        height: 630,
        alt: "JSONPost Help Center - FAQ and Support for Form Backend Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Center & Support - JSONPost FAQ and Contact",
    description: "Get help with JSONPost form backend service. Find answers to frequently asked questions about form submissions, integrations, billing, spam protection, and more. Contact our support team for assistance.",
    images: [`${BASE_URL}/ogimage.png`],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: `${BASE_URL}/help`,
  },
  category: "Customer Support",
};
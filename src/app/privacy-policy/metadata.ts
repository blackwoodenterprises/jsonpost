import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - JSONPost | Data Protection & Privacy Rights",
  description: "Learn how JSONPost collects, uses, and protects your personal information. Our comprehensive privacy policy outlines your rights and our commitment to data security.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "data security",
    "privacy rights",
    "GDPR compliance",
    "data collection",
    "information security",
    "user privacy",
    "data processing",
    "privacy practices",
    "JSONPost privacy"
  ],
  authors: [{ name: "JSONPost Legal Team" }],
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
    url: "https://jsonpost.com/privacy-policy",
    title: "Privacy Policy - JSONPost | Data Protection & Privacy Rights",
    description: "Learn how JSONPost collects, uses, and protects your personal information. Our comprehensive privacy policy outlines your rights and our commitment to data security.",
    siteName: "JSONPost",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "JSONPost Privacy Policy - Data Protection & Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - JSONPost | Data Protection & Privacy Rights",
    description: "Learn how JSONPost collects, uses, and protects your personal information. Our comprehensive privacy policy outlines your rights and our commitment to data security.",
    images: ["/ogimage.png"],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: "https://jsonpost.com/privacy-policy",
  },
  category: "Legal",
};
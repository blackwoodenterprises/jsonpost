import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - JSONPost | 30-Day Money-Back Guarantee",
  description: "JSONPost offers a 30-day money-back guarantee. Learn about our refund policy, eligibility requirements, and how to request a refund for our form building services.",
  keywords: [
    "refund policy",
    "money-back guarantee",
    "refund request",
    "30-day guarantee",
    "refund eligibility",
    "refund process",
    "customer satisfaction",
    "refund terms",
    "billing refund",
    "subscription refund",
    "JSONPost refund",
    "refund conditions"
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
    url: "https://jsonpost.com/refund-policy",
    title: "Refund Policy - JSONPost | 30-Day Money-Back Guarantee",
    description: "JSONPost offers a 30-day money-back guarantee. Learn about our refund policy, eligibility requirements, and how to request a refund for our form building services.",
    siteName: "JSONPost",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "JSONPost Refund Policy - 30-Day Money-Back Guarantee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy - JSONPost | 30-Day Money-Back Guarantee",
    description: "JSONPost offers a 30-day money-back guarantee. Learn about our refund policy, eligibility requirements, and how to request a refund for our form building services.",
    images: ["/ogimage.png"],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: "https://jsonpost.com/refund-policy",
  },
  category: "Legal",
};
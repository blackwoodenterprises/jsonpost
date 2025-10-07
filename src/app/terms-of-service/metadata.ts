import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - JSONPost | User Agreement & Service Terms",
  description: "Read JSONPost's terms of service to understand your rights and responsibilities when using our form building platform. Clear guidelines for acceptable use and service policies.",
  keywords: [
    "terms of service",
    "user agreement",
    "service terms",
    "terms and conditions",
    "user responsibilities",
    "service policies",
    "acceptable use",
    "legal terms",
    "service agreement",
    "user rights",
    "platform terms",
    "JSONPost terms"
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
    url: "https://jsonpost.com/terms-of-service",
    title: "Terms of Service - JSONPost | User Agreement & Service Terms",
    description: "Read JSONPost's terms of service to understand your rights and responsibilities when using our form building platform. Clear guidelines for acceptable use and service policies.",
    siteName: "JSONPost",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "JSONPost Terms of Service - User Agreement & Guidelines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - JSONPost | User Agreement & Service Terms",
    description: "Read JSONPost's terms of service to understand your rights and responsibilities when using our form building platform. Clear guidelines for acceptable use and service policies.",
    images: ["/ogimage.png"],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: "https://jsonpost.com/terms-of-service",
  },
  category: "Legal",
};
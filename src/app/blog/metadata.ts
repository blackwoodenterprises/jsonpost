import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSONPost Blog - Form Building Tips, Tutorials & Best Practices",
  description: "Discover expert insights, tutorials, and best practices for building better forms and managing data collection. Learn about form optimization, integrations, and real-world solutions.",
  keywords: [
    "form building blog",
    "form tutorials",
    "data collection tips",
    "form optimization",
    "web forms best practices",
    "form integrations",
    "JSONPost tutorials",
    "form builder guides",
    "data management",
    "form analytics",
    "webhook tutorials",
    "form automation"
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
    url: "https://jsonpost.com/blog",
    title: "JSONPost Blog - Form Building Tips, Tutorials & Best Practices",
    description: "Discover expert insights, tutorials, and best practices for building better forms and managing data collection. Learn about form optimization, integrations, and real-world solutions.",
    siteName: "JSONPost",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "JSONPost Blog - Form Building Knowledge Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSONPost Blog - Form Building Tips, Tutorials & Best Practices",
    description: "Discover expert insights, tutorials, and best practices for building better forms and managing data collection. Learn about form optimization, integrations, and real-world solutions.",
    images: ["/ogimage.png"],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: "https://jsonpost.com/blog",
  },
  category: "Technology",
};
import { Metadata } from "next";

const BASE_URL = "https://jsonpost.com";

export const metadata: Metadata = {
  title: "FormEmbed SDK Documentation - Embed JSONPost Forms Anywhere | JavaScript SDK",
  description: "Complete guide to embedding JSONPost forms on your website using our JavaScript SDK. Learn how to create modal popups, inline forms, and sidebar embeds with customizable themes and advanced configuration options.",
  keywords: [
    "FormEmbed SDK documentation",
    "JavaScript form embed",
    "form embedding guide",
    "modal form popup",
    "inline form embed",
    "sidebar form widget",
    "form SDK integration",
    "embed forms JavaScript",
    "form widget documentation",
    "JSONPost embed SDK",
    "form popup modal",
    "responsive form embed",
    "custom form themes",
    "form embed API",
    "website form integration",
    "form embedding tutorial",
    "JavaScript form library",
    "form embed configuration",
    "form widget customization",
    "embed form anywhere",
    "form SDK examples",
    "form embed best practices",
    "form popup implementation",
    "form widget setup"
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
    url: `${BASE_URL}/embed`,
    title: "FormEmbed SDK Documentation - Embed JSONPost Forms Anywhere",
    description: "Complete guide to embedding JSONPost forms on your website using our JavaScript SDK. Learn how to create modal popups, inline forms, and sidebar embeds with customizable themes and advanced configuration options.",
    siteName: "JSONPost",
    images: [
      {
        url: `${BASE_URL}/screenshots/form-builder.png`,
        width: 1200,
        height: 630,
        alt: "FormEmbed SDK Documentation - JavaScript Form Embedding Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FormEmbed SDK Documentation - Embed JSONPost Forms Anywhere",
    description: "Complete guide to embedding JSONPost forms on your website using our JavaScript SDK. Learn how to create modal popups, inline forms, and sidebar embeds with customizable themes.",
    images: [`${BASE_URL}/screenshots/form-builder.png`],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: `${BASE_URL}/embed`,
  },
  category: "Developer Documentation",
};
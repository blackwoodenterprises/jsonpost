import { Metadata } from "next";
import { HtmlFormGeneratorClient } from "@/components/pages/html-form-generator-client";

export const metadata: Metadata = {
  title: "Free HTML Form Generator | Create Beautiful Forms Instantly - JSONPost",
  description: "Create stunning, responsive HTML forms with our free visual form builder. Choose from templates, customize fields, add validation, and export clean HTML code. No coding required!",
  keywords: [
    "HTML form generator",
    "free form builder",
    "form creator",
    "HTML forms",
    "contact form generator",
    "responsive forms",
    "form templates",
    "web forms",
    "form validation",
    "bootstrap forms",
    "CSS forms",
    "form design tool"
  ],
  authors: [{ name: "JSONPost Team" }],
  creator: "JSONPost",
  publisher: "JSONPost",
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
    url: "https://jsonpost.com/free-html-form-generator",
    title: "Free HTML Form Generator | Create Beautiful Forms Instantly",
    description: "Create stunning, responsive HTML forms with our free visual form builder. Choose from templates, customize fields, and export clean HTML code instantly.",
    siteName: "JSONPost",
    images: [
      {
        url: "/og-images/html-form-generator.png",
        width: 1200,
        height: 630,
        alt: "Free HTML Form Generator - Create Beautiful Forms Instantly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free HTML Form Generator | Create Beautiful Forms Instantly",
    description: "Create stunning, responsive HTML forms with our free visual form builder. Choose from templates, customize fields, and export clean HTML code instantly.",
    images: ["/og-images/html-form-generator.png"],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: "https://jsonpost.com/free-html-form-generator",
  },
  category: "Web Development Tools",
};

export default function FormGeneratorPage() {
  return <HtmlFormGeneratorClient />;
}

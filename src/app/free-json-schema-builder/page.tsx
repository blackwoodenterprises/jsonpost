import { Metadata } from "next";
import { JsonSchemaBuilderClient } from "@/components/pages/json-schema-builder-client";

export const metadata: Metadata = {
  title: "Free JSON Schema Builder | Create & Validate JSON Schemas - JSONPost",
  description: "Build, edit, and validate JSON schemas visually with our free schema builder. Infer schemas from JSON data, test validation, and export code in multiple languages. Perfect for API development.",
  keywords: [
    "JSON schema builder",
    "JSON schema validator",
    "free schema generator",
    "JSON schema creator",
    "API schema builder",
    "JSON validation",
    "schema inference",
    "JSON schema editor",
    "data validation",
    "API documentation",
    "JSON schema tool",
    "schema design"
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
    url: "https://jsonpost.com/free-json-schema-builder",
    title: "Free JSON Schema Builder | Create & Validate JSON Schemas",
    description: "Build, edit, and validate JSON schemas visually with our free schema builder. Infer schemas from JSON data, test validation, and export code in multiple languages.",
    siteName: "JSONPost",
    images: [
      {
        url: "/og-images/json-schema-builder.png",
        width: 1200,
        height: 630,
        alt: "Free JSON Schema Builder - Create & Validate JSON Schemas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Schema Builder | Create & Validate JSON Schemas",
    description: "Build, edit, and validate JSON schemas visually with our free schema builder. Infer schemas from JSON data, test validation, and export code in multiple languages.",
    images: ["/og-images/json-schema-builder.png"],
    creator: "@jsonpost",
  },
  alternates: {
    canonical: "https://jsonpost.com/free-json-schema-builder",
  },
  category: "Web Development Tools",
};

export default function SchemaBuilderPage() {
  return <JsonSchemaBuilderClient />;
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "JSONPost - Simple Form Backend Service",
  description:
    "A lightweight form backend + automation trigger service for developers and entrepreneurs",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "JSONPost - Simple Form Backend Service",
    description:
      "A lightweight form backend + automation trigger service for developers and entrepreneurs",
    images: [
      {
        url: "/ogimage.png",
        width: 1700,
        height: 1022,
        alt: "JSONPost - Simple Form Backend Service",
      },
    ],
    type: "website",
    siteName: "JSONPost",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSONPost - Simple Form Backend Service",
    description:
      "A lightweight form backend + automation trigger service for developers and entrepreneurs",
    images: ["/ogimage.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

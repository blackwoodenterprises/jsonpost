import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: "JSONPost - Headless Form Backend Service",
  description:
    "A lightweight form backend + automation trigger service for developers, freelancers and entrepreneurs",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "JSONPost - Headless Form Backend Service",
    description:
      "A lightweight form backend + automation trigger service for developers, freelancers and entrepreneurs",
    images: [
      {
        url: "/ogimage.png",
        width: 1700,
        height: 1022,
        alt: "JSONPost - Headless Form Backend Service",
      },
    ],
    type: "website",
    siteName: "JSONPost",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSONPost - Headless Form Backend Service",
    description:
      "A lightweight form backend + automation trigger service for developers, freelancers and entrepreneurs",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

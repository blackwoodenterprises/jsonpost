import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

const CrispWithNoSSR = dynamic(() => import("../components/crisp"));

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
  title:
    "JSONPost - Full Stack Form Platform With Advanced Features and Integrations",
  description:
    "JSONPost is a full stack form builder. Build conversational, static and embeddable forms that bring conversions",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title:
      "JSONPost - Full Stack Form Platform With Advanced Features and Integrations",
    description:
      "JSONPost is a full stack form builder. Build conversational, static and embeddable forms that bring conversions",
    images: [
      {
        url: "/ogimage.png",
        width: 1700,
        height: 1022,
        alt: "JSONPost - Full Stack Form Platform With Advanced Features and Integrations",
      },
    ],
    type: "website",
    siteName: "JSONPost",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "JSONPost - Full Stack Form Platform With Advanced Features and Integrations",
    description:
      "JSONPost is a full stack form builder. Build conversational, static and embeddable forms that bring conversions",
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
          <AuthProvider>
            <CrispWithNoSSR />
            {children}
            <Analytics />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

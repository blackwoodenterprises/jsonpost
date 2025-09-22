"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Wand2 } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">JSONPost</span>
        </Link>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" asChild className="relative">
            <Link
              href="/form-generator"
              className="flex items-center space-x-2"
            >
              <Wand2 className="w-4 h-4" />
              <span>Free HTML Form Generator</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                Beta
              </Badge>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

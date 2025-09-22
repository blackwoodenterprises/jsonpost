import Link from "next/link";
import { Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">JSONPost</span>
            </div>
            <p className="text-gray-400 text-sm">
              Headless form backend for developers who want to ship fast.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/docs" className="hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-white">
                  Status
                </Link>
              </li>
              <li>
                <Link href="/quick-start" className="hover:text-white">
                  Quick Start
                </Link>
              </li>
              <li>
                <Link href="/form-generator" className="hover:text-white">
                  Free HTML Form Generator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 JSONPost. Built for developers, by developers.</p>
        </div>
      </div>
    </footer>
  );
}

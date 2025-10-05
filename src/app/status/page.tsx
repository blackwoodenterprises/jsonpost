import { Metadata } from "next";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "System Status | JSONPost Service Health",
  description: "Real-time status of JSONPost services including API, database, email, and web application health monitoring.",
};

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  description: string;
  lastChecked: string;
}

// Simulated status data - in a real app, this would come from your monitoring system
const services: ServiceStatus[] = [
  {
    name: "API",
    status: "operational",
    description: "All API endpoints are responding normally",
    lastChecked: "2 minutes ago",
  },
  {
    name: "Database",
    status: "operational",
    description: "Database queries are performing within normal parameters",
    lastChecked: "1 minute ago",
  },
  {
    name: "Email",
    status: "operational",
    description: "Email notifications are being delivered successfully",
    lastChecked: "3 minutes ago",
  },
  {
    name: "Web Application",
    status: "operational",
    description: "Dashboard and web interface are fully functional",
    lastChecked: "1 minute ago",
  },
];

function getStatusIcon(status: ServiceStatus["status"]) {
  switch (status) {
    case "operational":
      return <CheckCircle className="h-5 w-5 text-emerald-600" />;
    case "degraded":
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    case "outage":
      return <XCircle className="h-5 w-5 text-red-600" />;
  }
}

function getStatusBadge(status: ServiceStatus["status"]) {
  switch (status) {
    case "operational":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Operational
        </Badge>
      );
    case "degraded":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
          Degraded Performance
        </Badge>
      );
    case "outage":
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
          Service Outage
        </Badge>
      );
  }
}

export default function StatusPage() {
  const allOperational = services.every((service) => service.status === "operational");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Live Status
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-800 dark:from-white dark:via-emerald-400 dark:to-slate-200 bg-clip-text text-transparent">
              System Status
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Real-time monitoring of all JSONPost services. We&apos;re committed to 
              transparency and keeping you informed about our system health.
            </p>
            
            {/* Overall Status */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
              {allOperational ? (
                <>
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    All Systems Operational
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    Some Services Affected
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Services Status */}
          <div className="grid gap-6">
            {services.map((service) => (
              <Card key={service.name} className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <span className="text-xl">{service.name}</span>
                    </div>
                    {getStatusBadge(service.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    {service.description}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Last checked: {service.lastChecked}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <Card className="border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Need Help?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                  If you&apos;re experiencing issues not reflected here, or need immediate assistance, 
                  please don&apos;t hesitate to reach out to our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/help"
                    className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/docs"
                    className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    View Documentation
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
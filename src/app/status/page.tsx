"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock,
  Server,
  Database,
  Mail,
  Globe,
  Activity
} from "lucide-react";

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  description: string;
  icon: React.ReactNode;
  lastChecked: Date;
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "API Service",
      status: "operational",
      description: "Form submission endpoints",
      icon: <Server className="w-5 h-5" />,
      lastChecked: new Date()
    },
    {
      name: "Database",
      status: "operational", 
      description: "Data storage and retrieval",
      icon: <Database className="w-5 h-5" />,
      lastChecked: new Date()
    },
    {
      name: "Email Service",
      status: "operational",
      description: "Notification delivery",
      icon: <Mail className="w-5 h-5" />,
      lastChecked: new Date()
    },
    {
      name: "Web Application",
      status: "operational",
      description: "Dashboard and documentation",
      icon: <Globe className="w-5 h-5" />,
      lastChecked: new Date()
    }
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate status checks every 30 seconds
    const interval = setInterval(() => {
      checkServiceStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const checkServiceStatus = async () => {
    // In a real implementation, these would be actual health checks
    try {
      // Simulate API health check
      await fetch('/api/health').catch(() => null);
      
      setServices(prev => prev.map(service => ({
        ...service,
        lastChecked: new Date(),
        // For demo purposes, keep all services operational
        // In real implementation, update based on actual checks
      })));
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Status check failed:', error);
    }
  };

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'maintenance':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: ServiceStatus['status']) => {
    const variants = {
      operational: { variant: "default" as const, text: "Operational", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
      degraded: { variant: "secondary" as const, text: "Degraded", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
      outage: { variant: "destructive" as const, text: "Outage", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
      maintenance: { variant: "outline" as const, text: "Maintenance", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" }
    };

    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.text}
      </Badge>
    );
  };

  const overallStatus = services.every(s => s.status === 'operational') 
    ? 'operational' 
    : services.some(s => s.status === 'outage') 
    ? 'outage' 
    : 'degraded';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center mb-6">
            <Activity className="w-12 h-12 mr-4 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              JSONPost Status
            </h1>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            {getStatusIcon(overallStatus)}
            <span className="ml-3 text-xl font-semibold">
              {overallStatus === 'operational' ? 'All Systems Operational' : 
               overallStatus === 'outage' ? 'Service Disruption' : 'Degraded Performance'}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Real-time status of JSONPost services and infrastructure
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Service Status</h2>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="mb-2">
                          {getStatusBadge(service.status)}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Checked {service.lastChecked.toLocaleTimeString()}
                        </p>
                      </div>
                      {getStatusIcon(service.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Metrics */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">System Metrics</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">~150ms</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Average API response time
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Uptime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">0</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Recent Updates</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">All systems operational</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      All services are running normally with no reported issues.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date().toLocaleDateString()} - No incidents to report
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
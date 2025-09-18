"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, ExternalLink } from "lucide-react";

interface SubmissionData {
  [key: string]: unknown;
}

interface Endpoint {
  id: string;
  name: string;
  path: string;
}

interface SubmissionCardProps {
  submission: {
    id: string;
    data: SubmissionData;
    ip_address: string;
    user_agent: string;
    created_at: string;
    endpoint_id?: string;
    endpoints?: Endpoint;
  };
  projectId: string;
  showEndpointInfo?: boolean;
  showActions?: boolean;
  variant?: "default" | "compact";
  className?: string;
}

function createSubmissionExcerpt(
  data: Record<string, unknown>,
  maxLength: number = 100
): string {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    if (jsonString.length <= maxLength) {
      return jsonString;
    }
    return jsonString.substring(0, maxLength) + "...";
  } catch (error) {
    return "Invalid JSON data";
  }
}

export function SubmissionCard({
  submission,
  projectId,
  showEndpointInfo = false,
  showActions = true,
  variant = "default",
  className = "",
}: SubmissionCardProps) {
  const submissionDetailUrl = `/dashboard/projects/${projectId}/submissions/${submission.id}`;
  const endpointDetailUrl = submission.endpoints?.id
    ? `/dashboard/projects/${projectId}/endpoints/${submission.endpoints.id}`
    : null;

  if (variant === "compact") {
    return (
      <Card className={`cursor-pointer hover:shadow-md transition-shadow ${className}`}>
        <Link href={submissionDetailUrl}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Submission {submission.id.slice(0, 8)}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(submission.created_at).toLocaleString()}
              </span>
            </div>
            {showEndpointInfo && submission.endpoints && (
              <div className="text-sm text-gray-600 mb-2">
                Endpoint: {submission.endpoints.name}
              </div>
            )}
            <div className="text-sm text-gray-600 mb-2">
              From: {submission.ip_address}
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {createSubmissionExcerpt(submission.data)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Click to view full details
              </p>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <Badge variant="secondary" className="font-mono text-xs">
                {submission.id.slice(0, 8)}
              </Badge>
              {showEndpointInfo && submission.endpoints && (
                <>
                  <Badge variant="outline">
                    {submission.endpoints.name}
                  </Badge>
                  <span className="text-xs text-gray-500 font-mono">
                    {submission.endpoints.path}
                  </span>
                </>
              )}
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                Submission Data:
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {createSubmissionExcerpt(submission.data)}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(submission.created_at).toLocaleString()}
              </div>
              <div className="flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                {submission.ip_address}
              </div>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center space-x-2 ml-4">
              {endpointDetailUrl && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={endpointDetailUrl}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Endpoint
                  </Link>
                </Button>
              )}
              <Button size="sm" asChild>
                <Link href={submissionDetailUrl}>
                  View Details
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
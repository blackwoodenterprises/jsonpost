"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Globe, ExternalLink, Paperclip, FolderOpen } from "lucide-react";

interface SubmissionData {
  [key: string]: unknown;
}

interface FileUpload {
  id: string;
  original_filename: string;
  file_size_bytes: number;
  mime_type: string;
  created_at: string;
}

interface Endpoint {
  id: string;
  name: string;
  path: string;
  project_id?: string;
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
    file_uploads?: FileUpload[];
  };
  projectId: string;
  showEndpointInfo?: boolean;
  showActions?: boolean;
  showProjectLink?: boolean;
  variant?: "default" | "compact" | "minimal";
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
  } catch {
    return "Invalid JSON data";
  }
}

function getRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
}

export function SubmissionCard({
  submission,
  projectId,
  showEndpointInfo = false,
  showActions = true,
  showProjectLink = false,
  variant = "default",
  className = "",
}: SubmissionCardProps) {
  const submissionDetailUrl = `/dashboard/projects/${projectId}/submissions/${submission.id}`;
  const endpointDetailUrl = submission.endpoints?.id
    ? `/dashboard/projects/${projectId}/endpoints/${submission.endpoints.id}`
    : null;
  const projectDetailUrl = `/dashboard/projects/${projectId}`;

  // Minimal variant for very compact display
  if (variant === "minimal") {
    return (
      <Card className={`cursor-pointer hover:shadow-sm transition-shadow ${className}`}>
        <Link href={submissionDetailUrl}>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <Badge variant="secondary" className="font-mono text-xs">
                  {submission.id.slice(0, 6)}
                </Badge>
                {submission.file_uploads && submission.file_uploads.length > 0 && (
                  <Paperclip className="h-3 w-3 text-gray-500 flex-shrink-0" />
                )}
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
                  {getRelativeTime(submission.created_at)}
                </span>
              </div>
              <div className="text-xs text-gray-500 ml-2">
                {submission.ip_address}
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <Card className={`cursor-pointer hover:shadow-md transition-shadow ${className}`}>
        <Link href={submissionDetailUrl}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <Badge variant="secondary" className="font-mono text-xs">
                  {submission.id.slice(0, 8)}
                </Badge>
                {submission.file_uploads && submission.file_uploads.length > 0 && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Paperclip className="h-3 w-3 mr-1" />
                    {submission.file_uploads.length}
                  </div>
                )}
                {showEndpointInfo && submission.endpoints && (
                  <Badge variant="outline" className="text-xs">
                    {submission.endpoints.name}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-500 text-right">
                <div>{getRelativeTime(submission.created_at)}</div>
                <div className="text-xs text-gray-400">
                  {new Date(submission.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {createSubmissionExcerpt(submission.data)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                {submission.ip_address}
              </div>
              {showProjectLink && (
                <div className="flex items-center space-x-1">
                  <FolderOpen className="h-3 w-3" />
                  <span>Project</span>
                </div>
              )}
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  // Default variant - full featured
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3 flex-wrap">
              <Badge variant="secondary" className="font-mono text-xs">
                {submission.id.slice(0, 8)}
              </Badge>
              {submission.file_uploads && submission.file_uploads.length > 0 && (
                <div className="flex items-center text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  <Paperclip className="h-3 w-3 mr-1" />
                  {submission.file_uploads.length} file{submission.file_uploads.length !== 1 ? 's' : ''}
                </div>
              )}
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

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Submission Data:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                <p className="text-sm text-gray-900 dark:text-white">
                  {createSubmissionExcerpt(submission.data, 150)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-gray-500 flex-wrap gap-2">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span className="font-medium">{getRelativeTime(submission.created_at)}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400">•</span>
                <span className="ml-1">{new Date(submission.created_at).toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                {submission.ip_address}
              </div>
            </div>
          </div>

          {showActions && (
            <div className="flex flex-col items-end space-y-2 ml-4">
              <div className="flex items-center space-x-2">
                {showProjectLink && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={projectDetailUrl}>
                      <FolderOpen className="h-3 w-3 mr-1" />
                      Project
                    </Link>
                  </Button>
                )}
                {endpointDetailUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={endpointDetailUrl}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Endpoint
                    </Link>
                  </Button>
                )}
              </div>
              <Button size="sm" asChild className="w-full">
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
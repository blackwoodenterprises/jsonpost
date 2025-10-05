"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, TrendingUp } from "lucide-react";

interface SubmissionData {
  date: string;
  submissions: number;
  formattedDate: string;
}

interface SubmissionsChartProps {
  userId: string;
}

export function SubmissionsChart({ userId }: SubmissionsChartProps) {
  const [data, setData] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<7 | 30>(7);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const fetchSubmissionsData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // Get user's projects and their endpoints
      const { data: projects } = await supabase
        .from("projects")
        .select("id")
        .eq("user_id", userId);

      if (!projects || projects.length === 0) {
        setData([]);
        setTotalSubmissions(0);
        return;
      }

      const projectIds = projects.map(p => p.id);

      // Get all endpoints for these projects
      const { data: endpoints } = await supabase
        .from("endpoints")
        .select("id")
        .in("project_id", projectIds);

      if (!endpoints || endpoints.length === 0) {
        setData([]);
        setTotalSubmissions(0);
        return;
      }

      const endpointIds = endpoints.map(e => e.id);

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - period);

      // Fetch submissions for the period
      const { data: submissions, error } = await supabase
        .from("submissions")
        .select("created_at")
        .in("endpoint_id", endpointIds)
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching submissions:", error);
        return;
      }

      // Group submissions by date
      const submissionsByDate: { [key: string]: number } = {};
      
      // Initialize all dates in the range with 0
      for (let i = 0; i < period; i++) {
        const date = new Date();
        date.setDate(endDate.getDate() - (period - 1 - i));
        const dateStr = date.toISOString().split('T')[0];
        submissionsByDate[dateStr] = 0;
      }

      // Count actual submissions
      submissions?.forEach(submission => {
        if (submission.created_at) {
          const date = new Date(submission.created_at).toISOString().split('T')[0];
          if (submissionsByDate.hasOwnProperty(date)) {
            submissionsByDate[date]++;
          }
        }
      });

      // Convert to chart data format
      const chartData: SubmissionData[] = Object.entries(submissionsByDate).map(([date, count]) => {
        const dateObj = new Date(date);
        return {
          date,
          submissions: count,
          formattedDate: dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })
        };
      });

      setData(chartData);
      setTotalSubmissions(submissions?.length || 0);
    } catch (error) {
      console.error("Error fetching submissions data:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, period]);

  useEffect(() => {
    fetchSubmissionsData();
  }, [fetchSubmissionsData]);

  const maxSubmissions = Math.max(...data.map(d => d.submissions), 1);

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-xl">Submissions Overview</CardTitle>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={period === 7 ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(7)}
              disabled={loading}
            >
              Past 7 Days
            </Button>
            <Button
              variant={period === 30 ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(30)}
              disabled={loading}
            >
              Past 30 Days
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Total: {totalSubmissions} submissions</span>
          </div>
          <div>
            Average: {totalSubmissions > 0 ? Math.round(totalSubmissions / period * 10) / 10 : 0} per day
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No submissions found for the selected period</p>
            </div>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fontSize: 12 }}
                  interval={period === 30 ? 4 : 0}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[0, Math.max(maxSubmissions + 1, 5)]}
                />
                <Tooltip 
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      const data = payload[0].payload as SubmissionData;
                      return new Date(data.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      });
                    }
                    return label;
                  }}
                  formatter={(value: number) => [value, 'Submissions']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="submissions" 
                  fill="#059669"
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
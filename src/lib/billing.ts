import { supabase } from './supabase';
import type { PlanType } from './plans';
import { PLANS } from './plans';

export interface UserUsage {
  projects: number;
  endpoints: number;
  submissions: number;
}

export interface UserProfile {
  id: string;
  email: string;
  plan: PlanType;
}

export interface LimitCheckResult {
  allowed: boolean;
  currentCount: number;
  limit: number;
  planType: PlanType;
}

/**
 * Check if user can create a new project based on their plan limits
 */
export async function canCreateProject(userId: string): Promise<LimitCheckResult> {
  const [usage, profile] = await Promise.all([
    getUserUsage(userId),
    getUserProfile(userId)
  ]);

  if (!profile) {
    throw new Error('User profile not found');
  }

  const plan = PLANS[profile.plan];
  const allowed = usage.projects < plan.limits.projects;

  return {
    allowed,
    currentCount: usage.projects,
    limit: plan.limits.projects,
    planType: profile.plan
  };
}

/**
 * Check if user can create a new endpoint based on their plan limits
 */
export async function canCreateEndpoint(userId: string): Promise<LimitCheckResult> {
  const [usage, profile] = await Promise.all([
    getUserUsage(userId),
    getUserProfile(userId)
  ]);

  if (!profile) {
    throw new Error('User profile not found');
  }

  const plan = PLANS[profile.plan];
  const allowed = usage.endpoints < plan.limits.endpoints;

  return {
    allowed,
    currentCount: usage.endpoints,
    limit: plan.limits.endpoints,
    planType: profile.plan
  };
}

/**
 * Get current user's usage statistics
 */
export async function getUserUsage(userId: string): Promise<UserUsage> {
  try {
    // Get projects count
    const { count: projectsCount, error: projectsError } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (projectsError) {
      console.error('Error fetching projects count:', projectsError);
      throw projectsError;
    }

    // Get endpoints count by joining with projects
    const { count: endpointsCount, error: endpointsError } = await supabase
      .from('endpoints')
      .select('*, projects!inner(user_id)', { count: 'exact', head: true })
      .eq('projects.user_id', userId);

    if (endpointsError) {
      console.error('Error fetching endpoints count:', endpointsError);
      throw endpointsError;
    }

    // Get current month submissions count
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const { data: submissionData, error: submissionError } = await supabase
      .from('monthly_submission_counts')
      .select('submission_count')
      .eq('user_id', userId)
      .eq('year', currentYear)
      .eq('month', currentMonth)
      .single();

    if (submissionError && submissionError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is fine for new users
      console.error('Error fetching submission count:', submissionError);
      throw submissionError;
    }

    return {
      projects: projectsCount || 0,
      endpoints: endpointsCount || 0,
      submissions: submissionData?.submission_count || 0,
    };
  } catch (error) {
    console.error('Error getting user usage:', error);
    throw error;
  }
}

/**
 * Get user profile with plan information
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, plan')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }

    return data as UserProfile;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

/**
 * Get current month submission count using database function
 */
export async function getCurrentMonthSubmissions(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase.rpc('get_current_month_submission_count', {
      p_user_id: userId
    });

    if (error) {
      console.error('Error fetching current month submissions:', error);
      throw error;
    }

    return data || 0;
  } catch (error) {
    console.error('Error getting current month submissions:', error);
    throw error;
  }
}
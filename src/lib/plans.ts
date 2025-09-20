export type PlanType = 'FREE' | 'PRO' | 'GROWTH' | 'ENTERPRISE';

export interface PlanLimits {
  projects: number;
  endpoints: number;
  submissions: number;
}

export interface Plan {
  id: PlanType;
  name: string;
  price: number; // in dollars, 0 for free
  priceDisplay: string;
  limits: PlanLimits;
  features: string[];
  popular?: boolean;
  contactUs?: boolean;
}

export const PLANS: Record<PlanType, Plan> = {
  FREE: {
    id: 'FREE',
    name: 'Free',
    price: 0,
    priceDisplay: 'Free',
    limits: {
      projects: 1,
      endpoints: 3,
      submissions: 50,
    },
    features: [
      '1 Project',
      '3 Endpoints',
      '50 Submissions per month',
      'Basic email notifications',
      'Community support',
    ],
  },
  PRO: {
    id: 'PRO',
    name: 'Pro',
    price: 20,
    priceDisplay: '$20/month',
    limits: {
      projects: 5,
      endpoints: 20,
      submissions: 1000,
    },
    features: [
      '5 Projects',
      '20 Endpoints',
      '1000 Submissions per month',
      'Advanced email notifications',
      'Webhook integrations',
      'Priority support',
    ],
    popular: true,
  },
  GROWTH: {
    id: 'GROWTH',
    name: 'Growth',
    price: 40,
    priceDisplay: '$40/month',
    limits: {
      projects: 50,
      endpoints: 500,
      submissions: 10000,
    },
    features: [
      '50 Projects',
      '500 Endpoints',
      '10000 Submissions per month',
      'Advanced email notifications',
      'Webhook integrations',
      'Custom domains',
      'Analytics dashboard',
      'Priority support',
    ],
  },
  ENTERPRISE: {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: 0, // Custom pricing
    priceDisplay: 'Contact Us',
    limits: {
      projects: Infinity,
      endpoints: Infinity,
      submissions: Infinity,
    },
    features: [
      'Unlimited Projects',
      'Unlimited Endpoints',
      'Unlimited Submissions',
      'Advanced email notifications',
      'Webhook integrations',
      'Custom domains',
      'Advanced analytics',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
    ],
    contactUs: true,
  },
};

export const getPlanById = (planId: PlanType): Plan => {
  return PLANS[planId];
};

export const isWithinLimits = (
  currentUsage: { projects: number; endpoints: number; submissions: number },
  planId: PlanType
): { projects: boolean; endpoints: boolean; submissions: boolean } => {
  const plan = getPlanById(planId);
  
  return {
    projects: currentUsage.projects <= plan.limits.projects,
    endpoints: currentUsage.endpoints <= plan.limits.endpoints,
    submissions: currentUsage.submissions <= plan.limits.submissions,
  };
};

export const getUsagePercentage = (current: number, limit: number): number => {
  if (limit === Infinity) return 0;
  return Math.min((current / limit) * 100, 100);
};
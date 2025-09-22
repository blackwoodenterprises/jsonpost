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
      projects: 2,
      endpoints: 10,
      submissions: 500,
    },
    features: [
      '2 Projects',
      '10 Endpoints',
      '500 Submissions per month',
      'Email Notifications',
      'Webhooks',
      'Multi File Upload',
      'CORS Protection',
      'Secure Endpoints',
      'Zapier Integration',
      'Data Export',
      'Priority Support',
      'Advanced JSON Validation'
    ],
  },
  PRO: {
    id: 'PRO',
    name: 'Pro',
    price: 10,
    priceDisplay: '$10/month',
    limits: {
      projects: 5,
      endpoints: 50,
      submissions: 2000,
    },
    features: [
      '5 Projects',
      '50 Endpoints',
      '2000 Submissions per month',
      'Email Notifications',
      'Webhooks',
      'Multi File Upload',
      'CORS Protection',
      'Secure Endpoints',
      'Zapier Integration',
      'Data Export',
      'Priority Support',
      'Advanced JSON Validation'
    ],
    popular: true,
  },
  GROWTH: {
    id: 'GROWTH',
    name: 'Growth',
    price: 20,
    priceDisplay: '$20/month',
    limits: {
      projects: 20,
      endpoints: 200,
      submissions: 10000,
    },
    features: [
      '20 Projects',
      '200 Endpoints',
      '10000 Submissions per month',
      'Email Notifications',
      'Webhooks',
      'Multi File Upload',
      'CORS Protection',
      'Secure Endpoints',
      'Zapier Integration',
      'Data Export',
      'Priority Support',
      'Advanced JSON Validation'
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
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';
import { PLANS } from '@/lib/plans';
import { useToast } from '@/hooks/use-toast';

interface UpgradeConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  targetPlan: string;
  onUpgradeSuccess?: () => void;
}

export { UpgradeConfirmationModal };

function UpgradeConfirmationModal({
  isOpen,
  onClose,
  currentPlan,
  targetPlan,
  onUpgradeSuccess,
}: UpgradeConfirmationModalProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const { toast } = useToast();

  const current = PLANS[currentPlan as keyof typeof PLANS];
  const target = PLANS[targetPlan as keyof typeof PLANS];

  if (!current || !target) {
    return null;
  }

  const priceDifference = target.price - current.price;
  const isDowngrade = priceDifference < 0;

  const handlePlanChange = async () => {
    setIsUpgrading(true);
    
    try {
      const response = await fetch('/api/subscription/change-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPlanType: targetPlan,
        }),
      });

      console.log('=== PLAN CHANGE RESPONSE DEBUG ===');
      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Clone response to read it multiple times
      const responseClone = response.clone();
      const responseText = await responseClone.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        console.log('Response not OK, attempting to parse error...');
        try {
          const errorData = await response.json();
          console.log('Parsed error data:', errorData);
          throw new Error(errorData.error || `Failed to ${isDowngrade ? 'downgrade' : 'upgrade'} subscription`);
        } catch (parseError) {
          console.log('Failed to parse error response as JSON:', parseError);
          console.log('Raw error response:', responseText);
          throw new Error(`Invalid response from payment provider (Status: ${response.status})`);
        }
      }

      console.log('Response OK, attempting to parse success response...');
      try {
        const result = await response.json();
        console.log('Parsed success result:', result);
        console.log('=== END PLAN CHANGE RESPONSE DEBUG ===');
      } catch (parseError) {
        console.log('Failed to parse success response as JSON:', parseError);
        console.log('Raw success response:', responseText);
        console.log('=== END PLAN CHANGE RESPONSE DEBUG ===');
        throw new Error('Invalid response format from server');
      }
      
      toast({
        title: `${isDowngrade ? 'Downgrade' : 'Upgrade'} Successful!`,
        description: `You've been ${isDowngrade ? 'downgraded' : 'upgraded'} to the ${target.name} plan.`,
        variant: "success"
      });

      onUpgradeSuccess?.();
      onClose();
    } catch (error) {
      console.error('Plan change error:', error);
      toast({
        title: `${isDowngrade ? 'Downgrade' : 'Upgrade'} Failed`,
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: "destructive"
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isDowngrade ? 'Downgrade' : 'Upgrade'} Your Subscription</DialogTitle>
          <DialogDescription>
            You&apos;re about to {isDowngrade ? 'downgrade' : 'upgrade'} from {current.name} to {target.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current vs Target Plan Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Current Plan</h4>
                <Badge variant="outline">{current.name}</Badge>
              </div>
              <p className="text-2xl font-bold">${current.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">New Plan</h4>
                <Badge className={isDowngrade 
                  ? "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 hover:bg-orange-500/10 dark:hover:bg-orange-500/20"
                  : "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-500/10 dark:hover:bg-green-500/20"
                }>{target.name}</Badge>
              </div>
              <p className="text-2xl font-bold">${target.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            </div>
          </div>

          {/* Price Difference */}
          <div className="bg-muted/50 border p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {isDowngrade ? 'Monthly savings:' : 'Additional monthly cost:'}
              </span>
              <span className={`text-lg font-bold ${isDowngrade ? 'text-green-600' : 'text-primary'}`}>
                {isDowngrade ? `-$${Math.abs(priceDifference)}` : `+$${priceDifference}`}/month
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {isDowngrade 
                ? "Your next billing cycle will reflect the reduced amount."
                : "You'll be charged the prorated difference immediately."
              }
            </p>
          </div>

          {/* Feature Comparison */}
          <div className="space-y-3">
            <h4 className="font-medium">
              {isDowngrade ? `Changes with ${target.name}:` : `What you'll get with ${target.name}:`}
            </h4>
            <div className="space-y-2">
              {target.features.map((feature, index) => {
                const hasFeature = current.features.includes(feature);
                return (
                  <div key={index} className="flex items-center gap-2">
                    {hasFeature ? (
                      <Check className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                    <span className={hasFeature ? 'text-muted-foreground' : 'text-foreground'}>
                      {feature}
                    </span>
                    {!hasFeature && (
                      <Badge variant="secondary" className="ml-auto text-xs">New</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Limits Comparison */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Current Limits</h5>
              <div className="space-y-1 text-muted-foreground">
                <div>Projects: {current.limits.projects === -1 ? 'Unlimited' : current.limits.projects}</div>
                <div>Endpoints: {current.limits.endpoints === -1 ? 'Unlimited' : current.limits.endpoints}</div>
                <div>Submissions: {current.limits.submissions === -1 ? 'Unlimited' : current.limits.submissions.toLocaleString()}/month</div>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-2">New Limits</h5>
              <div className="space-y-1">
                <div>Projects: {target.limits.projects === -1 ? 'Unlimited' : target.limits.projects}</div>
                <div>Endpoints: {target.limits.endpoints === -1 ? 'Unlimited' : target.limits.endpoints}</div>
                <div>Submissions: {target.limits.submissions === -1 ? 'Unlimited' : target.limits.submissions.toLocaleString()}/month</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isUpgrading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePlanChange}
              disabled={isUpgrading}
              className="flex-1"
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isDowngrade ? 'Downgrading...' : 'Upgrading...'}
                </>
              ) : (
                `${isDowngrade ? 'Downgrade' : 'Upgrade'} to ${target.name}`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
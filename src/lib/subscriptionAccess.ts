import { supabase } from '@/integrations/supabase/client';
import { ALLOW_VIEW_ALL_CITIES } from '@/config/subscriptionConfig';

// Returns true if the user has an active subscription
export async function hasActiveSubscription(userId: string | undefined): Promise<boolean> {
  if (!userId) return false;
  // You would check your DB or Stripe here. For now, assume a 'subscriptions' table in Supabase
  const { data, error } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', userId)
    .single();
  if (error || !data) return false;
  return data.status === 'active';
}

// Returns a filtered list of groups based on subscription status
export function filterGroupsByAccess(groups: any[], isSubscribed: boolean) {
  if (ALLOW_VIEW_ALL_CITIES || isSubscribed) return groups;
  return groups.filter(g => {
    // Handle both IsFree and isFree, case-insensitive value
    const isFreeValue = g.IsFree ?? g.isFree;
    return typeof isFreeValue === 'string' && isFreeValue.trim().toLowerCase() === 'yes';
  });
}

// Returns the number of locked (paid) cities
export function countLockedCities(groups: any[]) {
  const locked = groups.filter(g => g.IsFree === 'no');
  const uniqueCities = new Set(locked.map(g => g.City));
  return uniqueCities.size;
}

// Returns the number of locked (paid) groups
export function countLockedGroups(groups: any[]) {
  return groups.filter(g => {
    const isFreeValue = g.IsFree ?? g.isFree;
    return typeof isFreeValue === 'string' && isFreeValue.trim().toLowerCase() === 'no';
  }).length;
}

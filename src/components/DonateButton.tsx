
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const DonateButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDonate = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-donation', {
        body: { 
          amount: 500, // $5.00 in cents
          currency: 'usd'
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDonate}
      disabled={loading}
      className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Heart className="h-4 w-4 mr-2" />
      )}
      {loading ? 'Processing...' : 'Donate $5'}
    </Button>
  );
};

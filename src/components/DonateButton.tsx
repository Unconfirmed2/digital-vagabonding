import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { STRIPE_TEST_MODE, STRIPE_TEST_DONATION_LINK, STRIPE_LIVE_DONATION_LINK } from '@/config/subscriptionConfig';

export const DonateButton: React.FC = () => {
  const handleDonate = () => {
    const url = STRIPE_TEST_MODE ? STRIPE_TEST_DONATION_LINK : STRIPE_LIVE_DONATION_LINK;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleDonate}
      className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2 shadow-lg transition-all duration-200"
    >
      <Heart className="h-4 w-4 mr-2" />
      Support Us
    </Button>
  );
};

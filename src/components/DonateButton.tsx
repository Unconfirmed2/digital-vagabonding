import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { STRIPE_TEST_MODE } from '@/config/subscriptionConfig';

const LIVE_LINK = 'https://buy.stripe.com/eVqeVeaH33P62LY1Hy7AI03';
const TEST_LINK = 'https://buy.stripe.com/test_aFa00kg1n71i4U671S7AI01';

export const DonateButton: React.FC = () => {
  const handleDonate = () => {
    const url = STRIPE_TEST_MODE ? TEST_LINK : LIVE_LINK;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleDonate}
      className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <Heart className="h-4 w-4 mr-2" />
      Support Us
    </Button>
  );
};

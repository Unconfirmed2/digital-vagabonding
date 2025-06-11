
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-green-600 fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You! 🙏
          </h1>
          <p className="text-gray-600">
            Your generous donation helps us maintain and grow Digital Vagabonding, 
            connecting travelers worldwide through community groups.
          </p>
        </div>

        <div className="space-y-3">
          <Link to="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500">
            Your support makes a difference in the travel community!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DonationSuccess;

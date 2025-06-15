import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MenuHeader } from '@/components/MenuHeader';
import { DonateButton } from '@/components/DonateButton';
import { Separator } from '@/components/ui/separator';

const DonationSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center p-4">
      {/* Main header */}
      <header className="w-full fixed top-0 left-0 z-50 border-b border-[#e0def7] h-[64px] shadow-inner bg-[#fffef5]">
        <div className="w-full px-[5vw]">
          <div className="flex items-center justify-between py-3">
            <Link to="/" className="flex items-center focus:outline-none h-10">
              <img
                src="/digital-vagabonding/Logo-noBR.png"
                alt="Digital Vagabonding Logo"
                className="h-10 w-10 mr-3 cursor-pointer"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-2xl font-bold text-gray-900 leading-none flex items-center h-full font-sans">
                Digital Vagabonding
              </span>
            </Link>
            <MenuHeader />
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div style={{ paddingTop: 80, width: '100%' }}>
        {/* Page title below header */}
        <div className="flex items-center mb-6 max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 ml-2">Donation Success</h1>
        </div>
        <Card className="max-w-md w-full p-8 text-center mx-auto">
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
            <p className="text-sm text-gray-500">
              Your support makes a difference in the travel community!
            </p>
          </div>
        </Card>
      </div>
      {/* Footer */}
      <footer className="rounded-t-2xl w-full border-t border-[#e0def7] h-[56px] md:h-[64px] bg-[#fffef5] fixed bottom-0 left-0 z-40 text-xs md:text-base">
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 relative h-full">
          <div className="flex-shrink-0 flex items-center w-full md:w-auto justify-center md:justify-start mb-1 md:mb-0">
            <DonateButton />
          </div>
          <div className="flex-1 text-center text-gray-700 text-xs md:text-base font-medium">
            Connecting travelers worldwide through community groups
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end mt-1 md:mt-0 text-xs text-gray-400">
            <Link to="/terms-of-service" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <Link to="/privacy-policy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <a href="/sitemap.xml" className="hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DonationSuccess;

import React from 'react';
import { Link } from 'react-router-dom';
import { MenuHeader } from '@/components/MenuHeader';
import { DonateButton } from '@/components/DonateButton';
import { Separator } from '@/components/ui/separator';

const AboutUs = () => (
  <div className="min-h-screen w-full bg-[#F8F7FF] flex flex-col">
    {/* Main header */}
    <header className="w-full fixed top-0 left-0 z-50 border-b border-[#e0def7] h-[64px] shadow-inner bg-[#fbf5f7]">
      <div className="w-full px-[5vw]">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center focus:outline-none h-10">
            <img
              src="/digital-vagabonding/Logo-noBR.png"
              alt="Digital Vagabonding Logo"
              className="h-10 w-10 mr-3 cursor-pointer"
              style={{ objectFit: 'contain' }}
            />
            <span className="text-[2.5rem] text-brand leading-none flex items-center h-full font-sans tracking-tight" style={{ fontWeight: 'normal', letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif', color: '#064e6b' }}>
              Digital VagaBonding
            </span>
          </Link>
          <MenuHeader />
        </div>
      </div>
    </header>
    {/* Spacer for fixed header */}
    <div className="container mx-auto px-4 flex-1 w-full" style={{ paddingTop: '80px' }}>
      {/* Page title below header, aligned and sized like body text */}
      <div className="flex items-center mb-6 max-w-4xl mx-auto">
        {/* <h1 className="text-xl font-bold text-gray-900 ml-2">About Us</h1> */}
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-sm p-0 md:p-8 mt-6 bg-transparent">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
          <p className="mb-4">At Digital VagaBonding, we're passionate about bridging the gap between expats, travelers, and digital nomads and the vibrant local communities they live in or travel to.</p>
          <h2 className="text-lg font-bold mt-8 mb-2">Our Mission</h2>
          <p className="mb-4">Our mission is simple: to make the world a smaller, more connected place. We believe that real, meaningful connections can transform a standard trip into a life-changing journey. To facilitate this, we've meticulously gathered and curated Facebook, Telegram, and WhatsApp groups for each city, serving as gateways to local insights, friendships, and experiences.</p>
          <h2 className="text-lg font-bold mt-8 mb-2">What We Do</h2>
          <p className="mb-4">We are more than just a directory. We offer a unique platform where travelers and expats can instantly find and join local groups across the world. From Buenos Aires to Bogotá, we've got you covered. Each group is a vibrant community where you can seek advice, share experiences, and make real connections that enrich your travels or expat life.</p>
          <h2 className="text-lg font-bold mt-8 mb-2">Our Values</h2>
          <p className="mb-4">Connection, Community, and Adventure are at the heart of everything we do. We are dedicated to providing a platform that is as diverse and dynamic as the nomads who use it. We believe that by connecting people, we can break down barriers, foster understanding, and create a more interconnected world.</p>
          <h2 className="text-lg font-bold mt-8 mb-2">Join Our Community</h2>
          <p className="mb-4">Whether you're looking for a local hiking group in Lima, a tech meet-up in Bali, or simply want to find the best coffee spots in Malaga, Digital VagaBonding is your go-to resource. Join us on this exciting journey, and let's make your travel experiences unforgettable.</p>
          <div className="mt-8 text-sm text-gray-700">
            For inquiries or support, please email: <a href="mailto:support@digitalvagabond.ing" className="text-blue-600 underline">support@digitalvagabond.ing</a>
          </div>
        </div>
      </div>
    </div>
    {/* Footer */}
    <footer className="rounded-t-2xl w-full border-t border-[#e0def7] h-[56px] md:h-[64px] bg-[#fbf5f7] fixed bottom-0 left-0 z-40 text-xs md:text-base">
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

export default AboutUs;

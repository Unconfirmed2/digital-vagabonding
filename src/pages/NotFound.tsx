import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnalyticsAndConsent } from "@/components/AnalyticsAndConsent";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-[64px] md:h-[72px] max-w-4xl">
          <a href="/" className="flex items-center focus:outline-none h-10 md:h-12">
            <img
              src="/Logo-noBR.png"
              alt="Digital Vagabonding Logo"
              className="h-8 w-8 md:h-10 md:w-10 mr-2 md:mr-3 cursor-pointer"
              style={{ objectFit: 'contain' }}
            />
            <span className="text-2xl md:text-[2.5rem] text-brand leading-none flex items-center h-full font-sans tracking-tight" style={{ fontWeight: 'normal', letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif', color: '#064e6b' }}>
              Digital VagaBonding
            </span>
          </a>
          {/* Menu button for NotFound page (optional, or you can import and use <MenuHeader /> if desired) */}
        </div>
      </div>
      {/* Spacer for fixed header */}
      <div style={{ paddingTop: "80px" }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Return to Home
          </a>
        </div>
      </div>
      <AnalyticsAndConsent />
    </div>
  );
};

export default NotFound;

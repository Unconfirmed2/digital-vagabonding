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
      <div className="fixed top-0 left-0 w-full z-50 border-b border-[#e0def7] max-h-[64px] shadow-inner bg-[#fbf5f7]">
        <div className="w-full px-[5vw]">
          <div className="flex items-center justify-between max-h-[64px] max-w-4xl mx-auto">
            <div className="flex items-center">
              <img
                src="/Logo-noBR.png"
                alt="Digital Vagabonding Logo"
                className="h-10 w-10 mr-3"
                style={{ objectFit: 'contain' }}
              />
              <div className="flex flex-col justify-between h-10 py-0">
                <a href="/" className="focus:outline-none h-full flex flex-col justify-between">
                  <span className="text-[2.5rem] text-brand leading-none flex items-center h-full font-sans tracking-tight" style={{ fontWeight: 'normal', letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif' }}>
                    Digital VagaBonding
                  </span>
                </a>
              </div>
            </div>
            {/* Optionally add <MenuHeader /> here if desired */}
          </div>
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

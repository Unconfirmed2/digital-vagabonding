import React, { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = 'G-428834331';

export const AnalyticsAndConsent: React.FC = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cookieConsent');
    if (stored === 'true') setConsent(true);
    else if (stored === 'false') setConsent(false);
  }, []);

  useEffect(() => {
    if (consent) {
      // Inject Google Analytics script
      if (!window.gtag) {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            page_path: window.location.pathname,
          });
        `;
        document.head.appendChild(script2);
      }
    }
  }, [consent]);

  if (consent) return null;

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 9999 }}>
      <div className="bg-gray-900 text-white px-4 py-3 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <span className="text-sm md:text-base mb-2 md:mb-0">
          This website uses cookies. We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.
        </span>
        <button
          className="ml-0 md:ml-4 mt-2 md:mt-0 px-4 py-2 bg-brand text-white rounded shadow hover:bg-brand/90 font-semibold"
          onClick={() => {
            setConsent(true);
            localStorage.setItem('cookieConsent', 'true');
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

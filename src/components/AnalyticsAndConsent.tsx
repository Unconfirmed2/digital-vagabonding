import React, { useEffect } from 'react';

export const AnalyticsAndConsent: React.FC = () => {
  useEffect(() => {
    // Exclude analytics on /sitemap or /sitemap.xml
    if (window.location.pathname.startsWith('/sitemap')) return;
    // Prevent duplicate script injection
    if (document.getElementById('gtag-js')) return;
    // Inject Google Analytics script
    const script1 = document.createElement('script');
    script1.id = 'gtag-js';
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-H5G8L6SEGD';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-H5G8L6SEGD');
    `;
    document.head.appendChild(script2);
  }, []);

  return null;
};

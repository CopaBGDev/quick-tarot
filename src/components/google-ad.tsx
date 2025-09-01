"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const GoogleAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // VAŽNO: Zamenite sa vašim publisher ID
        data-ad-slot="YYYYYYYYYY" // VAŽNO: Zamenite sa vašim ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

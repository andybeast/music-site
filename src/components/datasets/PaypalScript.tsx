'use client'
import React, { useEffect } from 'react';

interface PayPalScriptLoaderProps {
  clientId: string;
}

const PayPalScriptLoader: React.FC<PayPalScriptLoaderProps> = ({ clientId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      console.log('PayPal SDK script loaded');
      if (window.paypal) {
        console.log('PayPal SDK is available');
      } else {
        console.error('PayPal SDK is not available');
      }
    };
    script.onerror = () => {
      console.error('Failed to load PayPal SDK script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId]);

  return null;
};

export default PayPalScriptLoader;
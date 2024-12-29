'use client'

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/components/datasets/CartContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCustomId } from '@/src/hooks/useCustomId';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const { saveCustomId } = useCustomId();

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID!,
    currency: "USD",
    intent: "capture",
  };

  const handleRedirect = useCallback(() => {
    console.log('Redirecting to success page...');
    router.push('/checkout/success');
  }, [router]);

  const createOrder = async () => {
    console.log('Creating order...');
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: cartItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await response.json();
      console.log('Order created:', orderData);
      return orderData.id;
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while creating the order');
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    console.log('Payment approved, capturing order...', data);
    setIsProcessing(true);
    try {
      const details = await actions.order.capture();
      console.log('Order captured:', details);
      await handlePaymentSuccess(details);
    } catch (error) {
      console.error('Error capturing order:', error);
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (details: any) => {
    console.log('handlePaymentSuccess called with details:', details);
    clearCart();

    try {
      let customId = details.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id
        || details.purchase_units?.[0]?.custom_id
        || details.custom_id
        || details.id;

      if (!customId) {
        console.warn('CustomId not found in payment details, using order ID as fallback');
        customId = details.id;
      }

      console.log('Storing customId:', customId);
      await saveCustomId(customId);

      console.log('Fetching download URLs...');
      const response = await fetch(`/api/digital-asset?customId=${encodeURIComponent(customId)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch download URLs');
      }

      const { downloadUrls } = await response.json();
      console.log('Received download URLs:', downloadUrls);
      
      localStorage.setItem('downloadUrls', JSON.stringify(downloadUrls));

      console.log('Triggering redirect...');
      handleRedirect();
    } catch (error) {
      console.error('Error in handlePaymentSuccess:', error);
      setError('An error occurred while processing your order. Please contact support.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="min-h-screen bg-zinc-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-500">
              Your cart is empty
            </h2>
            <div className="mt-8 text-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <PayPalScriptProvider options={initialOptions}>
        <div className="min-h-screen bg-zinc-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-500">
              Checkout
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <ul className="divide-y divide-gray-200 mb-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.attribute}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              {error && (
                <div className="mt-4 text-red-600 text-sm">
                  Error: {error}
                </div>
              )}
              <div id="paypal-button-container" className="mt-12">
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={(err) => {
                    console.error('PayPal error:', err);
                    setError('An error occurred with PayPal. Please try again.');
                  }}
                  disabled={isProcessing}
                />
              </div>
              <Link href="/" className="block text-center text-blue-600 hover:text-blue-800 mt-4">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </PayPalScriptProvider>
    </div>
  );
}


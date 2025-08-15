import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Move this inside the component to handle errors better
const getStripePromise = () => {
  const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  if (!key) {
    throw new Error('Stripe public key is missing. Please check your environment variables.');
  }
  return loadStripe(key);
};

const stripePromise = getStripePromise();

interface PaymentButtonProps {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
}

export function PaymentButton({ items }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate Stripe initialization on mount
  useEffect(() => {
    const validateStripe = async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) {
          setError('Stripe failed to initialize');
        }
      } catch (err) {
        setError('Failed to load Stripe');
        console.error('Stripe initialization error:', err);
      }
    };

    validateStripe();
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ 
          items: items.map(item => ({
            ...item,
            price: Math.round(item.price * 100), // Convert to cents for Stripe
          })),
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/`,
        }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      setError(errorMessage);
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}
      <button
        onClick={handlePayment}
        disabled={loading || items.length === 0 || !!error}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
      >
        {loading ? 'Processing...' : 'Proceed to Checkout'}
      </button>
    </div>
  );
}






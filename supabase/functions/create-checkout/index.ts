import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Stripe } from "npm:stripe@13.11.0";

// Update CORS headers to allow your development server
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5174', // Update with your dev server port
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validate that we have the secret key
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { items, success_url, cancel_url } = await req.json();

    if (!items?.length) {
      throw new Error('No items provided');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : undefined,
          },
          unit_amount: item.price, // Price should already be in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: success_url || `${req.headers.get('origin')}/success`,
      cancel_url: cancel_url || `${req.headers.get('origin')}/`,
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Stripe error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});






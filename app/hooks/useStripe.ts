import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstace = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      setStripe(stripeInstace)  
    }

    loadStripeAsync()
  }, []);

  async function createStripePaymentCheckout(checkoutData: any) {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/create-pay-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(checkoutData)
      })

      const data = await response.json();

      await stripe.redirectToCheckout({ sessionId: data.sessionId });


    } catch (error) {
      console.error(error)
    }

  } 

  async function createSubscriptionCheckout(checkoutData: any) {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/create-subscription-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(checkoutData)

      })

      const data = await response.json();

      await stripe.redirectToCheckout({ sessionId: data.sessionId });

    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateStripePortal(){
    const response = await fetch("/api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json();

    window.location.href = data.url;
    
  }

  return {
    createStripePaymentCheckout,
    createSubscriptionCheckout,
    handleCreateStripePortal
  }
}
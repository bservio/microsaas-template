import { db } from "@/app/lib/firebase";
import "server-only"
import Stripe from "stripe";

export async function handleStripeSubscription(event: Stripe.CheckoutSessionCompletedEvent) {
  if (event.data.object.payment_status === "paid") {
    console.log("Assinatura criada com sucesso")
    const metadata = event.data.object.metadata;

    const useId = metadata?.userId;

    if (!useId) {
      console.error("User ID not found")
      return
    }

    await db.collection("users").doc(useId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
      
    })
  }
  
}




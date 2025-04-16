import "server-only"
import Stripe from "stripe";

export async function handleStripeCancelSubscription(event: Stripe.CustomerSubscriptionDeletedEvent) {
  console.log("Assinatura cancelada")
}

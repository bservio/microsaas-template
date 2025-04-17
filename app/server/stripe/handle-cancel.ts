import { db } from "@/app/lib/firebase";
import "server-only"
import Stripe from "stripe";

export async function handleStripeCancelSubscription(event: Stripe.CustomerSubscriptionDeletedEvent) {
  console.log("Assinatura cancelada")

  const metadata = event.data.object.metadata;

  const customerId = metadata?.customerId;

  const userRef = await db.collection("users").where("stripeCustomerId", "==", customerId).get();

  if (userRef.empty) {
    console.error("User not found")
    return
  }

  const userDoc = userRef.docs[0];
  const userId = userDoc.id;

  if (!userId) {
    console.error("User ID not found")
    return
  }
  

  await db.collection("users").doc(userId).update({
    subscriptionStatus: "inactive",
    
  })
}

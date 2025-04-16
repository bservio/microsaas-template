import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import "server-only";

export async function getOrCreateCostumer(userId: string, userEmail: string) {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("User not found")
      
    }

    const stripeCostumerId = userDoc.data()?.stripeCostumerId;

    if (stripeCostumerId) {
      return stripeCostumerId;
    }

    const userName = userDoc.data()?.name;

    const stripeCustomer = await stripe.customers.create({
      email: userEmail,
      ...(userName && { name: userName }),
      metadata: {
        userId,
      }
    })

    await userRef.update({
      stripeCostumerId: stripeCustomer.id,
    })

    return stripeCustomer.id;

  
  } catch (error) {
    console.error(error)
    throw new Error("Failed to get or create costumer")
  }
}

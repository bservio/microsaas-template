import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers()
    const signature = headersList.get("stripe-signature");

    if (!signature || !secret) {
      return NextResponse.json({ error: "No signature or secret" }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed": // Pagamento realizado com sucesso
        const metadata = event.data.object.metadata;

        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          handleStripePayment(event)
        }

        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          handleStripeSubscription(event)
        }

        break;
      case "checkout.session.expired": // Pagamento expirado
        console.log("Pagamento expirado")
        break;
      case "checkout.session.async_payment_succeeded": // Pagamento realizado com sucesso
        console.log("Pagamento realizado com sucesso")
        break;
      case "checkout.session.async_payment_failed": // Pagamento falhou
        console.log("Pagamento falhou")
        break;
      case "customer.subscription.created": // Assinatura criada
        console.log("Assinatura criada")
        break;
      case "customer.subscription.updated": // Assinatura atualizada
        console.log("Assinatura atualizada")
        break;
      case "customer.subscription.deleted": // Assinatura cancelada
        await handleStripeCancelSubscription(event)
        break;
      default:
        console.log(`Evento não tratado: ${event.type}`)
        break;
     
    }
    return NextResponse.json({ message: "Evento processado com sucesso" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erro ao processar o evento" }, { status: 500 })
  }
  
  
}

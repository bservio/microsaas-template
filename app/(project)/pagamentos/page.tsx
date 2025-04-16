"use client"
import { useStripe } from "@/app/hooks/useStripe"

export default function Pagamentos () {
  const { createStripePaymentCheckout, createSubscriptionCheckout, handleCreateStripePortal } = useStripe();
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Pagamentos</h1>
      <button className="bg-blue-200 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => createStripePaymentCheckout({ testId: "123" })}>Criar Pagamento Stripe</button>
      <button className="bg-blue-200 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => createSubscriptionCheckout({ testId: "123" }) }>Criar Assinatura Stripe</button>
      <button className="bg-blue-200 text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleCreateStripePortal}>Criar Portal Stripe</button>
    </div>
  )
}
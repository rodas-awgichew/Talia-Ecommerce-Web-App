import { stripe } from "@/src/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text(); 
  const sig = headers().get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("✅ Payment successful:", session);

  }

  return new Response("OK", { status: 200 });
}


import { stripe } from "@/src/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers(); // ✅ FIX
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return new Response("Missing signature", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("✅ Payment successful:", session);

    // TODO: save to database (Supabase later)
  }

  return new Response("OK", { status: 200 });
}
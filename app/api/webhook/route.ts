import { stripe } from "@/src/lib/stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();
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
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Update order status to paid
    const { error } = await supabase
      .from("orders")
      .update({
        status: "paid",
        stripe_session_id: session.id
      })
      .eq("id", session.metadata.order_id);

    if (error) {
      console.error("Order update error:", error);
      return new Response("Order update failed", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
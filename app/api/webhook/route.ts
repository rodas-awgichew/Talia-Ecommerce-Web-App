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

    const items = JSON.parse(session.metadata.items);

    // Create order
    const { data: order } = await supabase
      .from("orders")
      .insert({
        user_id: session.metadata.user_id,
        total: session.amount_total / 100,
        status: "paid",
        stripe_session_id: session.id,
      })
      .select()
      .single();

    // Create order items
    await supabase.from("order_items").insert(
      items.map((item: any) => ({
        order_id: order.id,
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color,
      }))
    );
  }

  return new Response("OK", { status: 200 });
}
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {

    const body = await req.json();
    const items = body.items;

    console.log("Items received:", items);

    console.log("Stripe key:", process.env.STRIPE_SECRET_KEY);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",

          product_data: {
            name: item.name,
          },

          unit_amount: Math.round(item.price * 100),
        },

        quantity: item.quantity,
      })),

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cart",
    });

    console.log("Stripe session created:", session.id);

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {

    console.error("CHECKOUT ERROR:", error);

    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
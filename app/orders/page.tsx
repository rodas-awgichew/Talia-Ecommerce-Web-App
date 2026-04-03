"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/src/lib/supabaseClient";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      setOrders(data || []);
    };

    fetchOrders();
  }, []);

  if (!orders.length) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-serif">No orders yet</h2>
        <p className="text-gray-500 mt-2">
          When you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-6">
      <h1 className="text-3xl font-serif mb-6">Your Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Order ID: {order.id}</span>
            <span className="uppercase text-sm">{order.status}</span>
          </div>

          <p className="text-gray-500">
            Total: ${order.total}
          </p>

          <div className="mt-4">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="text-sm">
                {item.name} × {item.quantity}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/src/lib/supabaseClient";
import { formatPrice } from "@/src/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  TrendingUp,
} from "lucide-react";

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
  user_id: string;
};

export default function AdminDashboard() {
  const supabase = getSupabaseBrowserClient();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  // 🔥 Derived metrics
  const totalRevenue = orders.reduce((acc, o) => acc + Number(o.total), 0);
  const totalOrders = orders.length;

  const uniqueUsers = new Set(orders.map((o) => o.user_id)).size;

  const recentOrders = orders.slice(0, 5);

  if (loading) return <div className="p-10">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-bone p-8 lg:p-12 space-y-12">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-serif">Admin Dashboard</h1>
        <p className="text-xs uppercase tracking-widest text-charcoal/40">
          Real-time store insights
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <StatCard
          icon={TrendingUp}
          label="Revenue"
          value={formatPrice(totalRevenue)}
        />

        <StatCard
          icon={ShoppingBag}
          label="Orders"
          value={totalOrders.toString()}
        />

        <StatCard
          icon={Users}
          label="Customers"
          value={uniqueUsers.toString()}
        />

      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white border border-charcoal/5">
        <div className="p-6 border-b">
          <h2 className="text-xs uppercase tracking-widest font-bold">
            Recent Orders
          </h2>
        </div>

        <table className="w-full text-left">
          <thead className="text-xs uppercase text-charcoal/40">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">User</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.id.slice(0, 8)}</td>
                <td className="p-4">{order.user_id.slice(0, 6)}</td>
                <td className="p-4 font-serif">
                  {formatPrice(order.total)}
                </td>
                <td className="p-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/* 🔹 Reusable Stat Card */
function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-white p-6 border border-charcoal/5 space-y-3">
      <Icon size={20} />
      <p className="text-xs uppercase tracking-widest text-charcoal/40">
        {label}
      </p>
      <p className="text-2xl font-serif">{value}</p>
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const salesData = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 150 },
  { day: "Wed", value: 180 },
  { day: "Thu", value: 140 },
  { day: "Fri", value: 200 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 70 },
];

export default function AdminDashboard() {
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onopen = () => setConnectionStatus("Connected");
    eventSource.onerror = () => setConnectionStatus("Disconnected");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.message]);
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 lg:px-16 space-y-10">

      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-4xl font-serif text-zinc-900">
          Admin Dashboard
        </h1>
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Women’s Luxury Commerce
        </p>
        <p className="text-xs text-zinc-400">
          SSE: {connectionStatus}
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Revenue" className="p-3" value="$12,430" />
        <StatCard label="Orders" className="p-3" value="320" />
        <StatCard label="Customers" className="p-3" value="128" />
        <StatCard label="Conversion" className="p-3" value="2.4%" />
      </div>

      {/* TABS */}
      <Tabs defaultValue="overview" className="flex flex-col space-y-10">

  {/* TAB LIST */}
  <TabsList className="inline-flex items-center gap-4 border-b border-zinc-200 self-start">
    <TabsTrigger
      value="overview"
      className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-700 hover:bg-zinc-200 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
    >
      Overview
    </TabsTrigger>
    <TabsTrigger
      value="orders"
      className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-700 hover:bg-zinc-200 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
    >
      Orders
    </TabsTrigger>
    <TabsTrigger
      value="customers"
      className="px-4 py-2 rounded-md bg-zinc-100 text-zinc-700 hover:bg-zinc-200 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
    >
      Customers
    </TabsTrigger>
  </TabsList>

  {/* OVERVIEW TAB */}
  <TabsContent value="overview" className="space-y-10">
    {/* CHARTS */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* BAR CHART */}
      <Card className="border border-zinc-200">
        <CardContent className="p-6">
          <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
            Sales Overview
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* LINE CHART */}
      <Card className="border border-zinc-200">
        <CardContent className="p-6">
          <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
            Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line type="monotone" dataKey="value" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    {/* RECENT ORDERS */}
    <div className="space-y-4">
      <h2 className="text-sm uppercase tracking-widest text-zinc-500">
        Recent Orders
      </h2>
      <Card className="border border-zinc-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-100 p-5">
                <TableHead className="p-4">Order</TableHead>
                <TableHead className="p-4">Customer</TableHead>
                <TableHead className="p-4">Total</TableHead>
                <TableHead className="p-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell>#ORD{i}23</TableCell>
                  <TableCell>Client {i}</TableCell>
                  <TableCell>$120</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Processing</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </TabsContent>

  {/* OTHER TABS */}
  <TabsContent value="orders" className="space-y-10">
    <p className="text-sm text-zinc-500">Orders management coming...</p>
  </TabsContent>

  <TabsContent value="customers" className="space-y-10">
    <p className="text-sm text-zinc-500">Customer insights coming...</p>
  </TabsContent>
</Tabs>

    </div>
  );
}

/* STAT CARD */
function StatCard({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <Card className="border border-zinc-200">
      <CardContent className={`p-5 space-y-1 ${className || ''}`}>
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          {label}
        </p>
        <p className="text-xl font-serif text-zinc-900">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}



// "use client";

// import { useEffect, useState } from "react";

// export default function AdminDashboard() {
//   const [connectionStatus, setConnectionStatus] = useState("Connecting...");
//   const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     const eventSource = new EventSource("/api/sse");

//     eventSource.onopen = () => {
//       setConnectionStatus("Connected");
//     };

//     eventSource.onerror = () => {
//       setConnectionStatus("Disconnected");
//     };

//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setMessages((prev) => [...prev, data.message]);
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-bone p-8 lg:p-12 space-y-12">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-serif">Admin Dashboard</h1>
//         <p className="text-xs uppercase tracking-widest text-charcoal/40">
//           Real-time store insights
//         </p>
//         <p className="text-xs text-charcoal/60 mt-2">
//           SSE Status: {connectionStatus}
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Add stat cards here later */}
//       </div>

//       {/* LIVE SSE FEED */}
//       <div className="bg-white border border-charcoal/5 p-6">
//         <h2 className="text-xs uppercase tracking-widest font-bold mb-4">
//           Live Server Messages
//         </h2>
//         {messages.length === 0 ? (
//           <p className="text-sm text-charcoal/40">No messages yet...</p>
//         ) : (
//           <ul className="space-y-2 text-sm text-charcoal/70">
//             {messages.map((msg, idx) => (
//               <li key={idx} className="border-b pb-2">{msg}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }




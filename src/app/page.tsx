"use client";

import PricingCard from "@/features/PricingCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Live Cryptocurrency Prices
        </h1>
        <p className="text-gray-600 mb-4">
          Updated in real-time via WebSockets
        </p>

        <div className="grid gap-6">
          <PricingCard />
        </div>
      </div>
    </main>
  );
}

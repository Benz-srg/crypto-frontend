"use client";
import { useState, useCallback } from "react";

export default function AddCrypto() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cryptocurrencies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, symbol, price: parseFloat(price) }),
        }
      );

      if (res.ok) {
        alert("Cryptocurrency added!");
        setName("");
        setSymbol("");
        setPrice("");
      } else {
        alert("Failed to add cryptocurrency");
      }
    },
    [name, symbol, price]
  );

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-3xl font-semibold text-gray-900">
          Add Cryptocurrency
        </h2>

        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Symbol</label>
          <input
            type="text"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Price (USD)</label>
          <input
            type="number"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Add Cryptocurrency
        </button>
      </form>
    </main>
  );
}

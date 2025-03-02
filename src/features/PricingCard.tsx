"use client";
import { Crypto } from "@/types/crypto";
import { withCryptoSocket } from "@/hoc/withCryptoSocket";

interface PricingCardProps {
  cryptoList: Crypto[];
  variant?: "light" | "dark";
}

function PricingCard({ cryptoList, variant = "light" }: PricingCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`shadow-md rounded-xl p-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold">
        {isDark ? "Pricing Card VM" : "Pricing Card"}
      </h2>
      <ul className="mt-4 space-y-2">
        {cryptoList.length > 0 ? (
          cryptoList.map((crypto) => (
            <li key={crypto.id} className="flex justify-between">
              <span>
                {crypto.name} ({crypto.symbol})
              </span>
              <span className="font-semibold">${crypto.price.toFixed(2)}</span>
            </li>
          ))
        ) : (
          <p>Loading live prices...</p>
        )}
      </ul>
    </div>
  );
}

export default withCryptoSocket(PricingCard);

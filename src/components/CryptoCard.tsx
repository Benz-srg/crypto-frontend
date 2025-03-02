import React from "react";
import { Crypto } from "@/types/crypto";

const CryptoCard: React.FC<Crypto> = ({ name, symbol, price, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        <h2 className="text-lg font-bold">
          {name} ({symbol})
        </h2>
        <p className="text-gray-600">${price ? price.toFixed(2) : "N/A"}</p>
      </div>
    </div>
  );
};

export default CryptoCard;

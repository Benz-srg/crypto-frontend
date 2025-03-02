import { useState } from "react";

interface AddCryptoFormProps {
  closeDialog: () => void;
}

const AddCryptoForm: React.FC<AddCryptoFormProps> = ({ closeDialog }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
      closeDialog();
    } else {
      alert("Failed to add cryptocurrency");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Add Cryptocurrency
      </h2>

      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Symbol</label>
        <input
          type="text"
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Price (USD)</label>
        <input
          type="number"
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default AddCryptoForm;

"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import { cryptoListAtom } from "@/store/cryptoStore";
import { numberWithComma, formatUpdatedAt } from "@/format/utils";
import CryptoForm from "@/components/CryptoForm";
import Dialog from "@/components/Dialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import Button, { ButtonTheme } from "@/components/Button";
import { deleteCrypto } from "@/services/cryptoService";
import { Crypto } from "@/types/crypto";
import { withCryptoSocket } from "@/hoc/withCryptoSocket";
import { useToast } from "@/hooks/useToast";

function PricingCard() {
  const [cryptoList, setCryptoList] = useAtom(cryptoListAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const { showToast } = useToast();

  const handleAdd = () => {
    setSelectedCrypto(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    setIsDialogOpen(true);
  };

  const handleDelete = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCrypto) return;
    try {
      await deleteCrypto(selectedCrypto.id);
      setCryptoList((prevList) =>
        prevList.filter((crypto) => crypto.id !== selectedCrypto.id)
      );
      showToast("Cryptocurrency deleted successfully!", "success");
      setIsConfirmOpen(false);
    } catch (error) {
      showToast(`❌ Failed to delete cryptocurrency: ${error}`, "error");
    }
  };

  const sortedCryptoList = cryptoList.slice().sort((a, b) => {
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="shadow-md rounded-xl p-6 bg-white text-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Pricing Card</h2>
        <Button onClick={handleAdd}>+ Add Crypto</Button>
      </div>

      {sortedCryptoList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border-b">Image</th>
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Symbol</th>
                <th className="px-4 py-2 text-right border-b">Price (USDT)</th>
                <th className="px-4 py-2 text-center border-b">Updated At</th>
                <th className="px-4 py-2 text-center border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCryptoList.map((crypto) => (
                <tr key={crypto.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <div className="flex justify-center">
                      {crypto.image ? (
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="w-8 h-8 object-cover rounded-full"
                        />
                      ) : (
                        "-"
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">{crypto.name}</td>
                  <td className="px-4 py-2 border-b">{crypto.symbol}</td>
                  <td className="px-4 py-2 border-b text-right">
                    {numberWithComma(crypto.price)} USDT
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {crypto.updatedAt ? formatUpdatedAt(crypto.updatedAt) : "-"}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <div className="flex justify-center gap-x-2">
                      <Button
                        theme={ButtonTheme.edit}
                        onClick={() => handleEdit(crypto)}
                      >
                        Edit
                      </Button>
                      <Button
                        theme={ButtonTheme.delete}
                        onClick={() => handleDelete(crypto)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading live prices...</p>
      )}

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <CryptoForm
          closeDialog={() => setIsDialogOpen(false)}
          initialData={
            selectedCrypto
              ? {
                  id: selectedCrypto.id,
                  name: selectedCrypto.name,
                  symbol: selectedCrypto.symbol,
                  price: selectedCrypto.price,
                }
              : undefined
          }
        />
      </Dialog>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${selectedCrypto?.name}?`}
      />
    </div>
  );
}

export default withCryptoSocket(PricingCard);

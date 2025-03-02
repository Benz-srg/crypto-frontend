import { useEffect, useState, ComponentType } from "react";
import { io } from "socket.io-client";
import { Crypto } from "@/types/crypto";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

interface WithCryptoSocketProps {
  cryptoList: Crypto[];
}

export function withCryptoSocket<T extends WithCryptoSocketProps>(
  WrappedComponent: ComponentType<T>
) {
  return function ComponentWithCryptoSocket(props: Omit<T, "cryptoList">) {
    const [cryptoList, setCryptoList] = useState<Crypto[]>([]);

    useEffect(() => {
      console.log("📡 Connecting to WebSocket...");

      const socket = io(SOCKET_URL);

      socket.on("cryptoList", (data: Crypto[]) => {
        console.log("🔥 Received initial crypto list from WebSocket:", data);
        setCryptoList(
          data.map((crypto) => ({
            ...crypto,
            price: crypto.price ?? 0,
          }))
        );
      });

      socket.on("coinUpdate", (updatedCoin: Crypto) => {
        console.log("🔄 Received coin update:", updatedCoin);
        setCryptoList((prevList) =>
          prevList.map((coin) =>
            coin.id === updatedCoin.id
              ? { ...coin, price: updatedCoin.price ?? 0 }
              : coin
          )
        );
      });

      return () => {
        console.log("❌ Disconnecting from WebSocket...");
        socket.disconnect();
      };
    }, []);

    return <WrappedComponent {...(props as T)} cryptoList={cryptoList} />;
  };
}

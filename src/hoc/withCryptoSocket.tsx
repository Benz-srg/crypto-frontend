import { useEffect, useState, ComponentType } from "react";
import { io, Socket } from "socket.io-client";
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
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
      console.log("📡 Connecting to WebSocket...");

      const newSocket = io(SOCKET_URL, {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 3000,
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("✅ WebSocket Connected:", newSocket.id);
      });

      newSocket.on("cryptoList", (data: Crypto[]) => {
        console.log("🔥 Received initial crypto list from WebSocket:", data);
        setCryptoList(
          data.map((crypto) => ({
            ...crypto,
            price: crypto.price ?? 0,
          }))
        );
      });

      newSocket.on("coinUpdate", (updatedCoin: Crypto) => {
        console.log("🔄 Received coin update:", updatedCoin);
        setCryptoList((prevList) =>
          prevList.map((coin) =>
            coin.id === updatedCoin.id
              ? { ...coin, price: updatedCoin.price ?? 0 }
              : coin
          )
        );
      });

      newSocket.on("disconnect", (reason) => {
        console.warn("❌ WebSocket Disconnected:", reason);
      });

      newSocket.on("reconnect_attempt", (attempt) => {
        console.log(`🔄 Reconnecting... Attempt #${attempt}`);
      });

      newSocket.on("reconnect", () => {
        console.log("✅ Reconnected to WebSocket!");
      });

      return () => {
        console.log("❌ Disconnecting from WebSocket...");
        newSocket.disconnect();
      };
    }, []);

    return <WrappedComponent {...(props as T)} cryptoList={cryptoList} />;
  };
}

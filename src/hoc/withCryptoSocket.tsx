import { useEffect, useState, ComponentType } from "react";
import { io, Socket } from "socket.io-client";
import { useAtom } from "jotai";
import { cryptoListAtom } from "@/store/cryptoStore";
import { Crypto } from "@/types/crypto";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

export function withCryptoSocket<T extends object>(
  WrappedComponent: ComponentType<T>
) {
  return function ComponentWithCryptoSocket(props: T) {
    const [, setCryptoList] = useAtom(cryptoListAtom);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
      console.log("📡 Attempting to connect to WebSocket at:", SOCKET_URL);

      const newSocket = io(SOCKET_URL, {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 3000,
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("✅ WebSocket Connected:", newSocket.id);
      });

      newSocket.on("connect_error", (error) => {
        console.error("❌ Connection error:", error);
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

        setCryptoList((prevList) => {
          const exists = prevList.some((coin) => coin.id === updatedCoin.id);
          if (exists) {
            return prevList.map((coin) =>
              coin.id === updatedCoin.id
                ? {
                    ...coin,
                    name: updatedCoin.name || coin.name,
                    symbol: updatedCoin.symbol || coin.symbol,
                    price: updatedCoin.price ?? 0,
                    updatedAt: updatedCoin.updatedAt || coin.updatedAt,
                  }
                : coin
            );
          } else {
            console.log("➕ Adding new cryptocurrency:", updatedCoin);
            return [...prevList, updatedCoin];
          }
        });
      });

      newSocket.on("fetchCryptoList", () => {
        console.log("🔄 Fetching crypto list again...");
        newSocket.emit("getCryptoList");
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

    return <WrappedComponent {...props} />;
  };
}

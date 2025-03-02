import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Crypto } from "@/types/crypto";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

export const useCryptoSocket = () => {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("cryptoList", (data: Crypto[]) => {
      console.log("Received crypto list:", data);
      setCryptoList(data);
    });

    socket.on("coinUpdate", (updatedCoin: Crypto) => {
      setCryptoList((prevList) =>
        prevList.map((coin) =>
          coin.id === updatedCoin.id
            ? { ...coin, price: updatedCoin.price }
            : coin
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return cryptoList;
};

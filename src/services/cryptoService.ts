import { fetchData } from "@/hooks/useFetch";
import { Cryptocurrency } from "@/types/crypto";

export const createOrUpdateCrypto = async (
  payload: Partial<Cryptocurrency> & { id?: string }
) => {
  const endpoint = payload.id
    ? `/cryptocurrencies/${payload.id}`
    : `/cryptocurrencies`;
  const method = payload.id ? "PUT" : "POST";

  delete payload.id;

  return await fetchData(method, endpoint, payload);
};

export const deleteCrypto = async (cryptoId: string) => {
  return await fetchData("DELETE", `/cryptocurrencies/${cryptoId}`);
};

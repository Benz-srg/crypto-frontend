import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface FetchOptions {
  endpoint: string;
  method?: HttpMethod;
  body?: any;
  autoFetch?: boolean;
}

export function useFetch<T>({
  endpoint,
  autoFetch = true,
}: FetchOptions): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoFetch) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(`🚀 Fetching data from ${API_BASE_URL}${endpoint}...`);
        const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(`⚠️ API Error [GET ${endpoint}]:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, autoFetch]);

  return { data, loading, error };
}

export async function fetchData<T>(
  method: HttpMethod,
  endpoint: string,
  body?: any
): Promise<T | null> {
  try {
    console.log(
      `🚀 Sending ${method} request to ${API_BASE_URL}${endpoint}...`
    );
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data: body,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (err) {
    console.error(`⚠️ API Error [${method} ${endpoint}]:`, err);
    throw new Error("Failed to fetch data");
  }
}

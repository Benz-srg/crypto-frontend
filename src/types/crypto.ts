export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
  updatedAt: string;
}

export interface Cryptocurrency {
  name: string;
  symbol: string;
  price?: number;
}

export interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

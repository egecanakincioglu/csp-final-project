import axios from 'axios';
import type { CoinMarketData, CoinDetailData } from '../types/crypto';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: COINGECKO_BASE_URL,
  headers: {
    accept: 'application/json',
  },
});

export const getTopCoins = async (vsCurrency = 'usd', perPage = 50): Promise<CoinMarketData[]> => {
  const response = await api.get<CoinMarketData[]>('/coins/markets', {
    params: {
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: perPage,
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};

export const getCoinDetail = async (id: string): Promise<CoinDetailData> => {
  const response = await api.get<CoinDetailData>(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
  return response.data;
};
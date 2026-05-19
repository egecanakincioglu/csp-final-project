import { useState, useEffect } from 'react';
import { getTopCoins } from '../services/api';
import type { CoinMarketData } from '../types/crypto';

export const Dashboard = () => {
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await getTopCoins();
        setCoins(data);
        setError(null);
      } catch (err) {
        console.error('An error occurred while retrieving data:', err);
        setError('Cryptocurrency data could not be loaded. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading cryptocurrency data...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cryptocurrency World (Dashboard)</h2>
      <p>Number of coins successfully retrieved: {coins.length}</p>

      <ul>
        {coins.slice(0, 3).map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};
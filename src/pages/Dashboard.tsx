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
        console.error(err);
        setError('Failed to fetch crypto data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <div style={{ padding: '20px', color: '#fff' }}>Loading crypto data...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px' }}>Crypto Market Dashboard</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333', color: '#aaa' }}>
            <th style={{ padding: '12px' }}>#</th>
            <th style={{ padding: '12px' }}>Coin</th>
            <th style={{ padding: '12px' }}>Price</th>
            <th style={{ padding: '12px' }}>24h Change</th>
            <th style={{ padding: '12px' }}>24h Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const isPositive = coin.price_change_percentage_24h >= 0;
            return (
              <tr key={coin.id} style={{ borderBottom: '1 solid #222', transition: 'background 0.2s' }}>
                <td style={{ padding: '12px' }}>{coin.market_cap_rank}</td>
                <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={coin.image} alt={coin.name} style={{ width: '24px', height: '24px' }} />
                  <strong>{coin.name}</strong>
                  <span style={{ color: '#aaa', textTransform: 'uppercase', fontSize: '12px' }}>{coin.symbol}</span>
                </td>
                <td style={{ padding: '12px' }}>${coin.current_price.toLocaleString()}</td>
                <td style={{ padding: '12px', color: isPositive ? '#4caf50' : '#f44336' }}>
                  {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td style={{ padding: '12px' }}>${coin.total_volume.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
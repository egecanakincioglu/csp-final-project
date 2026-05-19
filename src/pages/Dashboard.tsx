import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopCoins } from '../services/api';
import type { CoinMarketData } from '../types/crypto';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await getTopCoins();
        setCoins(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.status === 429 
          ? 'Rate limit exceeded. Please wait a minute and refresh.' 
          : 'Failed to fetch crypto data. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const filteredCoins = useMemo(() => {
    if (!Array.isArray(coins)) return [];
    return coins.filter((coin) =>
      coin?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin?.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coins, searchTerm]);

  if (loading) return <div style={{ padding: '30px', color: '#fff', backgroundColor: '#141414', minHeight: '100vh' }}>Loading crypto data...</div>;
  if (error) return <div style={{ padding: '30px', color: '#f44336', backgroundColor: '#141414', minHeight: '100vh' }}>{error}</div>;

  return (
    <div style={{ padding: '40px 20px', fontFamily: '"Segoe UI", Roboto, sans-serif', backgroundColor: '#141414', color: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 600, letterSpacing: '-0.5px' }}>Crypto Market Dashboard</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Search coin by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '8px',
              border: '1px solid #2d2d2d',
              backgroundColor: '#1e1e1e',
              color: '#fff',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        <div style={{ overflowX: 'auto', backgroundColor: '#1e1e1e', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2d2d2d', color: '#888', fontSize: '14px' }}>
                <th style={{ padding: '16px 20px' }}>#</th>
                <th style={{ padding: '16px 20px' }}>Coin</th>
                <th style={{ padding: '16px 20px' }}>Price</th>
                <th style={{ padding: '16px 20px' }}>24h Change</th>
                <th style={{ padding: '16px 20px' }}>24h Volume</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => {
                const change24h = coin?.price_change_percentage_24h ?? 0;
                const isPositive = change24h >= 0;
                const price = coin?.current_price ?? 0;
                const volume = coin?.total_volume ?? 0;
                const isHovered = hoveredRow === coin.id;

                return (
                  <tr 
                    key={coin.id} 
                    onClick={() => navigate(`/coin/${coin.id}`)}
                    onMouseEnter={() => setHoveredRow(coin.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ 
                      borderBottom: '1px solid #2d2d2d', 
                      cursor: 'pointer',
                      backgroundColor: isHovered ? '#262626' : 'transparent',
                      transition: 'background-color 0.15s ease'
                    }}
                  >
                    <td style={{ padding: '16px 20px', color: '#888' }}>{coin?.market_cap_rank ?? '-'}</td>
                    <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={coin?.image} alt={coin?.name} style={{ width: '28px', height: '28px' }} />
                      <span style={{ fontWeight: 600 }}>{coin?.name ?? 'Unknown'}</span>
                      <span style={{ color: '#666', textTransform: 'uppercase', fontSize: '12px', fontWeight: 500 }}>{coin?.symbol ?? ''}</span>
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: 500 }}>${price.toLocaleString()}</td>
                    <td style={{ padding: '16px 20px', color: isPositive ? '#00b06f' : '#f44336', fontWeight: 600 }}>
                      {isPositive ? '+' : ''}{change24h.toFixed(2)}%
                    </td>
                    <td style={{ padding: '16px 20px', color: '#ccc' }}>${volume.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
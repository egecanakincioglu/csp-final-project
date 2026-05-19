import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopCoins } from '../services/api';
import { useWatchlist } from '../context/WatchlistContext';
import type { CoinMarketData } from '../types/crypto';

export const Watchlist = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [favCoins, setFavCoins] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      try {
        setLoading(true);
        const allCoins = await getTopCoins();
        if (Array.isArray(allCoins)) {
          const filtered = allCoins.filter((coin) => watchlist.includes(coin.id));
          setFavCoins(filtered);
        }
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load watchlist data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistCoins();
  }, [watchlist]);

  if (loading) return <div style={{ padding: '30px', color: '#fff', backgroundColor: '#141414', minHeight: '100vh' }}>Loading watchlist...</div>;
  if (error) return <div style={{ padding: '30px', color: '#f44336', backgroundColor: '#141414', minHeight: '100vh' }}>{error}</div>;

  return (
    <div style={{ padding: '40px 20px', fontFamily: '"Segoe UI", Roboto, sans-serif', backgroundColor: '#141414', color: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 600, letterSpacing: '-0.5px' }}>Your Watchlist</h2>

        {favCoins.length === 0 ? (
          <div style={{ 
            backgroundColor: '#1e1e1e', 
            padding: '40px', 
            borderRadius: '12px', 
            textAlign: 'center', 
            border: '1px solid #2d2d2d' 
          }}>
            <p style={{ color: '#aaa', fontSize: '16px', marginBottom: '20px' }}>Your watchlist is empty. Start adding some coins!</p>
            <button 
              onClick={() => navigate('/')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#00b06f',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', backgroundColor: '#1e1e1e', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2d2d2d', color: '#888', fontSize: '14px' }}>
                  <th style={{ padding: '16px 20px' }}>#</th>
                  <th style={{ padding: '16px 20px' }}>Coin</th>
                  <th style={{ padding: '16px 20px' }}>Price</th>
                  <th style={{ padding: '16px 20px' }}>24h Change</th>
                  <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {favCoins.map((coin) => {
                  const change24h = coin?.price_change_percentage_24h ?? 0;
                  const isPositive = change24h >= 0;
                  const isHovered = hoveredRow === coin.id;

                  return (
                    <tr 
                      key={coin.id}
                      onMouseEnter={() => setHoveredRow(coin.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{ 
                        borderBottom: '1px solid #2d2d2d', 
                        backgroundColor: isHovered ? '#262626' : 'transparent',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      <td style={{ padding: '16px 20px', color: '#888' }}>{coin?.market_cap_rank ?? '-'}</td>
                      <td 
                        onClick={() => navigate(`/coin/${coin.id}`)}
                        style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                      >
                        <img src={coin?.image} alt={coin?.name} style={{ width: '28px', height: '28px' }} />
                        <span style={{ fontWeight: 600 }}>{coin?.name ?? 'Unknown'}</span>
                        <span style={{ color: '#666', textTransform: 'uppercase', fontSize: '12px', fontWeight: 500 }}>{coin?.symbol ?? ''}</span>
                      </td>
                      <td style={{ padding: '16px 20px', fontWeight: 500 }}>${coin?.current_price?.toLocaleString()}</td>
                      <td style={{ padding: '16px 20px', color: isPositive ? '#00b06f' : '#f44336', fontWeight: 600 }}>
                        {isPositive ? '+' : ''}{change24h.toFixed(2)}%
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromWatchlist(coin.id);
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 500
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
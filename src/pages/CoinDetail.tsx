import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoinDetail } from '../services/api';
import type { CoinDetailData } from '../types/crypto';

export const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<CoinDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getCoinDetail(id);
        setCoin(data);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.status === 429
          ? 'Rate limit exceeded. Please wait a minute.'
          : 'Failed to load coin details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <div style={{ padding: '20px', color: '#fff', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>Loading details...</div>;
  if (error) return <div style={{ padding: '20px', color: '#f44336', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>{error}</div>;
  if (!coin) return <div style={{ padding: '20px', color: '#fff', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>Coin not found.</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ padding: '8px 16px', marginBottom: '20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        &larr; Back to Dashboard
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <img src={coin?.image?.large} alt={coin?.name} style={{ width: '64px', height: '64px' }} />
        <div>
          <h1 style={{ margin: 0 }}>{coin?.name}</h1>
          <span style={{ color: '#aaa', textTransform: 'uppercase' }}>{coin?.symbol}</span>
        </div>
      </div>

      <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', maxWidth: '600px' }}>
        <p><strong>Current Price:</strong> ${coin?.market_data?.current_price?.usd?.toLocaleString()}</p>
        <p><strong>Market Cap Rank:</strong> #{coin?.market_data?.market_cap_rank}</p>
        <p><strong>Market Cap:</strong> ${coin?.market_data?.market_cap?.usd?.toLocaleString()}</p>
        <p><strong>24h Price Change:</strong> <span style={{ color: (coin?.market_data?.price_change_percentage_24h ?? 0) >= 0 ? '#4caf50' : '#f44336' }}>
          {coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%
        </span></p>
      </div>
    </div>
  );
};
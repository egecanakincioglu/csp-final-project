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

  if (loading) return <div style={{ padding: '30px', color: '#fff', backgroundColor: '#141414', minHeight: '100vh' }}>Loading details...</div>;
  if (error) return <div style={{ padding: '30px', color: '#f44336', backgroundColor: '#141414', minHeight: '100vh' }}>{error}</div>;
  if (!coin) return <div style={{ padding: '30px', color: '#fff', backgroundColor: '#141414', minHeight: '100vh' }}>Coin not found.</div>;

  const change24h = coin?.market_data?.price_change_percentage_24h ?? 0;
  const isPositive = change24h >= 0;

  return (
    <div style={{ padding: '40px 20px', fontFamily: '"Segoe UI", Roboto, sans-serif', backgroundColor: '#141414', color: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            padding: '10px 18px', 
            marginBottom: '30px', 
            backgroundColor: '#1e1e1e', 
            color: '#fff', 
            border: '1px solid #2d2d2d', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#262626')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e1e1e')}
        >
          &larr; Back to Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <img src={coin?.image?.large} alt={coin?.name} style={{ width: '56px', height: '56px' }} />
            <div>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.5px' }}>{coin?.name}</h1>
              <span style={{ color: '#666', textTransform: 'uppercase', fontSize: '14px', fontWeight: 600, backgroundColor: '#1e1e1e', padding: '4px 8px', borderRadius: '4px', border: '1px solid #2d2d2d' }}>
                {coin?.symbol}
              </span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>${coin?.market_data?.current_price?.usd?.toLocaleString()}</div>
            <div style={{ color: isPositive ? '#00b06f' : '#f44336', fontWeight: 600, fontSize: '16px', marginTop: '4px' }}>
              {isPositive ? '+' : ''}{change24h.toFixed(2)}% (24h)
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '16px', 
          marginBottom: '40px' 
        }}>
          <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
            <div style={{ color: '#888', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Market Cap Rank</div>
            <div style={{ fontSize: '20px', fontWeight: 600 }}>#{coin?.market_data?.market_cap_rank ?? '-'}</div>
          </div>
          <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
            <div style={{ color: '#888', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Market Cap</div>
            <div style={{ fontSize: '20px', fontWeight: 600 }}>${coin?.market_data?.market_cap?.usd?.toLocaleString() ?? '-'}</div>
          </div>
          <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #2d2d2d' }}>
            <div style={{ color: '#888', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>All-Time High (ATH)</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#00b06f' }}>${coin?.market_data?.ath?.usd?.toLocaleString() ?? '-'}</div>
          </div>
        </div>

        {coin?.description?.en && (
          <div style={{ borderTop: '1px solid #2d2d2d', paddingTop: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>About {coin?.name}</h3>
            <div 
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
              style={{ 
                color: '#aaa', 
                lineHeight: '1.7', 
                fontSize: '15px',
                textAlign: 'justify'
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
};
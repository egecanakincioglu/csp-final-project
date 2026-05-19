import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { CoinDetail } from './pages/CoinDetail';
import { Watchlist } from './pages/WatchList';
import { WatchlistProvider } from './context/WatchlistContext';

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <nav style={{ 
          padding: '20px', 
          background: '#1e1e1e', 
          borderBottom: '1px solid #2d2d2d', 
          display: 'flex', 
          gap: '20px',
          fontFamily: '"Segoe UI", sans-serif'
        }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Dashboard</Link>
          <Link to="/watchlist" style={{ color: '#aaa', textDecoration: 'none', fontWeight: 600 }}>Watchlist</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </WatchlistProvider>
  );
}

export default App;
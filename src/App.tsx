import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { CoinDetail } from './pages/CoinDetail';
import { Watchlist } from './pages/WatchList';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#222', color: '#fff', display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff' }}>Dashboard</Link>
        <Link to="/watchlist" style={{ color: '#fff' }}>Watchlist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import CryptoMarketAnalyzer from './CryptoMarketAnalyzer';
import PremiumAnalyzer from './PremiumAnalyzer';
import PreviewGuide from './PreviewGuide';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/free" element={<CryptoMarketAnalyzer />} />
        <Route path="/premium" element={<LandingPage />} />
        <Route path="/premium-dashboard" element={<PremiumAnalyzer />} />
        <Route path="/guide" element={<PreviewGuide />} />
      </Routes>
    </Router>
  );
}

export default App;

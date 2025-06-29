
import React, { useState } from 'react';

export default function CryptoMarketAnalyzer() {
  const [formData, setFormData] = useState({
    marketCap: '',
    marketCapChange: '',
    volume: '',
    volumeChange: '',
    btcDominance: '',
    ethDominance: '',
    fearGreed: '',
    activeCoins: ''
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1');
      const coins = await res.json();
      setCoinData(coins);
      // Simple analyzer logic (for demonstration)
      const { marketCapChange, volumeChange, fearGreed } = formData;
      const status = parseFloat(marketCapChange) > 1 && parseFloat(fearGreed) > 50 ? 'Bull Market' : 'Bear/Neutral';
      const scalping = coins[0] ? `Scalping opportunity: ${coins[0].symbol.toUpperCase()}/USDT` : '';
      setAnalysisResult({
        status,
        scalping,
        coins
      });
    } catch (err) {
      console.error("Error fetching coin data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white space-y-8">
      <h2 className="text-2xl font-bold text-purple-400">📊 Web3Hausa Market Intelligence</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-4 rounded-xl">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm capitalize text-gray-300">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
        <button type="submit" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">Analyze Market Conditions</button>
      </form>

      {loading && <p>🔄 Fetching data and analyzing...</p>}

      {analysisResult && (
        <div className="space-y-6">
          <div className="p-4 bg-green-700 rounded-xl">📈 Market Status: <strong>{analysisResult.status}</strong></div>
          <div className="p-4 bg-blue-900 rounded-xl">⚡ {analysisResult.scalping}</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-green-300">Live Top Coins (CoinGecko)</h3>
            {analysisResult.coins.map((coin) => (
              <div key={coin.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                <strong className="text-yellow-300">{coin.name}</strong> ({coin.symbol.toUpperCase()}) – ${coin.current_price}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

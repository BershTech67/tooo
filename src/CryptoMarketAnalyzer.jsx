
import React, { useState } from 'react';

export default function CryptoMarketAnalyzer({ mode = 'free' }) {
  const [form, setForm] = useState({
    totalMarketCap: '',
    marketCapChange24h: '',
    totalVolume: '',
    volumeChange24h: '',
    btcDominance: '',
    ethDominance: '',
    fearGreedIndex: '',
    activeCryptocurrencies: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyzeMarket = () => {
    setLoading(true);
    setTimeout(() => {
      const score = [
        parseFloat(form.btcDominance),
        parseFloat(form.fearGreedIndex),
        parseFloat(form.marketCapChange24h)
      ].filter(val => val && val > 50).length;

      const strategies = score >= 2
        ? [
            "Scalping on DOGE/USDT during peak volatility",
            "Use trailing stop-loss with high momentum coins",
            "Monitor ETH/BTC for breakout confirmation",
            "Focus on assets with >5% daily volume increase"
          ]
        : [
            "Watch ETH/BTC for potential swing entry",
            "Avoid high leverage during downturns",
            "Look for RSI range between 45-55",
            "Track stablecoin inflows to exchanges"
          ];

      setResult({
        status: score >= 2 ? 'Bullish' : 'Bearish',
        score,
        strategies
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-950 text-white p-6">
      <h1 className="text-3xl text-center font-bold text-blue-200 mb-6">[Market] Web3Hausa Market Intelligence</h1>

      <div className="max-w-3xl mx-auto bg-[#1c1c3a] p-6 rounded-xl shadow space-y-4 border border-purple-700">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="number"
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-600"
            />
          </div>
        ))}

        <button
          onClick={analyzeMarket}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded mt-4"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {result && (
        <div className="max-w-3xl mx-auto mt-6 space-y-6">
          <div className="bg-[#0f0e20] p-4 rounded-lg shadow-md">
            <h3 className="text-green-500 font-semibold mb-2">📊 Analysis Result</h3>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>Score:</strong> {result.score}/3</p>
            <p><strong>Strategy:</strong></p>
            <ul className="list-disc list-inside ml-4 text-white">
              {result.strategies.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          {mode !== 'premium' && (
            <div className="bg-[#1f1230] p-4 rounded-lg text-white">
              <h3 className="text-yellow-400 font-semibold mb-2">🧠 How to Use This Professional Tool</h3>
              <ul className="list-disc list-inside ml-4">
                <li>Unlocked Collect market stats from CoinMarketCap</li>
                <li>Unlocked Paste the values into each field</li>
                <li>Unlocked Click analyze for market mood & signal</li>
                <li>🔒 Upgrade to Premium for full strategies</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

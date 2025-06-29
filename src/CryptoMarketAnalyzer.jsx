
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

      setResult({
        status: score >= 2 ? 'Bullish' : 'Bearish',
        score,
        recommendation:
          mode === 'premium'
            ? (score >= 2 ? 'Scalping opportunity: DOGE/USDT' : 'Watch ETH/BTC for swing entry')
            : 'Upgrade to premium for full signals'
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-950 text-white p-6">
      <h1 className="text-3xl text-center font-bold text-blue-200 mb-6">[Market] Web3Hausa Market Intelligence</h1>

      <div className="max-w-3xl mx-auto bg-[#1c1c3a] p-6 rounded-xl shadow space-y-4 border border-purple-700">
        <h2 className="text-lg text-purple-300 font-semibold">📋 Market Data Input</h2>
        {Object.entries(form).map(([key, val]) => (
          <div key={key}>
            <label className="block text-sm text-gray-300 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="number"
              name={key}
              value={val}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
            />
          </div>
        ))}
        <button
          onClick={analyzeMarket}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 rounded text-white font-semibold"
        >
          {loading ? 'Analyzing...' : 'Analyze Market Conditions'}
        </button>
      </div>

      {mode === 'premium' && result && result.score >= 2 && (
        <div className="text-center mt-10">
          <a
            href="/Web3Hausa-Trading-Guide.pdf"
            download
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition duration-200 shadow"
          >
            📥 Download Hausa + English Trading Guide (PDF)
          </a>
        </div>
      )}

      {mode === 'premium' && result && result.score >= 2 && (
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
          {[
            {
              title: "Scalping",
              description: "Premium scalping conditions detected",
              score: 70,
              tips: [
                "Target 1-5 minute timeframes",
                "Focus on BTC/ETH major pairs",
                "Use 0.1-0.25% profit targets",
                "Tight stop losses (0.05–0.15%)"
              ],
              risks: [
                "Watch for sudden news events",
                "Monitor order book depth",
                "Avoid low liquidity hours"
              ]
            },
            {
              title: "Day Trading",
              description: "Outstanding day trading opportunities",
              score: 80,
              tips: [
                "Use 15-60 minute timeframes",
                "Breakout and trend strategies",
                "Target 1-3% profits",
                "Trail stop losses"
              ],
              risks: [
                "Manage position sizes carefully",
                "Watch for overnight gaps",
                "Set daily loss limits"
              ]
            },
            {
              title: "Swing Trading",
              description: "Exceptional swing trading setup",
              score: 80,
              tips: [
                "Use daily/weekly charts",
                "Target major reversals",
                "1.5–5% profit targets",
                "Wide stop losses (~8%)"
              ],
              risks: [
                "Hold through volatility",
                "Fundamental changes"
              ]
            }
          ].map((section, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-800 to-indigo-900 p-6 rounded-xl border border-purple-700 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-teal-300">{section.title}</h3>
                  <p className="text-sm text-gray-300">{section.description}</p>
                </div>
                <div className="text-sm text-right text-green-300 font-semibold">
                  Unlocked {section.score}/100
                </div>
              </div>
              <div className="text-sm text-white">
                <p className="font-semibold text-blue-300">Best Practices</p>
                <ul className="list-disc ml-5 mb-2 text-sm text-gray-300">
                  {section.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
                <p className="font-semibold text-red-400">Risk Factors</p>
                <ul className="list-disc ml-5 text-sm text-red-300">
                  {section.risks.map((risk, i) => <li key={i}>{risk}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {result && (
        <div className="mt-6 max-w-3xl mx-auto bg-[#1a1a2e] border border-gray-700 rounded p-4 space-y-2">
          <h2 className="text-xl font-bold text-green-400">📈 Analysis Result</h2>
          <p>Status: <span className="font-medium">{result.status}</span></p>
          <p>Score: {result.score}/3</p>
          <p className="text-sm text-purple-300">Strategy: {result.recommendation}</p>
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-10 text-sm text-purple-100 bg-[#2a2254] p-4 rounded-lg space-y-2 border border-purple-800">
        <h3 className="text-lg font-semibold">🛠 How to Use This Professional Tool</h3>
        <ul className="list-disc list-inside space-y-1 text-purple-300">
          <li>Unlocked Collect market stats from CoinMarketCap</li>
          <li>Unlocked Paste the values into each field</li>
          <li>Unlocked Click analyze for market mood & signal</li>
          <li>🔐 Upgrade to Premium for full strategies</li>
        </ul>
      </div>
    </div>
  );
}

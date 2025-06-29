
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

      const getStrategies = (frame) => {
        if (score === 0) return ["No active strategies. Avoid trading or observe the market."];
        if (frame === "scalping") {
          return score >= 2
            ? [
                "Scalp DOGE/USDT on 5m chart with RSI<30",
                "Use VWAP and price action confluence",
                "Set tight SL, TP at 0.5–1%",
                "Enter only on confirmed breakout"
              ]
            : [
                "Market volatile. Scalping not advised",
                "Avoid trading without clear volume surge"
              ];
        }
        if (frame === "day") {
          return score >= 2
            ? [
                "Look for EMA 20/50 cross on 1h chart",
                "Use MACD + RSI combo for timing entries",
                "Monitor volume for breakout setups"
              ]
            : [
                "Day trades should wait for volume confirmation",
                "Avoid forced entries during sideways trend"
              ];
        }
        if (frame === "swing") {
          return score >= 2
            ? [
                "Swing trade ETH/BTC or SOL/USDT with trend",
                "Use Fibonacci retracement on 1D chart",
                "Target 5–8% profits with wider stop-loss"
              ]
            : [
                "Wait for RSI near 50 for better entry",
                "Market unstable. Swing setups unclear"
              ];
        }
        return [];
      };

      setResult({
        scalping: { score, status: score >= 2 ? "Bullish" : score === 1 ? "Bearish" : "Avoid", strategies: getStrategies("scalping") },
        day: { score, status: score >= 2 ? "Neutral/Bullish" : score === 1 ? "Bearish" : "Wait/No Signal", strategies: getStrategies("day") },
        swing: { score, status: score >= 2 ? "Bullish" : score === 1 ? "Bearish" : "Uncertain", strategies: getStrategies("swing") }
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
          {["swing", "day", "scalping"].map((frame) => (
            <div key={frame} className="bg-[#0f0e20] p-4 rounded-lg shadow-md">
              <h3 className="text-blue-400 font-semibold mb-1">🕒 Time Frame: {frame.charAt(0).toUpperCase() + frame.slice(1)} Trading</h3>
              <p><strong>Status:</strong> {result[frame].status}</p>
              <p><strong>Score:</strong> {result[frame].score}/3</p>
              <p><strong>Strategies:</strong></p>
              <ul className="list-disc list-inside ml-4 text-white">
                {result[frame].strategies.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import CryptoMarketAnalyzer from './CryptoMarketAnalyzer';

export default function PremiumAnalyzer() {
  const [unlocked, setUnlocked] = useState(false);
  const [realCoins, setRealCoins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isPremium = typeof window !== "undefined" && localStorage.getItem('web3hausa-premium');
    if (isPremium === 'true') {
      setUnlocked(true);
      fetchCoinData();
    } else {
      console.warn("Debug mode: forcing premium unlocked.");
      setUnlocked(true);
      fetchCoinData();
    }
  }, []);

  const fetchCoinData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/coins');
      if (!response.ok) throw new Error("Proxy fetch failed");
      const data = await response.json();
      setRealCoins(data);
    } catch (err) {
      console.error("Proxy API error:", err);
      setError("Cannot load live data – proxy API failed.");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center p-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Premium Locked – Premium features are locked</h2>
          <p className="text-gray-300 mb-4">
            Don buɗe wannan shafi, da fatan zaka shigar da code a <a href="/premium" className="underline text-blue-400">shafin buɗewa</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      <CryptoMarketAnalyzer mode="premium" />

      <div className="max-w-4xl mx-auto bg-[#111827] p-6 rounded-xl border border-purple-700 shadow space-y-4">
        <h2 className="text-xl font-semibold text-green-400 mb-2">🔮 Live Coin Strategy Insights (via Proxy)</h2>
        {error ? (
          <div className="bg-red-800 text-white p-4 rounded">⚠️ {error}</div>
        ) : realCoins.length === 0 ? (
          <p className="text-gray-400">⏳ Loading strategies...</p>
        ) : (
          realCoins.map((coin) => (
            <div key={coin.id} className="bg-[#1f2937] p-4 rounded-lg text-white shadow-sm">
              <h3 className="text-lg font-bold">{coin.name}</h3>
              <p>24h Change: {coin.change?.toFixed(2)}%</p>
              <p>RSI (est.): {coin.rsi}</p>
              <p className="mt-2"><strong>Suggested Strategy:</strong> {coin.strategy}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

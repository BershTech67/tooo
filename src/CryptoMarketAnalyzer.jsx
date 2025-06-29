
import React, { useEffect, useState } from 'react';

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
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
      );
      if (!response.ok) throw new Error("CoinGecko fetch failed");
      const data = await response.json();
      setRealCoins(data);
    } catch (err) {
      console.error("CoinGecko API error:", err);
      setError("Cannot load live data – CoinGecko fetch failed.");
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
      <div className="max-w-4xl mx-auto bg-[#111827] p-6 rounded-xl border border-purple-700 shadow space-y-4">
        <h2 className="text-xl font-semibold text-green-400 mb-2">🔮 Live Coin Strategy Insights (via CoinGecko)</h2>
        {error ? (
          <div className="bg-red-800 text-white p-4 rounded">⚠️ {error}</div>
        ) : realCoins.length === 0 ? (
          <div>Loading live data...</div>
        ) : (
          <ul className="space-y-3">
            {realCoins.map((coin) => (
              <li key={coin.id} className="bg-gray-900 p-4 rounded shadow border border-gray-700">
                <strong className="text-yellow-400">{coin.name}</strong> ({coin.symbol.toUpperCase()}) – ${coin.current_price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

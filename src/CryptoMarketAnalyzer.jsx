
import React, { useState } from "react";
import axios from "axios";

const CryptoMarketAnalyzer = ({ mode }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setAnalyzed(false);
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/global");
      const g = res.data.data;
      setData({
        marketStatus: "Bull Market", // can add logic later
        marketCap: g.total_market_cap.usd,
        volume: g.total_volume.usd,
        btcDominance: g.market_cap_percentage.btc,
        ethDominance: g.market_cap_percentage.eth,
        activeCoins: g.active_cryptocurrencies,
        volumeChange: g.market_cap_change_percentage_24h_usd,
      });
      setAnalyzed(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const renderCard = (title, score, tips, risks) => (
    <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-4 text-white shadow-md">
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-sm mb-3 text-purple-200">Premium {title.toLowerCase()} conditions detected</p>
      <div className="text-sm">
        <p className="font-bold text-green-300 mb-1">Best Practices</p>
        <ul className="mb-2 list-disc list-inside">{tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
        <p className="font-bold text-red-300 mb-1">Risk Factors</p>
        <ul className="list-disc list-inside">{risks.map((r, i) => <li key={i}>{r}</li>)}</ul>
      </div>
      <div className="text-right text-sm font-semibold mt-3 text-green-400">✅ {score}/100</div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <button
        onClick={fetchData}
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-md"
      >
        {loading ? "Analyzing..." : "Analyze Market Conditions"}
      </button>

      {analyzed && data && (
        <div className="mt-6 space-y-6">
          <div className="bg-green-600 text-white text-center py-3 rounded-lg shadow">
            <p className="text-lg font-semibold">📈 Market Status: {data.marketStatus}</p>
            <p className="text-sm">Vol: {data.volumeChange?.toFixed(2)}% | Neutral</p>
          </div>

          {renderCard(
            "Scalping",
            70,
            [
              "Target 1-5 minute timeframes",
              "Focus on BTC/ETH pairs",
              "Use 0.1–0.35% profit targets",
              "Tight stop losses (0.05–0.15%)",
            ],
            [
              "Watch for sudden news events",
              "Monitor order book depth",
              "Avoid low liquidity hours",
            ]
          )}

          {renderCard(
            "Day Trading",
            80,
            [
              "Use 15–60 minute timeframes",
              "Breakout and trend strategies",
              "Target 1–3% profits",
              "Tight stop losses",
            ],
            [
              "Manage position sizes carefully",
              "Watch for overnight gaps",
              "Set daily loss limits",
            ]
          )}

          {renderCard(
            "Swing Trading",
            80,
            [
              "Trade multi-day trends",
              "Use moving average confirmation",
              "Target 5–15% moves",
              "Use trailing stop-losses",
            ],
            [
              "Macro events/news",
              "High weekend volatility",
              "Fakeouts in ranging markets",
            ]
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoMarketAnalyzer;


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
        marketStatus: "Bull Market",
        marketCap: g.total_market_cap.usd,
        volume: g.total_volume.usd,
        btcDominance: g.market_cap_percentage.btc,
        ethDominance: g.market_cap_percentage.eth,
        activeCoins: g.active_cryptocurrencies,
        volumeChange: g.market_cap_change_percentage_24h_usd,
      });
      setAnalyzed(true);
    } catch (error) {
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const renderCard = (title, score, tips, risks, tipsHa, risksHa) => (
    <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-4 text-white shadow-md space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{title}</h4>
        <span className="text-green-300 font-bold">✅ {score}/100</span>
      </div>
      <p className="text-sm text-purple-200">Premium {title.toLowerCase()} strategy</p>

      <div className="text-sm">
        <p className="font-bold text-green-300">Best Practices / Dabaru:</p>
        <ul className="mb-2 list-disc list-inside">
          {tips.map((t, i) => (
            <li key={i}>{t} <span className="text-purple-300 block">({tipsHa[i]})</span></li>
          ))}
        </ul>

        <p className="font-bold text-red-300">Risk Factors / Hadari:</p>
        <ul className="list-disc list-inside">
          {risks.map((r, i) => (
            <li key={i}>{r} <span className="text-purple-300 block">({risksHa[i]})</span></li>
          ))}
        </ul>
      </div>
    </div>
  );

  const ActionButtons = () => (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <a href="https://t.me/your_channel" target="_blank" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold text-center">📢 Telegram</a>
      <a href="https://youtube.com/@yourchannel" target="_blank" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold text-center">▶️ YouTube</a>
      <a href="https://wa.me/2348012345678" target="_blank" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold text-center">💬 WhatsApp</a>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <button
        onClick={fetchData}
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-md"
      >
        {loading ? "Ana nazari..." : "Analyze Market Conditions"}
      </button>

      {analyzed && data && (
        <div className="mt-6 space-y-6">
          <div className="bg-green-600 text-white py-3 px-4 rounded-lg shadow flex justify-between items-center">
            <p className="font-semibold">📈 Market Status: {data.marketStatus}</p>
            <p className="text-sm">Vol: {data.volumeChange?.toFixed(2)}% | Neutral</p>
          </div>

          {renderCard("Scalping", 70,
            ["Target 1-5 minute timeframes", "Focus on BTC/ETH pairs", "Use 0.1–0.35% profit targets", "Tight stop losses (0.05–0.15%)"],
            ["Watch for sudden news events", "Monitor order book depth", "Avoid low liquidity hours"],
            ["Yi amfani da timeframe na mintuna 1–5", "Maida hankali ga BTC/ETH", "Yi amfani da 0.1–0.35% ribar buri", "Yi amfani da dakatar da asara kaɗan"],
            ["Kula da labarai masu tasiri", "Duba zurfin odar kasuwa", "Guji lokutan ciniki maras ruwa"]
          )}

          {renderCard("Day Trading", 80,
            ["Use 15–60 minute timeframes", "Breakout and trend strategies", "Target 1–3% profits", "Tight stop losses"],
            ["Manage position sizes carefully", "Watch for overnight gaps", "Set daily loss limits"],
            ["Yi amfani da mintuna 15–60", "Yi amfani da dabarun breakout da trends", "Ka saita ribar 1–3%", "Ka iyakance asara"],
            ["Gudanar da girman matsayi da kyau", "Kula da tazarar dare", "Ka saita iyakar asara kullum"]
          )}

          {renderCard("Swing Trading", 80,
            ["Trade multi-day trends", "Use moving average confirmation", "Target 5–15% moves", "Use trailing stop-losses"],
            ["Macro events/news", "High weekend volatility", "Fakeouts in ranging markets"],
            ["Bi trends na kwanaki da dama", "Yi amfani da matsakaicin motsi a matsayin tabbaci", "Nemi 5–15% motsi", "Yi amfani da stop-loss mai tafe"],
            ["Labarai da abubuwan siyasa", "Canjin farashi da yawa a karshen mako", "Yaudara a cikin kasuwanni marasa tabbas"]
          )}

          {mode === "premium" && <ActionButtons />}
        </div>
      )}
    </div>
  );
};

export default CryptoMarketAnalyzer;

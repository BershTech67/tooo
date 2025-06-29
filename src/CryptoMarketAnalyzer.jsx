import React, { useState } from 'react';
import axios from 'axios';

const CryptoMarketAnalyzer = ({ mode }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setAnalyzed(false);
    try {
      const res = await axios.get('https://api.coingecko.com/api/v3/global');
      const g = res.data.data;
      setData({
        marketCap: g.total_market_cap.usd,
        marketCapChange: g.market_cap_change_percentage_24h_usd,
        volume: g.total_volume.usd,
        volumeChange: g.market_cap_change_percentage_24h_usd, // CoinGecko doesn’t give volume % change directly
        btcDominance: g.market_cap_percentage.btc,
        ethDominance: g.market_cap_percentage.eth,
        fearGreed: 'Unavailable from CoinGecko', // can be fetched from alternative API
        activeCoins: g.active_cryptocurrencies,
      });
      setAnalyzed(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data from CoinGecko.');
    } finally {
      setLoading(false);
    }
  };

  const visibleFields = mode === 'premium'
    ? ['marketCap', 'marketCapChange', 'volume', 'volumeChange', 'btcDominance', 'ethDominance', 'fearGreed', 'activeCoins']
    : ['marketCap', 'volume', 'btcDominance', 'activeCoins'];

  const labels = {
    marketCap: 'Market Cap',
    marketCapChange: 'Market Cap Change (24h)',
    volume: '24h Volume',
    volumeChange: 'Volume Change',
    btcDominance: 'BTC Dominance',
    ethDominance: 'ETH Dominance',
    fearGreed: 'Fear & Greed Index',
    activeCoins: 'Active Coins',
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-purple-400">
        📊 Web3Hausa Market Intelligence
      </h2>

      <button
        onClick={fetchData}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
      >
        {loading ? 'Analyzing...' : 'Analyze Market'}
      </button>

      {analyzed && data && (
        <div className="mt-8 bg-gray-900 p-6 rounded-lg text-white">
          <h3 className="text-lg font-bold mb-4">🧠 Analysis Result</h3>
          <ul className="space-y-2">
            {visibleFields.map((key) => (
              <li key={key}>
                <span className="font-semibold">{labels[key]}:</span>{' '}
                {typeof data[key] === 'number'
                  ? data[key].toLocaleString('en-US')
                  : data[key]}
              </li>
            ))}
          </ul>

          {mode === 'premium' ? (
            <div className="mt-4 text-green-400">
              ✅ Premium: Showing full market intelligence including ETH/BTC dominance and market trends.
            </div>
          ) : (
            <div className="mt-4 text-yellow-400">
              🔒 Limited data shown. <a href="/premium" className="underline text-blue-400">Unlock more features</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoMarketAnalyzer;

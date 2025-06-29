// src/CryptoMarketAnalyzer.jsx
import React from 'react';

const CryptoMarketAnalyzer = () => {
  const fields = [
    { label: 'Market Cap', name: 'marketCap' },
    { label: 'Market Cap Change', name: 'marketCapChange' },
    { label: 'Volume', name: 'volume' },
    { label: 'Volume Change', name: 'volumeChange' },
    { label: 'BTC Dominance', name: 'btcDominance' },
    { label: 'ETH Dominance', name: 'ethDominance' },
    { label: 'Fear Greed', name: 'fearGreed' },
    { label: 'Active Coins', name: 'activeCoins' },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-purple-400">📊 Web3Hausa Market Intelligence</h2>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label htmlFor={field.name} className="text-sm font-medium text-white mb-1">
              {field.label}
            </label>
            <input
              id={field.name}
              type="text"
              placeholder={`Enter ${field.name}`}
              className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoMarketAnalyzer;

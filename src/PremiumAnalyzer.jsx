
import React, { useEffect, useState } from 'react';
import CryptoMarketAnalyzer from './CryptoMarketAnalyzer';

export default function PremiumAnalyzer() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const isPremium = localStorage.getItem('web3hausa-premium');
    if (isPremium === 'true') {
      setUnlocked(true);
    }
  }, []);

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center p-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Premium Locked Premium features are locked</h2>
          <p className="text-gray-300 mb-4">
            Don buɗe wannan shafi, da fatan zaka shigar da code a <a href="/premium" className="underline text-blue-400">shafin buɗewa</a>.
          </p>
        </div>
      </div>
    );
  }

  return <CryptoMarketAnalyzer mode="premium" />;
}

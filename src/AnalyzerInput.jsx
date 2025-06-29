
import React, { useState } from 'react';

export default function AnalyzerInput({ onSubmit }) {
  const [inputData, setInputData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData.trim()) {
      onSubmit(inputData);
      setInputData('');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700 mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-300 font-medium text-sm">
          Input Shigar da bayananka don nazari (Enter your market analysis data):
        </label>
        <textarea
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600 resize-none"
          rows="5"
          placeholder="e.g., BTC volume, trend direction, RSI status..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Analyze 🔎
        </button>
      </form>
    </div>
  );
}

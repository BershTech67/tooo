
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PreviewGuide() {
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const premium = localStorage.getItem('web3hausa-premium');
    if (premium === 'true') {
      setAllowed(true);
    } else {
      navigate('/premium');
    }
  }, [navigate]);

  if (!allowed) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-green-400 mb-6">Trading Guide Hausa + English Trading Guide</h1>
      <p className="text-center text-gray-400 mb-4">Below is a preview of your premium trading PDF guide.</p>
      <div className="max-w-5xl mx-auto border border-gray-700 rounded overflow-hidden shadow-lg">
        <iframe
          src="/Web3Hausa-Trading-Guide.pdf"
          width="100%"
          height="800px"
          className="border-0"
          title="Trading Guide PDF Preview"
        ></iframe>
      </div>
      <div className="text-center mt-6">
        <a
          href="/Web3Hausa-Trading-Guide.pdf"
          download
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition duration-200"
        >
          📥 Download Full Guide (PDF)
        </a>
      </div>
    </div>
  );
}

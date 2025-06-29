
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('web3hausa-premium') === 'true') {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === 'HAUSA2025') {
      localStorage.setItem('web3hausa-premium', 'true');
      setUnlocked(true);
      navigate('/premium-dashboard');
    } else {
      alert('⚠️ Invalid premium code!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">Web3Hausa Analyzer</h1>
      <p className="text-center text-sm text-gray-400 mb-10">Binciken kasuwar crypto cikin Hausa da dabarun ciniki</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-700 shadow space-y-3">
          <h2 className="text-xl font-bold text-blue-300 flex items-center gap-2">Free Access Free Access</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Unlocked Shigar da bayanai (market input)</li>
            <li>Unlocked Nazarin yanayin kasuwa gaba ɗaya</li>
            <li>Unlocked Score & matsayi (score/status)</li>
            <li>Premium Locked Shawarar ciniki ta musamman (kulle)</li>
            <li>Premium Locked Jeran duba PDF da sakonnin Telegram</li>
          </ul>
          <button onClick={() => navigate('/free')} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-medium">
            Try Free Analyzer 🚀
          </button>
        </div>

        <div className="bg-blue-900 p-6 rounded-xl border border-blue-300 shadow space-y-4">
          <h2 className="text-xl font-bold text-yellow-200 flex items-center gap-2">Premium Access Premium Access</h2>
          <ul className="space-y-2 text-sm text-white">
            <li>Unlocked Dukkan fasalolin da ke cikin Free</li>
            <li>Unlocked Shawarar dabarun ciniki: Scalping, Day, Swing</li>
            <li>Unlocked Mafi kyawun pairs da za a yi ciniki</li>
            <li>Unlocked Jagorar Hausa + PDF duba ciniki</li>
            <li>Unlocked Kungiyar Telegram don tallafi da sigina</li>
          </ul>

          <div className="text-sm bg-gray-900 rounded p-4 border border-gray-700 space-y-1">
            <p><strong>Banki:</strong> OPay</p>
            <p><strong>Lambar Asusun:</strong> 7067679691</p>
            <p><strong>Sunanka:</strong> Abubakar Abubakar</p>
          </div>

<a
  href="https://wa.me/2347067679691?text=Sannu.%20Ina%20so%20in%20sami%20Premium%20Code%20don%20Web3Hausa%20Analyzer.%20An%20biya%20ta%20OPay%3A%207067679691."
  target="_blank"
  rel="noopener noreferrer"
  className="mt-2 inline-block text-center w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold"
>
  💬 Request Premium Code via WhatsApp
</a>


<ul className="space-y-2 text-sm text-white">
  <li>Unlocked Dukkan fasalolin da ke cikin Free</li>
  <li>Unlocked Shawarar dabarun ciniki: Scalping, Day, Swing</li>
  <li>Unlocked Mafi kyawun pairs da za a yi ciniki</li>
  <li>Unlocked Jagorar Hausa + PDF duba ciniki</li>
  <li>Unlocked Kungiyar Telegram don tallafi da sigina</li>
  <li className="mt-2 font-semibold text-green-300">💡 Sakamakon nazari tare da matakin kasuwa da shawarar dabarun ciniki</li>
  <li className="text-sm text-purple-200">Scalping, Day da Swing Trading - daki-daki da ƙididdiga</li>
</ul>

          <p className="text-xs">📤 Tura hoton slip zuwa <a href="https://wa.me/2347067679691" target="_blank" className="underline text-green-300">WhatsApp ɗinmu</a> don samun Premium code.</p>

          {unlocked ? (
            <button onClick={() => navigate('/premium-dashboard')} className="w-full mt-2 bg-green-600 hover:bg-green-700 py-2 rounded text-white font-bold">
              Go to Premium 💎
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                placeholder="Shigar da Premium Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 py-2 rounded text-black font-bold">
                Bude Premium 🔐
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="text-center text-gray-600 text-xs mt-12">Hakkin mallaka © 2025 Web3Hausa | Duk haƙƙi na ajiye</footer>
    </div>
  );
}

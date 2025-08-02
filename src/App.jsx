import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import SolanaWallet from '../components/solanaWallet';
import EthWallet from '../components/ethWallet';
import { generateMnemonic } from 'bip39';

function Home({ mnemonic, setMnemonic }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#dbeafe] to-[#eff6ff] min-h-screen px-6 py-12">
      <h1 className="font-serif text-3xl text-blue-400 tracking-wide mb-6">
        Welcome <span className="text-black">User</span>
      </h1>
      <div className="flex flex-col gap-4">
        <label className="text-gray-600 text-sm font-medium">Seed Phrase (Mnemonic)</label>
        <textarea
          value={mnemonic}
          readOnly
          className="w-[500px] h-40 p-4 border border-gray-300 rounded-lg resize-none text-gray-700 font-mono"
          placeholder="Click the button to generate your seed phrase"
        />
        <button
          onClick={async () => {
            const mn = generateMnemonic();
            setMnemonic(mn);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
        >
          Create Your Seed Phrase
        </button>
      </div>

      <div className="mt-10 flex gap-10 text-2xl font-serif">
        <Link to="/solana" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 transition">Solana</Link>
        <Link to="/eth" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 transition">Eth</Link>
      </div>
    </div>
  );
}

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Home mnemonic={mnemonic} setMnemonic={setMnemonic} />} />
      <Route path="/solana" element={<SolanaWallet mnemonic={mnemonic} />} />
      <Route path="/eth" element={<EthWallet mnemonic={mnemonic} />} />
    </Routes>
  );
}

export default App;
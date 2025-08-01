import { useState } from 'react';
import './App.css';
import { generateMnemonic } from 'bip39';
import SolanaWallet from '../components/solanaWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Solana Wallet Generator</h1>

        <div className="flex flex-col gap-4">
          <label className="text-gray-600 text-sm font-medium">Seed Phrase (Mnemonic)</label>
          <textarea
            value={mnemonic}
            readOnly
            className="p-4 border border-gray-300 rounded-lg resize-none text-gray-700 font-mono h-28"
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

        {mnemonic && <SolanaWallet key={mnemonic} mnemonic={mnemonic} />}
      </div>
    </div>
  );
}

export default App;
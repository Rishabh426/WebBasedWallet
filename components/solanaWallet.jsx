import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export default function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  async function handleAddWallet() {

    if (!mnemonic) return;
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  }

  if (!mnemonic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#dbeafe] to-[#eff6ff] px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Mnemonic Not Found</h2>
        <p className="text-gray-700">Please go back and generate your seed phrase to create wallets.</p>
        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Go Back
        </a>
      </div>
    );
  }
  
  return (
    <div className="w-full flex justify-center bg-gradient-to-b from-[#dbeafe] to-[#eff6ff] py-12 px-4 min-h-screen">
      <div className="w-full max-w-xl text-center pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Wallets</h2>

        <button
          onClick={handleAddWallet}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition duration-200 mb-6"
        >
          + Add Wallet
        </button>

        <div className="space-y-2">
          {publicKeys.length === 0 ? (
            <p className="text-gray-500">No wallets generated yet.</p>
          ) : (
            publicKeys.map((p, id) => (
              <div
                key={id}
                className="bg-gray-100 p-3 rounded-md font-mono text-sm text-gray-800 break-all border border-gray-300"
              >
                {p.toBase58()}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
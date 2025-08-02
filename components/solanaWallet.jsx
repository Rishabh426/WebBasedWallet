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

  return (
    <div className="mt-6 border-t pt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Wallets</h2>

      <button
        onClick={handleAddWallet}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition duration-200"
      >
        + Add Wallet
      </button>

      <div className="mt-4 space-y-2">
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
  );
}
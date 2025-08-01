import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39';
import SolanaWallet from "../components/solanaWallet";

function App() {

  const [mnemonic, setMnemonic] = useState("");

  return (
    <div>
      <input type='text' value={mnemonic}></input>
      <button onClick={async function() {
        const mn = generateMnemonic();
        setMnemonic(mn);
      }}>Create Your Seed Phrase</button>
      <SolanaWallet key={mnemonic}/>
    </div>
  )
}

export default App

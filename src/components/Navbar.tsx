import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import algosdk from 'algosdk';

// Adresse et mnémonique de test pour LocalNet
const mnemonic = "hip social weird deal identify job shy pave dwarf crane capable little phrase snow exchange badge chicken perfect barely whisper cricket puppy core able best";
const account = algosdk.mnemonicToSecretKey(mnemonic);
const walletAddress: string = account.addr.toString();

const Navbar = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const navigate = useNavigate();

  const connectLocalWallet = async () => {
    // Connexion directe en utilisant l’adresse du wallet
    setConnectedAddress(walletAddress);
    alert(`Connecté avec succès : ${walletAddress}`);
  };

  const handleSubmitProjectClick = () => {
    if (connectedAddress) {
      navigate('/submit-project', { state: { walletAddress: connectedAddress } });
    } else {
      alert('Veuillez connecter votre wallet d\'abord.');
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-orange-500 text-transparent bg-clip-text">
          Trusted
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/marketplace">
            <Button variant="ghost">Marketplace</Button>
          </Link>
          <Button variant="ghost" onClick={handleSubmitProjectClick}>
            Soumettre un projet
          </Button>
          <Button className="flex items-center gap-2" onClick={connectLocalWallet}>
            {connectedAddress ? `Connecté: ${connectedAddress}` : 'Connecter Wallet Local'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

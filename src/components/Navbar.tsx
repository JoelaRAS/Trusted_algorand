import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useWallet } from '@/components/WalletContext';

const Navbar: React.FC = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const handleSubmitProjectClick = () => {
    if (walletAddress) {
      navigate('/submit-project', { state: { walletAddress } });
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
          <Button className="flex items-center gap-2" onClick={walletAddress ? disconnectWallet : connectWallet}>
            {walletAddress ? `Connecté: ${walletAddress}` : 'Connecter Pera Wallet'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
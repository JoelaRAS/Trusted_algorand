import React from 'react';
import { useWallet } from './WalletContext';

const ConnectWallet: React.FC = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();
  const isConnectedToPeraWallet = !!walletAddress;

  return (
    <button onClick={isConnectedToPeraWallet ? disconnectWallet : connectWallet}>
      {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
    </button>
  );
};

export default ConnectWallet;
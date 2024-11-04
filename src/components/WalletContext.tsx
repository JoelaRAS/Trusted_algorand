// WalletContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk from 'algosdk';
import { algodToken, algodServer, algodPort } from '@/algorandConfig';

const peraWallet = new PeraWalletConnect();
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

interface WalletContextProps {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signTransaction: (txn: algosdk.Transaction) => Promise<Uint8Array>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

      if (accounts.length) {
        setWalletAddress(accounts[0]);
      }
    }).catch((e) => console.log(e));

    return () => {
      peraWallet.connector.off("disconnect");
    };
  }, []);

  const connectWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect();
      peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
      setWalletAddress(newAccounts[0]);
    } catch (error) {
      if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
        console.log(error);
      }
    }
  };

  const disconnectWallet = () => {
    if (!walletAddress) return;
    peraWallet.disconnect();
    setWalletAddress(null);
  };

  const signTransaction = async (txn: algosdk.Transaction): Promise<Uint8Array> => {
    try {
      // Encodage de la transaction en Uint8Array
      const txnToSign = { txn: algosdk.encodeUnsignedTransaction(txn), signers: [walletAddress!] };

      // Signature de la transaction avec Pera Wallet en tant que tableau
      const signedTxnArray = await peraWallet.signTransaction([{ txn: algosdk.encodeUnsignedTransaction(txn), signers: [walletAddress!] } as any]);

      if (!signedTxnArray.length) {
        throw new Error("La transaction n'a pas été signée correctement.");
      }

      return signedTxnArray[0] as Uint8Array;
    } catch (error) {
      console.error("Erreur lors de la signature de la transaction:", error);
      throw error;
    }
  };

  const handleDisconnectWalletClick = () => {
    setWalletAddress(null);
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet, signTransaction }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

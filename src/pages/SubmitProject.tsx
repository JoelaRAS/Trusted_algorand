import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import algosdk from 'algosdk';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Config Algorand
import { algodToken, algodServer, algodPort } from '@/algorandConfig';

// Initialisation du client Algorand
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// ID de l'application du smart contract
const appId = 1002;

// Adresse et clé privée pour LocalNet
const mnemonic = "hip social weird deal identify job shy pave dwarf crane capable little phrase snow exchange badge chicken perfect barely whisper cricket puppy core able best";
const account = algosdk.mnemonicToSecretKey(mnemonic);
const privateKey = account.sk;
const walletAddress = account.addr;

const SubmitProject = () => {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [impact, setImpact] = useState('');
  const [projectLocation, setProjectLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const params = await algodClient.getTransactionParams().do();
  
      const encoder = new TextEncoder();
      const txn = algosdk.makeApplicationCallTxnFromObject({
        sender: walletAddress,
        appIndex: appId,
        onComplete: algosdk.OnApplicationComplete.NoOpOC,
        appArgs: [
          encoder.encode('submit_project'),
          encoder.encode(title),
          encoder.encode(description),
          encoder.encode(category),
          encoder.encode(impact),
          encoder.encode(projectLocation),
        ],
        suggestedParams: { ...params, flatFee: true, fee: 1000 },
      });
  
      // Signature de la transaction avec la clé privée
      const signedTxn = txn.signTxn(privateKey);
  
      // Envoi de la transaction
      const response = await algodClient.sendRawTransaction(signedTxn).do();
      const txId = response.txid;
      console.log('Transaction envoyée avec ID :', txId);
      alert('Projet soumis avec succès !');
    } catch (error) {
      console.error('Erreur lors de la soumission du projet :', error);
      alert('Échec de la soumission du projet.');
    }
  };
  

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm">Titre du projet</Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-sm">Description du projet</Label>
                <Input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-sm">Catégorie</Label>
                <Input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="impact" className="text-sm">Impact</Label>
                <Input
                  type="text"
                  id="impact"
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-sm">Emplacement</Label>
                <Input
                  type="text"
                  id="location"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Soumettre le projet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitProject;

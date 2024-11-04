// src/services/algorandService.ts
import algosdk from 'algosdk';
import { algodToken, algodServer, algodPort } from '@/algorandConfig';

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const appId = 728336431; // ID de votre application
const applicationAccountAddress = "ZWSRBACPNBYDAJTQTHXTPTBJEIBFHT5Q5WOUUNZ2EMCWXVM452WCIIHWTA"; // Adresse de compte de l'application

export const fetchProjectsFromBlockchain = async () => {
  try {
    // Requête pour récupérer toutes les transactions liées à l'adresse du compte de l'application
    const response = await algodClient.accountApplicationInformation(applicationAccountAddress, appId).do();
    const transactions = response.transactions;

    if (!transactions) {
      console.error("Aucune transaction trouvée pour ce compte d'application.");
      return [];
    }

    // Filtrage et mapping des transactions pour extraire les données de chaque projet
    const projects = transactions
      .filter((txn) => txn['application-id'] === appId) // Assurez-vous que la transaction est liée à l'ID de l'application
      .map((txn) => {
        const args = txn["application-args"];
        return {
          id: txn.id,
          title: Buffer.from(args[1], 'base64').toString(),
          description: Buffer.from(args[2], 'base64').toString(),
          category: Buffer.from(args[3], 'base64').toString(),
          impact: Buffer.from(args[4], 'base64').toString(),
          location: Buffer.from(args[5], 'base64').toString(),
          status: "Appel d'offre", // Statut à ajuster selon la logique métier
        };
      });

    return projects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return [];
  }
};

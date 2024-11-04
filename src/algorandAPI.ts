import algosdk from 'algosdk';
import { algodToken, algodServer, algodPort } from './algorandConfig';

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const appId = 1002; // Remplacez par l'ID de votre application Algorand

// Fonction pour récupérer les transactions d'application
export const getApplicationTransactions = async () => {
  try {
    const response = await algodClient.getApplicationByID(appId).do();
    const transactions = response.transactions;

    // Filtrer les transactions d'appel d'application et de l'ID de l'application
    const appTransactions = transactions.filter((txn) =>
      txn['tx-type'] === 'appl' && txn['application-id'] === appId
    );

    const projectSubmissions = appTransactions
      .filter((txn) => txn['application-args'] && Buffer.from(txn['application-args'][0], 'base64').toString() === 'submit_project')
      .map((txn) => {
        const args = txn['application-args'] || [];
        return {
          title: Buffer.from(args[1], 'base64').toString(),
          description: Buffer.from(args[2], 'base64').toString(),
          category: Buffer.from(args[3], 'base64').toString(),
          impact: Buffer.from(args[4], 'base64').toString(),
          location: Buffer.from(args[5], 'base64').toString(),
          status: "Appel d'offre",
        };
      });

    console.log("Projets récupérés:", projectSubmissions);
    return projectSubmissions;

  } catch (error) {
    console.error("Erreur lors de la récupération des transactions:", error);
    return [];
  }
};

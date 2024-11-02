export type ProjectStatus = "Appel d'offre" | "En financement" | "En cours";

export interface BudgetDetail {
  poste: string;
  montant: number;
}

export interface Etape {
  nom: string;
  duree: string;
}

export interface Devis {
  id: string;
  prestataire: string;
  siren?: string;
  budget: number;
  description: string;
  votes: number;
  budgetDetails?: BudgetDetail[];
  dureeEstimee?: string;
  etapes?: Etape[];
}

export interface Donateur {
  id: string;
  name: string;
  amount: number;
}

export interface Contract {
  description: string;
  amount: number;
  terms: string;
}

export interface Update {
  date: string; // Assurez-vous que la date est formatée en ISO, ex: 'YYYY-MM-DD'
  title: string;
  content: string;
}

export interface Project {
  id: string; // Suppression de `| undefined` pour éviter des erreurs de manipulation.
  title: string;
  image?: string; // Représentation URL ou chemin local de l'image du projet
  description: string;
  status: ProjectStatus;
  currentAmount: number; // Montant total des dons actuels
  targetAmount: number;  // Montant cible du financement
  category?: string;
  impact?: string;
  location?: string;
  devis: Devis[];  // Liste des devis soumis
  selectedDevis?: Devis; // Devis choisi pour le projet
  donateurs: Donateur[]; // Liste des donateurs avec montant de don
  contract?: Contract;  // Contrat établi pour le projet
  updates: Update[];    // Liste des mises à jour du projet
}



// utils.ts ou types/project.ts (comme tu préfères)
export const mapStatus = (status: number): string => {
  switch (status) {
    case 0:
      return "Appel d'offre";
    case 1:
      return "En financement";
    case 2:
      return "En cours";
    case 3:
      return "Annulé";
    case 4:
      return "Terminé";
    default:
      return "Inconnu";
  }
};

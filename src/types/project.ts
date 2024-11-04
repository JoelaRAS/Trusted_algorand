


// src/types/project.ts
import { ReactNode } from 'react';
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
export interface ProjectCardProps {

  id: string;

  title: string;

  description: string;

  category: string;

  impact: string;

  location: string;

  status: string;

}



export interface Project {
  selectedDevis: any;
  category: ReactNode;
  location: ReactNode;

  id: string;

  title: string;

  description: string;

  status: string;

  currentAmount: number;

  targetAmount: number;

  devis?: {
    siren: ReactNode;
    budgetDetails: any;
    dureeEstimee: ReactNode; id: string; prestataire: string; budget: number; description: string; votes: number; 
}[];

  donateurs?: { id: string; name: string; amount: number; }[];

  impact?: string;

  provider?: string;

  lastUpdate?: string;

  contract?: { description: string; amount: number; terms: string; };

  updates?: { date: string; title: string; content: string; }[];

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

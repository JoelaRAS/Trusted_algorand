import { Button } from "@/components/ui/button";
import { ArrowRight, Vote, Wallet } from "lucide-react";
import { ProjectStatus } from "@/types/project";
import { SubmitDevisPopup } from "@/components/SubmitDevisPopup"; // Import du composant pour le popup de devis
import { DonatePopup } from "@/components/DonatePopup"; // Import du composant pour le popup de don
import { VotePopup } from "@/components/VotePopup"; // Import du composant pour le popup de vote

interface CardButtonsProps {
  status: ProjectStatus;
  title: string;
  devis?: any[];
  handleDonate: (amount: number) => void;
  handleSubmitDevis: (devis: { prestataire: string; description: string; budget: number }) => void;
  handleVote: () => void;
}

export const CardButtons = ({ status, title, devis, handleDonate, handleSubmitDevis, handleVote }: CardButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {status === "En financement" && (
        <DonatePopup onSubmit={handleDonate} />
      )}

      {status === "Appel d'offre" && (
        <div className="flex gap-2 flex-wrap">
          <SubmitDevisPopup 
            title={title} 
            onSubmit={handleSubmitDevis} // Utilisation directe du popup pour "Proposer un devis"
          />
          <VotePopup onSubmit={handleVote} />
        </div>
      )}
    </div>
  );
};
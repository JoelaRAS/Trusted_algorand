import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useState } from "react";

interface SubmitDevisPopupProps {
  title: string;
  onSubmit: (devis: { prestataire: string; description: string; budget: number }) => void;
}

export const SubmitDevisPopup = ({ title, onSubmit }: SubmitDevisPopupProps) => {
  const [budgetDetails, setBudgetDetails] = useState([{ poste: "", montant: 0 }]);
  const [totalBudget, setTotalBudget] = useState(0);

  const handleAddRow = () => {
    setBudgetDetails([...budgetDetails, { poste: "", montant: 0 }]);
  };

  const handleBudgetChange = (index: number, field: "poste" | "montant", value: any) => {
    const updatedBudgetDetails = budgetDetails.map((item, i) => 
      i === index ? { ...item, [field]: field === "montant" ? parseFloat(value) || 0 : value } : item
    );
    setBudgetDetails(updatedBudgetDetails);
    
    const total = updatedBudgetDetails.reduce((sum, item) => sum + (item.montant || 0), 0);
    setTotalBudget(total);
  };

  const handleSubmit = () => {
    const devis = {
      prestataire: "Nom du prestataire", // Remplacez par la valeur réelle
      description: "Description des services", // Remplacez par la valeur réelle
      budget: totalBudget,
    };
    onSubmit(devis);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Proposer un devis
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Proposer un devis pour {title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="company">Nom de l'entreprise</Label>
            <Input id="company" placeholder="Nom de votre entreprise" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siren">Numéro SIREN</Label>
            <Input id="siren" placeholder="123 456 789" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description des services</Label>
            <Input id="description" placeholder="Décrivez les services proposés" />
          </div>

          {/* Budget Details Table */}
          <div className="space-y-2">
            <Label>Détail du budget</Label>
            <div className="border rounded-lg p-4 space-y-4">
              {budgetDetails.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Poste de dépense"
                    value={item.poste}
                    onChange={(e) => handleBudgetChange(index, "poste", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Montant (€)"
                    min="0"
                    value={item.montant}
                    onChange={(e) => handleBudgetChange(index, "montant", e.target.value)}
                  />
                </div>
              ))}
              <Button variant="ghost" onClick={handleAddRow} className="w-full">
                + Ajouter un poste
              </Button>
            </div>
            <p className="text-right font-semibold">Total : {totalBudget.toLocaleString()} €</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Durée estimée (mois)</Label>
            <Input id="duration" type="number" min="1" placeholder="Durée estimée" />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Soumettre le devis
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Project } from "@/types/project";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { DonatePopup } from "@/components/DonatePopup";

interface FundingPhaseProps {
  project: Project;
}

export const FundingPhase = ({ project }: FundingPhaseProps) => {
  const [showAllDonors, setShowAllDonors] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const progress = (project.currentAmount / project.targetAmount) * 100;

  const filteredDonors = project.donateurs.filter(
    (donateur) => donateur.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedDonors = showAllDonors ? filteredDonors : filteredDonors.slice(0, 5);

  const handleDonate = (amount: number) => {
    // Simulate donation logic
    console.log(`Donated ${amount} €`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Progression du financement</h3>
          <Progress value={progress} className="mb-2" />
          <div className="flex justify-between">
            <span>{project.currentAmount.toLocaleString()} €</span>
            <span>{project.targetAmount.toLocaleString()} €</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Documents du projet</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Voir le devis retenu (PDF)
            </Button>
            <Button variant="outline" className="w-full">
              Voir le contrat signé (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Récapitulatif du devis retenu</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Prestataire</h4>
              <p className="text-gray-600">{project.selectedDevis?.prestataire}</p>
            </div>

            <div>
              <h4 className="font-medium">Détail du budget</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Poste</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.selectedDevis?.budgetDetails?.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>{detail.poste}</TableCell>
                      <TableCell className="text-right">{detail.montant.toLocaleString()} €</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h4 className="font-medium">Durée estimée</h4>
              <p className="text-gray-600">{project.selectedDevis?.dureeEstimee}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Liste des donateurs</h3>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un donateur..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {displayedDonors.map((donateur) => (
                <div key={donateur.id} className="flex justify-between items-center">
                  <span className="font-mono">{donateur.name}</span>
                  <span>{donateur.amount.toLocaleString()} €</span>
                </div>
              ))}
            </div>

            {filteredDonors.length > 5 && !showAllDonors && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowAllDonors(true)}
              >
                Voir plus
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <DonatePopup onSubmit={handleDonate} />
    </div>
  );
};
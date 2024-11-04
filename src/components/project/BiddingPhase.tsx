import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/project";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SubmitDevisPopup } from "@/components/SubmitDevisPopup";
import { VotePopup } from "@/components/VotePopup";

interface BiddingPhaseProps {
  project: Project;
}

export const BiddingPhase = ({ project }: BiddingPhaseProps) => {
  const { toast } = useToast();

  const handleSubmitBid = (devis: { prestataire: string; description: string; budget: number }) => {
    toast({ title: "Devis soumis", description: "Votre devis a été soumis avec succès." });
    // Ajouter le devis au projet (simulation)
    project.devis.push({
      ...devis, id: (project.devis.length + 1).toString(), votes: 0,
      siren: "",
      budgetDetails: undefined,
      dureeEstimee: ""
    });
  };

  const handleVote = () => {
    toast({ title: "Vote enregistré", description: "Merci pour votre vote !" });
    // Incrémenter le nombre de votes pour le devis (simulation)
    project.devis[0].votes += 1; // Exemple : incrémenter les votes pour le premier devis
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Informations du projet</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Catégorie</h4>
              <p className="text-gray-600">{project.category}</p>
            </div>
            <div>
              <h4 className="font-medium">Impact et Bénéfices</h4>
              <p className="text-gray-600">{project.impact}</p>
            </div>
            <div>
              <h4 className="font-medium">Emplacement</h4>
              <p className="text-gray-600">{project.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Devis proposés</h3>
            <SubmitDevisPopup title={project.title} onSubmit={handleSubmitBid} />
          </div>

          <div className="space-y-6">
            {project.devis?.map((devis) => (
              <Card key={devis.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold">{devis.prestataire}</h4>
                        <p className="text-sm text-gray-600">SIREN: {devis.siren}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{devis.budget.toLocaleString()} €</p>
                        <p className="text-sm text-gray-600">{devis.votes} votes</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium">Description des services</h5>
                      <p className="text-gray-600">{devis.description}</p>
                    </div>

                    <div>
                      <h5 className="font-medium">Détail du budget</h5>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Poste</TableHead>
                            <TableHead className="text-right">Montant</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {devis.budgetDetails?.map((detail, index) => (
                            <TableRow key={index}>
                              <TableCell>{detail.poste}</TableCell>
                              <TableCell className="text-right">{detail.montant.toLocaleString()} €</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h5 className="font-medium">Durée estimée</h5>
                      <p className="text-gray-600">{devis.dureeEstimee}</p>
                    </div>

                    <VotePopup onSubmit={handleVote} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
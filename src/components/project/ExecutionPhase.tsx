import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ExecutionPhaseProps {
  project: Project;
}

export const ExecutionPhase = ({ project }: ExecutionPhaseProps) => {
  return (
    <div className="space-y-6">
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
          <h3 className="text-xl font-semibold mb-4">Récapitulatif du devis</h3>
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
          <h3 className="text-xl font-semibold mb-4">Mises à jour du projet</h3>
          <div className="space-y-4">
            {project.updates.map((update, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-500">{update.date}</p>
                  <h4 className="font-semibold mb-2">{update.title}</h4>
                  <p>{update.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
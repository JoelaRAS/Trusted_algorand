import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { CardButtons } from "./project/card/CardButtons";

export type ProjectStatus = "Appel d'offre" | "En financement" | "En cours";

interface ProjectCardProps {
  id: string;
  title: string;
  image?: string;
  summary: string;
  status: ProjectStatus;
  currentAmount?: number;
  targetAmount: number;
  provider?: string;
  lastUpdate?: string;
  devis?: any[];
  donateurs?: any[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  image,
  summary,
  status,
  currentAmount = 0,
  targetAmount,
  provider,
  lastUpdate,
  devis,
  donateurs,
}) => {
  const navigate = useNavigate();
  const progress = (currentAmount / targetAmount) * 100;

  const handleDonate = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmitDevis = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "Appel d'offre":
        return "bg-blue-500";
      case "En financement":
        return "bg-violet-500";
      case "En cours":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card 
      className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col"
      onClick={() => navigate(`/project/${id}`)}
    >
      {image && (
        <div className="relative h-48 w-full">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{title}</h3>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2">{summary}</p>
        
        {status === "En financement" && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-right">
              {currentAmount.toLocaleString()} / {targetAmount.toLocaleString()} €
            </p>
          </div>
        )}

        {status === "Appel d'offre" && devis && (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">{devis.length}</span> devis soumis
            </p>
          </div>
        )}

        {status === "En cours" && provider && (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Prestataire:</span> {provider}
            </p>
            {lastUpdate && (
              <p className="text-sm">
                <span className="font-semibold">Dernière mise à jour:</span> {lastUpdate}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <CardButtons 
          status={status}
          title={title}
          devis={devis}
          handleDonate={handleDonate}
          handleSubmitDevis={handleSubmitDevis}
          handleVote={handleVote}
        />
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
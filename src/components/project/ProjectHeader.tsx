import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { DonatePopup } from "@/components/DonatePopup";

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { toast } = useToast();

  const handleDonate = (amount: number) => {
    toast({ title: "Don effectué", description: `Vous avez fait un don de ${amount} €.` });
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <Badge variant="outline" className="text-base px-4 py-1">
            {project.status}
          </Badge>
        </div>
        {project.status === "En financement" && (
          <DonatePopup onSubmit={handleDonate} />
        )}
      </div>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
};
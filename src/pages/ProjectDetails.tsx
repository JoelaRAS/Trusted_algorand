import { useParams } from "react-router-dom";
import { Project } from "@/types/project";
import { projects } from "@/data/projects";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { BiddingPhase } from "@/components/project/BiddingPhase";
import { FundingPhase } from "@/components/project/FundingPhase";
import { ExecutionPhase } from "@/components/project/ExecutionPhase";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div className="container mx-auto px-4 py-8">Projet non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {project.image && (
        <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <ProjectHeader project={project} />
      
      {project.status === "Appel d'offre" && <BiddingPhase project={project} />}
      {project.status === "En financement" && <FundingPhase project={project} />}
      {project.status === "En cours" && <ExecutionPhase project={project} />}
    </div>
  );
};

export default ProjectDetails;
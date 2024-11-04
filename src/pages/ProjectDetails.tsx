import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { ProjectHeader } from "../components/project/ProjectHeader";
import { BiddingPhase } from "@/components/project/BiddingPhase";
import { FundingPhase } from "@/components/project/FundingPhase";
import { ExecutionPhase } from "@/components/project/ExecutionPhase";
import { fetchProjectsFromBlockchain } from "../algorandServices";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await fetchProjectsFromBlockchain();
      const foundProject = projects.find((p) => p.id === id);
      setProject(foundProject);
    };

    fetchData();
  }, [id]);

  if (!project) {
    return <div className="container mx-auto px-4 py-8">Projet non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectHeader project={project} />
      <ProjectCard
        id={project.id}
        title={project.title}
        description={project.description}
        category={project.category}
        impact={project.impact}
        location={project.location}
        status={project.status} currentAmount={0} targetAmount={0}      />
      {project.status === "Appel d'offre" && <BiddingPhase project={project} />}
      {project.status === "En financement" && <FundingPhase project={project} />}
      {project.status === "En cours" && <ExecutionPhase project={project} />}
    </div>
  );
};

export default ProjectDetails;
import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Example featured projects (in a real app, this would come from an API)
  const featuredProjects = [
    {
      id: "1",
      title: "École Rurale Solaire",
      summary: "Installation de panneaux solaires pour une école rurale, permettant l'accès à l'électricité et aux ressources numériques.",
      status: "En financement" as const,
      currentAmount: 5000,
      targetAmount: 10000,
      description: "Installation de panneaux solaires pour une école rurale.",
      category: "Énergie",
      impact: "Accès à l'électricité",
      location: "Rural",
    },
    {
      id: "2",
      title: "Potager Communautaire",
      summary: "Création d'un potager communautaire pour favoriser l'autonomie alimentaire et le lien social.",
      status: "Appel d'offre" as const,
      currentAmount: 0,
      targetAmount: 8000,
      description: "Création d'un potager communautaire.",
      category: "Agriculture",
      impact: "Autonomie alimentaire",
      location: "Communautaire",
      provider: "Médecins Sans Frontières",
      lastUpdate: "Étape 2/4 terminée",
    },
    {
      id: "3",
      title: "Centre Médical Mobile",
      summary: "Équipement d'une clinique mobile pour des soins médicaux dans les zones rurales.",
      status: "En cours" as const,
      currentAmount: 0,
      targetAmount: 15000,
      description: "Équipement d'une clinique mobile.",
      category: "Santé",
      impact: "Soins médicaux",
      location: "Rural",
      provider: "Médecins Sans Frontières",
      lastUpdate: "Étape 2/4 terminée",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-orange-500 text-transparent bg-clip-text">
          Trusted
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Plateforme de crowdfunding caritatif transparente sur Algorand. 
          Soutenez des projets, suivez leur réalisation et participez à leur succès.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/projects")}>
            Explorer les projets
          </Button>
          <Button variant="outline" onClick={() => navigate("/submit-project")}>
            Proposer un projet
          </Button>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Projets en vedette</h2>
          <Button variant="ghost" onClick={() => navigate("/projects")}>
            Voir tous les projets
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
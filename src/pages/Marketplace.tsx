import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ProjectStatus = "Appel d'offre" | "En financement" | "En cours";

const Marketplace = () => {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Exemple de données (à remplacer par un appel API)
  const projects = [
    {
      id: "1",
      title: "École Rurale Solaire",
      summary: "Installation de panneaux solaires pour une école rurale, permettant l'accès à l'électricité et aux ressources numériques.",
      status: "En financement" as const,
      currentAmount: 5000,
      targetAmount: 10000,
      devis: [],
      donateurs: [
        { id: "1", name: "Alice Martin", amount: 1000 },
        { id: "2", name: "Bob Dupont", amount: 500 },
      ],
    },
    {
      id: "2",
      title: "Potager Communautaire",
      summary: "Création d'un potager communautaire pour favoriser l'autonomie alimentaire et le lien social.",
      status: "Appel d'offre" as const,
      targetAmount: 8000,
      devis: [
        {
          id: "1",
          prestataire: "Green Gardens",
          budget: 7500,
          description: "Installation complète avec système d'irrigation",
          votes: 12,
        },
        {
          id: "2",
          prestataire: "Urban Farms",
          budget: 8000,
          description: "Installation avec serre et formation",
          votes: 8,
        },
      ],
    },
    {
      id: "3",
      title: "Centre Médical Mobile",
      summary: "Équipement d'une clinique mobile pour des soins médicaux dans les zones rurales.",
      status: "En cours" as const,
      targetAmount: 15000,
      provider: "Médecins Sans Frontières",
      lastUpdate: "Étape 2/4 terminée",
      contract: {
        description: "Fourniture et équipement d'une unité mobile médicale",
        amount: 15000,
        terms: "Livraison en 4 étapes sur 6 mois",
      },
      updates: [
        {
          date: "2024-02-20",
          title: "Acquisition du véhicule",
          content: "Le véhicule de base a été acquis et est en cours d'aménagement.",
        },
      ],
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusFilters: ProjectStatus[] = ["Appel d'offre", "En financement", "En cours"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
        
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un projet..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((status) => (
              <Badge
                key={status}
                variant="outline"
                className={`cursor-pointer hover:bg-accent px-4 py-2 rounded-full ${
                  selectedStatus === status ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setSelectedStatus(status === selectedStatus ? null : status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;


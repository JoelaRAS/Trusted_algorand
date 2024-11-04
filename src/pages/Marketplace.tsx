import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import ProjectCard from "../components/ProjectCard";
import { Badge } from "../components/ui/badge";
import { fetchProjectsFromBlockchain } from "../algorandServices";

type ProjectStatus = "Appel d'offre" | "En financement" | "En cours";

const Marketplace = () => {
  const [projects, setProjects] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjectsFromBlockchain();
      setProjects(data);
    };

    fetchData();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
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
          <ProjectCard summary={""} key={project.id} {...project} status={project.status as ProjectStatus} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;

import React from 'react';
import { useNavigate } from 'react-router-dom';

export type ProjectStatus = "Appel d'offre" | "En financement" | "En cours";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  location: string;
  status: ProjectStatus;
  currentAmount: number;
  targetAmount: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, category, impact, location, status, currentAmount, targetAmount }) => {
  const navigate = useNavigate();
  const progress = (currentAmount / targetAmount) * 100;

  const handleDonate = (amount: number) => {
    // Logique pour gérer le don
    console.log(`Don de ${amount} € pour le projet ${title}`);
  };

  const handleSubmitDevis = (devis: { prestataire: string; description: string; budget: number }) => {
    // Logique pour gérer la soumission de devis
    console.log(`Devis soumis pour le projet ${title}`, devis);
  };

  const handleVote = () => {
    // Logique pour gérer le vote
    console.log(`Vote pour le projet ${title}`);
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "Appel d'offre":
        return "bg-blue-500";
      case "En financement":
        return "bg-green-500";
      case "En cours":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-600">Catégorie: {category}</p>
      <p className="text-gray-600">Impact: {impact}</p>
      <p className="text-gray-600">Emplacement: {location}</p>
      <p className={`text-white ${getStatusColor(status)}`}>Statut: {status}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <button onClick={() => handleDonate(10)} className="bg-blue-500 text-white px-4 py-2 rounded">Donner 10€</button>
      <button onClick={handleVote} className="bg-green-500 text-white px-4 py-2 rounded ml-2">Voter</button>
    </div>
  );
};

export default ProjectCard;
  import { Project } from "@/types/project";

  export const projects: Project[] = [
    {
      id: "1",
      title: "École Rurale Solaire",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9",  // École avec panneaux solaires
      description: "Installation de panneaux solaires pour une école rurale au Mali, permettant l'accès à l'électricité et aux ressources numériques pour 200 élèves.",
      status: "En financement",
      currentAmount: 5000,
      targetAmount: 10000,
      category: "Éducation",
      impact: "Ce projet bénéficiera directement à plus de 200 élèves en leur donnant accès à l'électricité pour l'éclairage et les équipements informatiques. Il permettra également d'organiser des cours du soir pour les adultes.",
      location: "Village de Tougouni, Mali",
      devis: [],
      selectedDevis: {
        id: "1",
        prestataire: "SolarTech Mali",
        siren: "123456789",
        budget: 10000,
        description: "Installation complète de panneaux solaires avec système de stockage et formation",
        votes: 25,
        budgetDetails: [
          { poste: "Panneaux solaires", montant: 4000 },
          { poste: "Batteries et onduleurs", montant: 3000 },
          { poste: "Installation et câblage", montant: 2000 },
          { poste: "Formation maintenance", montant: 1000 }
        ],
        dureeEstimee: "2 mois",
        etapes: [
          { nom: "Livraison du matériel", duree: "2 semaines" },
          { nom: "Installation des structures", duree: "2 semaines" },
          { nom: "Pose des panneaux et câblage", duree: "2 semaines" },
          { nom: "Tests et formation", duree: "2 semaines" }
        ]
      },
      donateurs: [
        { id: "1", name: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", amount: 2000 },
        { id: "2", name: "0x123d35Cc6634C0532925a3b844Bc454e4438f123", amount: 1500 },
        { id: "3", name: "0x456d35Cc6634C0532925a3b844Bc454e4438f456", amount: 1000 },
        { id: "4", name: "0x789d35Cc6634C0532925a3b844Bc454e4438f789", amount: 500 }
      ],
      contract: {
        description: "Installation de panneaux solaires et formation",
        amount: 10000,
        terms: "Paiement en 3 tranches selon l'avancement"
      },
      updates: [
        {
          date: "2024-02-20",
          title: "Début du projet",
          content: "Le matériel a été commandé et la préparation du site commence cette semaine."
        }
      ]
    },
    {
      id: "2",
      title: "Potager Communautaire",
      image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1",  // Jardin communautaire
      description: "Création d'un potager communautaire de 500m² pour favoriser l'autonomie alimentaire et le lien social dans le quartier prioritaire des Rosiers.",
      status: "Appel d'offre",
      currentAmount: 0,
      targetAmount: 8000,
      category: "Alimentation",
      impact: "Le potager permettra de produire des légumes frais pour 50 familles du quartier et créera un lieu de rencontre et d'apprentissage pour les habitants.",
      location: "Marseille, France",
      devis: [
        {
          id: "1",
          prestataire: "Green Gardens",
          siren: "987654321",
          budget: 7500,
          description: "Aménagement complet du terrain avec système d'irrigation et serre",
          votes: 12,
          budgetDetails: [
            { poste: "Préparation du terrain", montant: 2000 },
            { poste: "Système d'irrigation", montant: 2500 },
            { poste: "Serre et matériel", montant: 2000 },
            { poste: "Formation jardinage", montant: 1000 }
          ],
          dureeEstimee: "6 semaines",
          etapes: [
            { nom: "Préparation du terrain", duree: "2 semaines" },
            { nom: "Installation irrigation", duree: "2 semaines" },
            { nom: "Montage serre", duree: "1 semaine" },
            { nom: "Formation", duree: "1 semaine" }
          ]
        },
        {
          id: "2",
          prestataire: "Urban Farms",
          siren: "456789123",
          budget: 8000,
          description: "Installation complète avec serre bioclimatique et formation permaculture",
          votes: 8,
          budgetDetails: [
            { poste: "Terrassement", montant: 2000 },
            { poste: "Serre bioclimatique", montant: 3000 },
            { poste: "Matériel et plants", montant: 2000 },
            { poste: "Formation permaculture", montant: 1000 }
          ],
          dureeEstimee: "2 mois",
          etapes: [
            { nom: "Études et plans", duree: "2 semaines" },
            { nom: "Terrassement", duree: "2 semaines" },
            { nom: "Construction serre", duree: "2 semaines" },
            { nom: "Plantation et formation", duree: "2 semaines" }
          ]
        }
      ],
      donateurs: [],
      updates: []
    },
    {
      id: "3",
      title: "Centre Médical Mobile",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",  // Unité médicale mobile
      description: "Équipement d'une clinique mobile pour des soins médicaux dans les zones rurales du Sénégal, permettant d'atteindre 10 villages isolés.",
      status: "En cours",
      currentAmount: 15000,
      targetAmount: 15000,
      category: "Santé",
      impact: "Le centre mobile permettra d'offrir des soins médicaux de base à plus de 5000 personnes dans des villages isolés, avec une attention particulière pour les femmes enceintes et les enfants.",
      location: "Région de Thiès, Sénégal",
      devis: [],
      selectedDevis: {
        id: "1",
        prestataire: "MediMobile Sénégal",
        siren: "789123456",
        budget: 15000,
        description: "Équipement complet d'une unité médicale mobile avec matériel de diagnostic",
        votes: 0,
        budgetDetails: [
          { poste: "Véhicule aménagé", montant: 8000 },
          { poste: "Équipement médical", montant: 5000 },
          { poste: "Formation personnel", montant: 1000 },
          { poste: "Stock médicaments", montant: 1000 }
        ],
        dureeEstimee: "3 mois",
        etapes: [
          { nom: "Achat et aménagement véhicule", duree: "6 semaines" },
          { nom: "Installation équipements", duree: "3 semaines" },
          { nom: "Formation équipe", duree: "2 semaines" },
          { nom: "Tests et mise en service", duree: "1 semaine" }
        ]
      },
      donateurs: [
        { id: "1", name: "0xABCd35Cc6634C0532925a3b844Bc454e4438fABC", amount: 10000 },
        { id: "2", name: "0xDEFd35Cc6634C0532925a3b844Bc454e4438fDEF", amount: 5000 }
      ],
      contract: {
        description: "Fourniture et équipement d'une unité mobile médicale",
        amount: 15000,
        terms: "Livraison en 4 étapes sur 3 mois"
      },
      updates: [
        {
          date: "2024-02-20",
          title: "Acquisition du véhicule",
          content: "Le véhicule de base a été acquis et l'aménagement médical commence cette semaine."
        },
        {
          date: "2024-03-05",
          title: "Installation des équipements",
          content: "Les premiers équipements médicaux ont été installés. L'aménagement intérieur est en cours de finalisation."
        }
      ]
    }
  ];
import React, { useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard';
import { getGlobalState } from '../../algorandAPI';
import { mapStatus } from '../../types/project';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const state = await getGlobalState();
      
      const projectData = [
        {
          id: state.project_id,
          title: state.title,
          summary: state.description,
          category: state.category,
          status: mapStatus(state.status),
          targetAmount: parseInt(state.funding_goal, 10),
          currentAmount: parseInt(state.total_contributed, 10),
        }
      ];

      setProjects(projectData);
    };

    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default ProjectList;

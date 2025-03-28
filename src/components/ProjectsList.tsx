import { useState } from "preact/hooks";

import type { Project } from "@/sections/Projects.astro";
import ProjectCard from "@/components/ProjectCard";

interface ProjectListProps {
  projects: Project[];
}

const ProjectsList = ({ projects }: ProjectListProps) => {
  const [projectsList] = useState<Project[]>(projects);

  return (
    <section class="flex flex-col items-center gap-8 mt-2 w-full">
      {projectsList.map((project, index) => (
        <ProjectCard
          key={project.title}
          project={project}
          direction={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </section>
  );
};

export default ProjectsList;

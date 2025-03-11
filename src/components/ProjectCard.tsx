import type { Project } from "@/sections/Projects.astro";
import useAnimateOnScroll from "@/hooks/useAnimateOnScroll";
import Github from "@/icons/Github.tsx";
import LinkIcon from "@/icons/Link.tsx";

const ProjectCard = ({ project }: { project: Project }) => {
  const { ref, animationClass } = useAnimateOnScroll({
    threshold: 0.01,
    animationClass: "animate-blurred-fade-in",
    once: true,
  });
  return (
    <article
      ref={ref}
      class={`w-full flex flex-col items-center  gap-8 mt-4 ${animationClass}}`}
    >
      <div class="flex flex-col xl:flex-row gap-6">
        <a
          href={project.url}
          target="_blank"
          class="w-full xl:w-1/2 h-auto group flex justify-center"
        >
          <div class="relative">
            <img
              src={project.image}
              alt={project.title}
              class="w-full h-full object-contain rounded-xl transition"
            />
            {project.isInProgress && (
              <span class="absolute top-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-br-xl text-sm font-semibold m-2">
                In Progress
              </span>
            )}
          </div>
        </a>
        <div class="w-full xl:w-1/2 flex flex-col gap-6 items-end">
          <p class="font-titleFont text-orange text-sm">Featured Project</p>
          <h3 class="text-2xl font-bold">{project.title}</h3>
          <p class="bg-[#EAEDF7] dark:bg-[#112240] text-sm p-4 rounded-md">
            {project.description}
          </p>
          {/* <TechList tech={project.tech} /> */}
          <div class="text-2xl flex gap-4">
            <a
              href={project.github}
              target="_blank"
              class="hover:text-orange transition duration-300"
            >
              <Github />
            </a>
            <a
              href={project.url}
              target="_blank"
              class="hover:text-orange transition duration-300"
            >
              <LinkIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

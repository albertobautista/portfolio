import type { Project } from "@/sections/Projects.astro";
import useAnimateOnScroll from "@/hooks/useAnimateOnScroll";
import Github from "@/icons/Github.tsx";
import LinkIcon from "@/icons/Link.tsx";

const ProjectCard = ({
  project,
  direction,
}: {
  project: Project;
  direction: "left" | "right";
}) => {
  const { ref, animationClass } = useAnimateOnScroll({
    threshold: 0.01,
    animationClass: "animate-blurred-fade-in",
    once: true,
  });
  return (
    <article
      ref={ref}
      class={`w-full flex flex-col items-center justify-center gap-28 mt-4 ${animationClass}}`}
    >
      <div
        class={`flex flex-col xl:${
          direction === "left" ? "flex-row-reverse" : "flex-row"
        } gap-6`}
      >
        <a
          href={project.url}
          target="_blank"
          class="w-full xl:w-1/2 h-auto group items-center justify-center flex"
        >
          <div class="relative">
            <img
              src={project.image}
              alt={project.title}
              class="w-full h-full object-contain rounded-xl sm:rounded-xl  motion-safe:transition"
            />

            {project.isInProgress && (
              <div class="absolute bg-orange top-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-br-xl text-sm font-semibold m-2">
                In Progress
              </div>
            )}
          </div>
        </a>
        <div class="w-full xl:w-1/2 flex flex-col gap-6 lgl:justify-between items-end z-10">
          <p
            class={`font-titleFont text-orange text-sm tracking-wide w-full flex ${
              direction === "right" ? "justify-end" : "justify-start"
            }`}
          >
            Featured Project
          </p>
          <h3
            class={`text-2xl font-bold w-full flex ${
              direction === "right" ? "justify-end" : "justify-start"
            }`}
          >
            {project.title}
          </h3>
          <p class="bg-[#EAEDF7] dark:bg-[#112240] text-sm md:text-base text-black/80 dark:text-white p-2 md:p-6 rounded-md">
            {project.description}
          </p>
          <ul class="flex flex-wrap text-xs md:text-sm font-titleFont tracking-wide gap-2 md:gap-5 justify-between text-black/80 dark:text-white/80">
            {project.tech.map((tech) => (
              <li class="hover:scale-105 cursor-pointer">{tech}</li>
            ))}
          </ul>
          <div
            class={`text-2xl flex gap-4 w-full ${
              direction === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <a
              href={project.github}
              class="hover:text-orange duration-300"
              target="_blank"
            >
              <Github />
            </a>
            <a
              href={project.url}
              class="hover:text-orange duration-300"
              target="_blank"
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

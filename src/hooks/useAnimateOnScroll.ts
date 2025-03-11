import { useState, useEffect, useRef } from "preact/hooks";

interface UseAnimateOnScrollProps {
  animationClass?: string;
  durationClass?: string;
  threshold?: number;
  once?: boolean;
}

const useAnimateOnScroll = ({
  animationClass = "animate-fade-in-up",
  durationClass = "animate-duration-slow",
  threshold = 0.3,
  once = false,
}: UseAnimateOnScrollProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimated(true);
            if (once) observer.unobserve(element); // Deja de observar si `once` es true
          } else if (!once) {
            setIsAnimated(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return {
    ref,
    animationClass: isAnimated
      ? `${animationClass} opacity-100 transition-all ease-out ${durationClass}`
      : "opacity-0",
  };
};

export default useAnimateOnScroll;

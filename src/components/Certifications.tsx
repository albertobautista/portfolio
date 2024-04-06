import "photoswipe/style.css";

import { useGallery } from "@/hooks/useGallery";
import "@/components/styles/Certifications.css";

export default function Certifications() {
  const { first, photos } = useGallery();

  return (
    <div>
      <masonry-layout
        gap="24"
        maxcolwidth="200"
        class="lg:mx-auto "
        id="gallery"
      >
        {photos.map(({ height, width }, i) => (
          <a
            class="group rounded-xl hover:scale-105 hover:contrast-[110%] transition-all relative"
            href={`/archivo-page/gallery/img-${i + 1}.webp`}
            target="_blank"
            data-cropped="true"
            data-pswp-width={width}
            data-pswp-height={height}
            ref={!first.current ? first : undefined}
          >
            <img
              class="rounded-xl object-cover w-full h-auto"
              loading="lazy"
              src={`/archivo-page/gallery/thumbnails/img-${i + 1}.webp`}
              alt="Fotografía de los premios ESLAND"
            />
            <img
              class="blur-md opacity-0 group-hover:opacity-100 absolute inset-0 transition contrast-150 -z-10 object-cover"
              loading="lazy"
              src={`/archivo-page/gallery/thumbnails/img-${i + 1}.webp`}
              alt="Imagen con efecto blur para hacer de sombra de una fotografía de los premios ESLAND"
            />
          </a>
        ))}
      </masonry-layout>
    </div>
  );
}

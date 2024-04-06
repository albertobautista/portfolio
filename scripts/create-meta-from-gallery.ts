import { Glob } from "bun";
import { imageMeta } from "image-meta";
import { join } from "node:path";

const glob = new Glob("public/archivo-page/gallery/*.{webp}");

const metaEditions: { height: number; width: number }[] = [];
console.log("metaEditions", metaEditions[0]);
console.log("glob", glob);

for await (const file of glob.scan(".")) {
  const data = await Bun.file(file).arrayBuffer();
  const { height = 0, width = 0 } = imageMeta(Buffer.from(data));

  const imageNumber = Number(file.match(/img-(\d+)/)?.[1] || "");
  const edition = Number(file.match(/\/(\d+)\//)?.[1] || "");
  console.log("imageNumber", imageNumber);
  console.log("edition", edition);
  console.log("metaEditions[edition - 1][imageNumber - 1] ", metaEditions[0]);

  metaEditions[imageNumber - 1] = { height, width };
}

const outputPath = join(process.cwd(), "src/data/meta-gallery.json");
await Bun.write(outputPath, JSON.stringify(metaEditions));

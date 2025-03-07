import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";
import dotenv from "dotenv";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [tailwind(), preact()],
});

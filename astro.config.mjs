import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

export default defineConfig({
  output: "static",
  site: "https://www.brandlift.pe",
  trailingSlash: "always",
  adapter: vercel(),
  integrations: [react()],
});

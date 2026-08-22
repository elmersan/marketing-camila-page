import type { APIRoute } from "astro";

const siteUrl = "https://www.brandlift.pe";
const indexablePaths = ["/", "/planes-de-suscripcion/", "/our-vision/"];

export const prerender = true;

export const GET: APIRoute = () => {
  const urls = indexablePaths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};

import fs from "fs";
import path from "path";

const BASE_URL = "https://platinumscope.pages.dev";
const SITEMAP_PATH = "public/sitemap.xml";

const jsonPath = path.resolve("src/data/reviews.json");
const reviews = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

const urls = [
  `${BASE_URL}/`,
  ...reviews.map(r => `${BASE_URL}/review/${r.id}`)
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
  </url>
`).join("")}
</urlset>`;

// Guardar
fs.writeFileSync(SITEMAP_PATH, xml);

console.log("Sitemap generado con", urls.length, "URLs");

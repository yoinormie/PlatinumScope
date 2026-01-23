import fs from "fs";
import reviews from "../src/data/reviews.json" assert { type: "json" };

const BASE_URL = "https://platinumscope.pages.dev";

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

fs.writeFileSync("public/sitemap.xml", xml);

console.log("Sitemap generado con", urls.length, "URLs");

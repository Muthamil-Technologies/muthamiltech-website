// Link previews for japanone.app. Both domains serve the same index.html, whose tags name
// Muthamil Technologies; Facebook, Instagram, LINE and X don't run JavaScript, so on a
// japanone host the page's title, description, URL and image are swapped here instead.

import { PAGES } from "../seo/pages.ts";

const ORIGIN = "https://japanone.app";
const TITLE = "JapanOne | Learn Japanese, plan your trip, work in Japan";
const DESCRIPTION =
  "Practise Japanese, prepare for the JLPT, and find checked guides for studying, working, travelling and living in Japan.";
const NAV: [string, string][] = [["/learn", "Learn"], ["/study", "Study"], ["/work", "Work"], ["/travel", "Travel"], ["/live", "Live"], ["/guides", "Guides"]];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const clean = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/** The page's text, replaced by the app once it starts. Same words as the page, for readers without JavaScript. */
function staticBody(path: string): string {
  const page = PAGES[path];
  if (!page) return "";
  const links = [...(page.links ?? []), ...NAV];
  const sources = (page.sources ?? []).map((s) => `<li><a href="${esc(s.url)}" rel="nofollow">${esc(s.name)}</a></li>`).join("");
  return `<main style="max-width:720px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif"><h1>${esc(page.h1)}</h1>` +
    page.text.map((t) => `<p>${esc(t)}</p>`).join("") +
    (page.checked ? `<p>Checked ${esc(page.checked)}</p>` : "") +
    (sources ? `<h2>Sources</h2><ul>${sources}</ul>` : "") +
    `<nav><ul>${links.map(([to, name]) => `<li><a href="${esc(to)}">${esc(name)}</a></li>`).join("")}</ul></nav></main>`;
}

function structured(path: string): string {
  const page = PAGES[path];
  if (path === "/") return JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "JapanOne", url: `${ORIGIN}/` });
  if (page?.checked) {
    return JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: page.h1, dateModified: page.checked,
      url: `${ORIGIN}${path}`, publisher: { "@type": "Organization", name: "JapanOne" } });
  }
  return "";
}

export function brandHtml(html: string, url: URL): string {
  const path = clean(url.pathname);
  const seo = PAGES[path];
  const title = esc(seo?.title ?? TITLE);
  const description = esc(seo?.description ?? DESCRIPTION);
  const page = `${url.origin}${path === "/" ? "/" : path}`;
  const image = `${url.origin}/japanone_logo_512.png`;
  const data = structured(path);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${description}"`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${title}"`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${description}"`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${page}"`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*"/, `$1${title}"`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${description}"`)
    .replace(
      "</head>",
      `  <meta property="og:site_name" content="JapanOne" />\n    <meta property="og:image" content="${image}" />\n    <meta name="twitter:image" content="${image}" />\n    <link rel="icon" href="/japanone_logo_64.png" />\n` +
        (seo ? `    <link rel="canonical" href="${ORIGIN}${path === "/" ? "/" : path}" />\n` : "") +
        (data ? `    <script type="application/ld+json">${data.replace(/</g, "\\u003c")}</script>\n` : "") +
        `  </head>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${staticBody(path)}</div>`);
}

export function sitemap(): string {
  const urls = Object.entries(PAGES).map(([path, p]) =>
    `  <url><loc>${ORIGIN}${path}</loc>${p.checked ? `<lastmod>${p.checked}</lastmod>` : ""}</url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const url = new URL(request.url);
  const japanone = url.hostname.includes("japanone");
  if (japanone && url.pathname === "/sitemap.xml") {
    return new Response(sitemap(), { headers: { "content-type": "application/xml; charset=utf-8" } });
  }
  const response = await context.next();
  if (!japanone) return response;
  if (url.pathname === "/robots.txt") {
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(`${await response.text()}\nSitemap: ${ORIGIN}/sitemap.xml\n`, { status: response.status, headers });
  }
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(brandHtml(await response.text(), url), { status: response.status, headers });
};

export const config = {
  path: "/*",
  excludedPath: ["/assets/*", "/learn/*.json", "/characters/*", "/*.png", "/*.svg", "/*.js", "/*.webmanifest"],
};

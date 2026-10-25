// Link previews for japanone.app. Both domains serve the same index.html, whose tags name
// Muthamil Technologies; Facebook, Instagram, LINE and X don't run JavaScript, so on a
// japanone host the page's title, description, URL and image are swapped here instead.

const TITLE = "JapanOne | Learn Japanese, plan your trip, work in Japan";
const DESCRIPTION =
  "Free Japanese practice, a JLPT countdown and study tools, plus apps for travelling and working in Japan.";

export function brandHtml(html: string, url: URL): string {
  const page = `${url.origin}${url.pathname}`;
  const image = `${url.origin}/japanone_logo_512.png`;
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${DESCRIPTION}"`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${TITLE}"`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${DESCRIPTION}"`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${page}"`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*"/, `$1${TITLE}"`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${DESCRIPTION}"`)
    .replace(
      "</head>",
      `  <meta property="og:site_name" content="JapanOne" />\n    <meta property="og:image" content="${image}" />\n    <meta name="twitter:image" content="${image}" />\n    <link rel="icon" href="/japanone_logo_64.png" />\n  </head>`,
    );
}

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const url = new URL(request.url);
  const response = await context.next();
  if (!url.hostname.includes("japanone")) return response;
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(brandHtml(await response.text(), url), { status: response.status, headers });
};

export const config = {
  path: "/*",
  excludedPath: ["/assets/*", "/learn/*.json", "/characters/*", "/*.png", "/*.svg", "/*.js", "/*.webmanifest"],
};

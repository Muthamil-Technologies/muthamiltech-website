# Muthamil Technologies

Source for [muthamiltech.com](https://muthamiltech.com) — the Muthamil Technologies product ecosystem site (JapTalk, JapTest, JapJob, JapTour).

Built with React + TypeScript + Tailwind CSS + Vite. Deploys automatically to Netlify on every push to `main`.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build, output in dist/
npm run preview   # serve the production build locally
```

## Editing product content

Everything shown for each product — name, category, description, status label, feature bullets — lives in one place: `src/data/products.ts`. Change a status (e.g. from `"in-development"` to `"live"`) there and it updates everywhere that product appears on the site.

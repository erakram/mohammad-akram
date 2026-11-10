# Mohammad Akram — Portfolio

Single-page portfolio for Mohammad Akram, Senior Full Stack Engineer & AI Agent builder.

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS · Framer Motion

## Run locally

```bash
npm install
npm run dev
```

## Update content

All text (profile, skills, experience, projects, AI agents) lives in [`src/data.ts`](src/data.ts).
The downloadable CV is `public/Mohammad_Akram_CV.pdf`.

## Deploy (Render)

`render.yaml` defines a static site: build with `npm ci && npm run build`, publish `dist/`.
In Render: **New → Blueprint**, pick this repo, and apply.

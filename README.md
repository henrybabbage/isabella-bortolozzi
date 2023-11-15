# Galerie Isabella Bortolozzi

This website is a Next.js project bootstrapped with create-next-app. Structured content is managed with Sanity.io.
NextJS

## Configuration

First, from the root directory run the development server:

npm run dev

Open http://localhost:3000 with your browser to see the result.
Sanity.io

Log in to Sanity and then start the development server from the sanity directory:

sanity dev

Open http://localhost:3333 with your browser to see the result.
Vercel

This project is deployed with Vercel.

## Project Overview

# Important files and folders

| File(s)                          | Description                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `sanity.config.ts`               | Config file for Sanity Studio                                                         |
| `sanity.cli.ts`                  | Config file for Sanity CLI                                                            |
| `/pages/index.tsx`               | Landing page for `/`.                                                                 |
| `/pages/studio/[[...index]].tsx` | Where Sanity Studio is mounted                                                        |
| `/pages/api/draft.ts`            | Serverless route for triggering Draft mode                                            |
| `/sanity/schemas.ts`             | Where Sanity Studio gets its content types from                                       |
| `/sanity/env.ts`                 | Configuration for the Sanity project and dataset                                      |
| `/sanity/schemas.ts`             | Where Sanity Studio gets its content types from                                       |
| `/sanity/lib/client.ts`          | Sanity client configured based on `env.ts`                                            |
| `/sanity/lib/image.ts`           | Sanity image builder - unused in this template, but is needed to render Sanity images |
| `tailwind.config.js`             | Tailwind config. Only applies to files listed under `content`                         |

All pages are wrapped in `pages/_document.tsx` and `pages/_app.tsx`.


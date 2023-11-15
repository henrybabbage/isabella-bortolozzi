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

## Links and resources

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fsanity-template-nextjs-clean&repository-name=nextjs-sanity-clean&project-name=nextjs-sanity-clean&demo-title=Clean+Sanity+%2B+Next.js+app&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F835514%2F212771865-7a603a28-0416-45e8-84d3-2aafe02b0c7f.png&demo-description=A+clean+example+of+Next.js+with+embedded+Sanity+ready+for+recomposition.&demo-url=https%3A%2F%2Ftemplate-nextjs-clean.sanity.build&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dnextjs-sanity-clean
[integration]: https://www.sanity.io/docs/vercel-integration?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[`.env.local.example`]: .env.local.example
[nextjs]: https://github.com/vercel/next.js
[sanity-create]: https://www.sanity.io/get-started/create-project?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-deployment]: https://www.sanity.io/docs/deployment?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-community]: https://slack.sanity.io/
[sanity-schema-types]: https://www.sanity.io/docs/schema-types?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-github]: https://github.com/sanity-io/sanity/discussions
[sanity-groq]: https://www.sanity.io/docs/groq?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-content-modelling]: https://www.sanity.io/docs/content-modelling?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-webhooks]: https://www.sanity.io/docs/webhooks?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[localhost-3000]: http://localhost:3000
[localhost-3000-studio]: http://localhost:3000/studio
[vercel-isr]: https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta
[vercel]: https://vercel.com
[vercel-github]: https://github.com/vercel/next.js/discussions
[app-dir]: https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory

/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig, SanityDocument } from 'sanity'
import { DefaultDocumentNodeResolver, deskTool } from 'sanity/desk'
import {
    defineUrlResolver,
    Iframe,
    IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import { media } from 'sanity-plugin-media'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { schema } from 'schemas'

import deskStructure from '@/lib/deskStructure'
// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
    apiVersion,
    dataset,
    previewSecretId,
    projectId,
} from '@/lib/sanity.api'

const iframeOptions = {
  url: defineUrlResolver({
    base: '/api/draft',
    requiresSlug: ['artist'],
  }),
  urlSecretId: previewSecretId,
  reload: { button: true },
} satisfies IframeOptions

function getPreviewUrl(doc: SanityDocument) {
    return doc?.slug
      ? `${window.location.host}/${doc.slug}`
      : window.location.host
}

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
    // Only show preview pane on `movie` schema type documents
    switch (schemaType) {
      case `artist`:
        return S.document().views([
          S.view.form(),
          S.view
            .component(Iframe)
            .options({
              url: (doc: SanityDocument) => getPreviewUrl(doc),
            })
            .title('Preview'),
        ])
      default:
        return S.document().views([S.view.form()])
    }
}

export default defineConfig({
  basePath: '/studio',
  name: 'isabella-bortolozzi',
  title: 'Galerie Isabella Bortolozzi',
  projectId,
  dataset,
  //edit schemas in './src/schemas'
  schema,
  plugins: [
    deskTool({
        structure: deskStructure,
        // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
        // You can add any React component to `S.view.component` and it will be rendered in the pane
        // and have access to content in the form in real-time.
        // It's part of the Studio's “Structure Builder API” and is documented here:
        // https://www.sanity.io/docs/structure-builder-reference
        defaultDocumentNode: (S, { schemaType }) => {
            return S.document().views([
            // Default form view
            S.view.form(),
            // Preview
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
            ])
        },
    }),
    // Add the "Open preview" action
    previewUrl({
      base: '/api/draft',
      requiresSlug: ['artist'],
      urlSecretId: previewSecretId,
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    simplerColorInput(),
  ],
})

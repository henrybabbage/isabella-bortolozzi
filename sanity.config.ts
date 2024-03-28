/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

// import { deDELocale } from '@sanity/locale-de-de'
import { visionTool } from '@sanity/vision'
import { defineConfig, SanityDocument } from 'sanity'
import { DefaultDocumentNodeResolver, structureTool } from 'sanity/structure'
import {
    defineUrlResolver,
    Iframe,
    IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import { media } from 'sanity-plugin-media'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
    apiVersion,
    dataset,
    previewSecretId,
    projectId,
} from './sanity/lib/sanity.api'
import structure from './sanity/lib/sanity.structure'
import { schema } from './sanity/schemas'

const iframeOptions = {
    url: defineUrlResolver({
        base: '/api/draft',
        requiresSlug: ['artist', 'exhibition', 'viewingRoom'],
    }),
    urlSecretId: previewSecretId,
    reload: { button: true },
} satisfies IframeOptions

function getPreviewUrl(doc: SanityDocument) {
    return doc?.slug
        ? `${window.location.host}/${doc.slug}`
        : window.location.host
}

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
    // e.g. Only show preview pane on `artist` schema type documents
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

export const singletonTypes = ['home', 'colophon', 'contact', 'imprint', 'seo']

const newDocumentOptions = (newDocumentOptions: any) => {
    const filteredNewDocumentOptions = newDocumentOptions.filter((documentOption: any) => {
        // return only the documentTypes that are not singletons
        return !singletonTypes.includes(documentOption.templateId)
    })
    return filteredNewDocumentOptions
}

// Determines the actions that appear in the Publish button
const actions = (actions: any, { schemaType }: any) => {
    // destructure all actions so we can order them if required
    const [publish, discardChanges, unPublish, duplicate, deleteDocument] = actions

    if (singletonTypes.includes(schemaType)) {
        return [publish]
    }

    return [
        discardChanges,
        unPublish,
        duplicate,
        deleteDocument,
    ]
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
        structureTool({
            structure: structure,
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
            requiresSlug: ['artist', 'exhibition', 'viewingRoom'],
            urlSecretId: previewSecretId,
        }),
        // Vision lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
        media(),
        simplerColorInput(),
        // deDELocale({
        //     title: 'German',
        // }),
    ],
    document: {
        newDocumentOptions: newDocumentOptions,
        // actions: actions,
        // For singleton types, filter out actions that are not explicitly included
        // in the `singletonActions` list defined above
        // actions: (input, context) => (singletonTypes.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input)
    }
})

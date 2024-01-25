import { TrendUpwardIcon } from '@sanity/icons'
import { defineField, defineType, type Image } from 'sanity'
import { decodeAssetUrl } from '@/sanity/utils/decodeAssetUrl'

const TITLE = 'SEO'

export default defineType({
    name: 'seo',
    title: 'SEO',
    type: 'document',
    icon: TrendUpwardIcon,
    groups: [
        { title: 'Global SEO', name: 'seo', default: true },
        { title: 'Social Sharing', name: 'social' },
        { title: 'Browser Icons', name: 'icons' }
    ],
    fields: [
        // SEO
        defineField({
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            description: 'Internal use',
            group: 'seo',
            readOnly: true,
        }),
        defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'string',
            description: 'The main site url',
            group: 'seo',
            readOnly: true,
        }),
        defineField({
            name: 'metaTitle',
            title: 'Default Meta Title',
            type: 'string',
            description: 'Displayed on all pages',
            group: 'seo',
            readOnly: true,
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'metaDesc',
            title: 'Default Meta Description',
            type: 'text',
            rows: 2,
            group: 'seo',
            validation: Rule =>
                Rule.max(150).warning('Longer descriptions may be truncated by search engines')
        }, {strict: false }),
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            group: 'seo'
        }, {strict: false }),
        defineField({
            title: 'Default Share Title',
            name: 'shareTitle',
            type: 'string',
            description: 'Title used for social sharing cards',
            validation: Rule =>
                Rule.max(50).warning('Longer titles may be truncated by social sites'),
            group: 'social'
        }),
        defineField({
            title: 'Default Share Description',
            name: 'shareDesc',
            type: 'text',
            rows: 3,
            description: 'Description used for social sharing cards',
            validation: Rule =>
                Rule.max(150).warning(
                'Longer descriptions may be truncated by social sites'
                ),
            group: 'social'
        }, {strict: false }),
        defineField({
            title: 'Default Share Graphic',
            name: 'shareGraphic',
            type: 'image',
            description: 'Recommended size: 1200x630 (PNG or JPG)',
            group: 'social'
        }),
        defineField({
            title: 'Browser Icon (Favicon)',
            name: 'favicon',
            type: 'image',
            description: 'Upload a 16 x 16 SVG icon to use as the browser icon',
            options: {
              accept: 'image/svg+xml'
            },
            validation: Rule => {
              return Rule.custom((field: Image) => {
                if (!field) return true
        
                const { dimensions } = decodeAssetUrl(field?.asset?._ref)
        
                if (dimensions.width !== 16 || dimensions.height !== 16) {
                  return 'Favicon must be a 16x16 SVG'
                } else {
                  return true
                }
              })
            },
            group: 'icons'
        }),
        defineField({
            title: 'Legacy Browser Icon (.ico)',
            name: 'faviconLegacy',
            type: 'file',
            description: 'Upload a 32 x 32 .ico file for older browsers',
            validation: Rule => {
              return Rule.custom((field: Image) => {
                if (!field) return true
        
                const { format } = decodeAssetUrl(field?.asset?._ref)
        
                if (format !== 'ico') {
                  return 'Legacy Favicon must be a 32x32 ICO file'
                } else {
                  return true
                }
              })
            },
            group: 'icons'
        }),
        defineField({
            title: 'Touch Icon',
            name: 'touchIcon',
            type: 'image',
            description: 'Recommended size: 192x192 (PNG)',
            group: 'icons'
        }),
    ],
        preview: {
            prepare() {
            return {
                title: TITLE
            }
        }
    }
})

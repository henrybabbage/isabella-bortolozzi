import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
      description: 'Sales image',
    }),
    defineField({
      name: 'imageGallery',
      title: 'Image gallery',
      type: 'imageGallery',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Must be in format "YYYY"',
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'simpleBlockContent',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      description: 'Must be in format "H x W x D" (do not include units)',
      options: {
        columns: 3,
      },
      fields: [
        defineField({
          name: 'heightCM',
          title: 'Height (cm)',
          type: 'string',
        }),
        defineField({
          name: 'widthCM',
          title: 'Width (cm)',
          type: 'string',
        }),
        defineField({
          name: 'depthCM',
          title: 'Depth (cm)',
          type: 'string',
        }),
        defineField({
          name: 'heightIN',
          title: 'Height (inches)',
          type: 'string',
        }),
        defineField({
          name: 'widthIN',
          title: 'Width (inches)',
          type: 'string',
        }),
        defineField({
          name: 'depthIN',
          title: 'Depth (inches)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'framed',
      title: 'Framed',
      type: 'object',
      description:
        '(Optional field). Must be in format "H x W x D" (do not include units)',
      options: {
        columns: 3,
      },
      fields: [
        defineField({
          name: 'framedHeightCM',
          title: 'Framed Height (cm)',
          type: 'string',
        }),
        defineField({
          name: 'framedWidthCM',
          title: 'Framed Width (cm)',
          type: 'string',
        }),
        defineField({
          name: 'framedDepthCM',
          title: 'Framed Depth (cm)',
          type: 'string',
        }),
        defineField({
          name: 'framedHeightIN',
          title: 'Framed Height (inches)',
          type: 'string',
        }),
        defineField({
          name: 'framedWidthIN',
          title: 'Framed Width (inches)',
          type: 'string',
        }),
        defineField({
          name: 'framedDepthIN',
          title: 'Framed Depth (inches)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      options: {
        columns: 2,
      },
      hidden: ({ document }) => document._type == 'exhibition',
      fields: [
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          description: 'Only for viewing room page',
          options: {
            layout: 'dropdown',
            list: [
              { title: '$', value: '$' },
              { title: 'Eur', value: 'Eur' },
              { title: '£', value: '£' },
            ],
          },
        }),
        defineField({
          name: 'amount',
          title: 'Amount',
          type: 'string',
          description: 'Only for viewing room page',
        }),
        defineField({
          name: 'VAT',
          title: 'VAT',
          type: 'string',
          description: 'Option to note excluding VAT or including VAT',
        }),
      ],
    }),
    defineField({
      name: 'enquire',
      title: 'Enquire',
      type: 'object',
      fields: [
        defineField({
          name: 'callToAction',
          title: 'Call to action',
          type: 'string',
          description: 'Button label',
        }),
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true,
              scheme: ['https', 'http', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Artist',
      name: 'artist',
      by: [{ field: 'artist', direction: 'desc' }],
    },
    {
      title: 'Year',
      name: 'year',
      by: [{ field: 'year', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'title',
      by: [{ field: 'title', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist.name',
      media: 'mainImage.asset',
    },
    prepare(selection) {
      const { artist } = selection
      return { ...selection, subtitle: { artist } && `by ${artist}` }
    },
  },
})

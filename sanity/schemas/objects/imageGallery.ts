import { getExtension, getImageDimensions } from '@sanity/asset-utils'
import { defineField, defineType,type Image } from 'sanity'

export default defineType({
	name: 'imageGallery',
	title: 'Image Gallery',
	type: 'array',
  of: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        storeOriginalFilename: true,
        hotspot: true,
      },
      preview: {
        select: {
          imageUrl: 'asset.url',
        },
      },
      validation: (Rule) =>
        Rule.custom((value: Image, context) => {
          if (!value) {
            return true
          }
          const filetype = getExtension(value?.asset?._ref)
          if (filetype !== 'jpg' && filetype !== 'png') {
            return 'Image must be a JPG or PNG'
          }
          const { width, height } = getImageDimensions(value?.asset?._ref)
          if (width < 1200 || height < 680) {
            return 'Image must be at least 1200x680 pixels'
          }
          return true
        }).warning(),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          initialValue: 'Galerie Isabella Bortolozzi',
          validation: (Rule) =>
            Rule.required().warning('Please fill out the alternative text'),
          description:
            'Important for SEO and accessibility and improves website rating on Google',
        }),
        defineField({
          name: 'fullbleed',
          title: 'Full bleed image',
          type: 'boolean',
          hidden: ({ document }) => document._type == 'artist',
          description:
            'Display image the full width of the screen. The first image will be full width by default.',
        }),
        defineField({
          name: 'details',
          title: 'Details',
          type: 'caption',
          description: 'Artwork materials or installation view details',
        }),
        defineField({
          name: 'artwork',
          title: 'Artwork',
          type: 'reference',
          to: [{ type: 'artwork' }],
          description:
            'Connect an artwork to this image (works with viewing room only)',
          hidden: ({ document }) =>
            document._type == 'exhibition' || document._type == 'artist',
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
            {
              name: 'currency',
              title: 'Currency',
              type: 'string',
              description: 'Only for viewing room page',
              options: {
                layout: 'dropdown',
                list: [
                  { title: 'USD', value: 'USD' },
                  { title: 'Eur', value: 'Eur' },
                  { title: '£', value: '£' },
                ],
              },
              validation: (Rule) =>
                Rule.required().warning('Please set a currency'),
            },
            {
              name: 'amount',
              title: 'Amount',
              type: 'string',
              description: 'Only for viewing room page',
              validation: (Rule) =>
                Rule.required().warning('Please set a price'),
            },
            {
              name: 'VAT',
              title: 'VAT',
              type: 'string',
              description: 'Option to note excluding VAT or including VAT',
            },
          ],
        }),
      ],
    }, {strict: false }),
  ],


	options: {
		layout: 'grid',
	},
})
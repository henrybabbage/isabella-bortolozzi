import { UserIcon } from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artist(s)',
  type: 'document',
  icon: UserIcon,
  orderings: [orderRankOrdering],
	groups: [
		{ title: 'Slideshow', name: 'slideshow' },
		{ title: 'Selected exhibitions', name: 'exhibitions' },
		{ title: 'Exhibition history', name: 'cv' },
  ],
  fields: [
    orderRankField({ type: 'artist' }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 120,
      },
    }),
    defineField({
        name: 'galleryArtist',
        title: 'Gallery artist',
        type: 'boolean',
        description: 'Activates artist page',
    }),
    defineField({
        name: 'imageGallery',
        title: 'Image gallery',
        type: 'imageGallery',
        description: 'Selected images for artist page carousel',
        group: 'slideshow',
    }),
    defineField({
        name: 'artistBio1',
        title: 'Artist bio',
        type: 'object',
        options: { collapsible: true, collapsed: false },
        group: 'cv',
        fields: [
            {
                name: 'locationOfBirth',
                title: 'Born in',
                type: 'string',
                description: 'City + Country ONLY',
            },
            {
                name: 'yearOfBirth',
                title: 'Year of Birth',
                type: 'string',
                validation: (Rule) => Rule.max(4),
                description: '(YYYY) Year ONLY',
            },
            {
                name: 'livesAndWorks',
                title: 'Based in',
                type: 'string',
                description: 'City + Country ONLY',
            },
        ],
    } as const),
    defineField({
        name: 'artistBio2',
        title: 'Artist bio',
        type: 'object',
        group: 'cv',
        options: {
            collapsible: true,
            collapsed: true,
        },
        fields: [
            defineField({
                name: 'locationOfBirth',
                title: 'Born in',
                type: 'string',
                description: 'City + Country ONLY',
            }),
            defineField({
                name: 'yearOfBirth',
                title: 'Year of Birth',
                type: 'string',
                validation: (Rule) => Rule.max(4),
                description: '(YYYY) Year ONLY',
            }),
            defineField({
                name: 'livesAndWorks',
                title: 'Based in',
                type: 'string',
                description: 'City + Country ONLY',
            }),
        ],
    }, {strict: false }),
    defineField({
        name: 'selectedExhibitions',
        title: 'Selected exhibitions',
        type: 'array',
        description: 'Filtered list of exhibitions relating to this artist',
        group: 'exhibitions',
        of: [
            {
                type: 'reference',
                to: { type: 'exhibition' },
                options: {
                    filter: ({ document }) => {
                        const id = document._id.includes('drafts.') ? document._id.slice(7) : document._id
                        return {
                            filter: '$id in artists[]._ref',
                            params: {
                                id,
                            },
                        }
                    },
                },
            },
        ],
    } as const),
    defineField({
        name: 'soloExhibitionHistory',
        title: 'Solo exhibition history',
        type: 'array',
        of: [{ type: 'exhibitionRecord' }],
        description: 'List',
        group: 'cv',
    } as const),
    defineField({
        name: 'groupExhibitionHistory',
        title: 'Group exhibition history',
        type: 'array',
        of: [{ type: 'exhibitionRecord' }],
        description: 'List',
        group: 'cv',
    } as const),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})

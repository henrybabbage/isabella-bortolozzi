import { DesktopIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
	name: 'viewingRoom',
	title: 'Viewing rooms',
	type: 'document',
	icon: DesktopIcon,
	fields: [
		defineField({
			name: 'artistName',
			title: 'Artist name',
			type: 'string',
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 120,
			},
		}),
		defineField({
			name: 'mainImage',
			title: 'mainImage',
			type: 'mainImage',
			description: 'Preview image',
		}),
		defineField({
			name: 'type',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Solo', value: 'solo' },
					{ title: 'Group', value: 'group' },
				],
				layout: 'dropdown',
			},
			initialValue: 'solo',
		}),
		defineField({
			name: 'artists',
			title: 'Artist(s)',
			type: 'array',
            of: [
                defineArrayMember({
                  type: 'reference',
                  to: [{ type: 'artist' }],
                }),
            ],
		} as const),
		defineField({
			name: 'artworks',
			title: 'Artworks',
			type: 'array',
            of: [
                defineArrayMember({
                  type: 'reference',
                  to: [{ type: 'artwork' }],
                }),
            ],
			description: 'For slider in footer section',
		} as const),
		defineField({
			name: 'imageGallery',
			title: 'Image gallery',
			type: 'imageGallery',
			description: 'Image selection for viewing room page',
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
		}),
		defineField({
			name: 'startDate',
			title: 'Start date',
			type: 'datetime',
			options: {
				dateFormat: 'MMMM Do YYYY',
			},
		}),
		defineField({
			name: 'endDate',
			title: 'End date',
			type: 'datetime',
			options: {
				dateFormat: 'MMMM Do YYYY',
			},
		}),
		defineField({
			name: 'year',
			title: 'Year',
			type: 'string',
			description: 'Must be in format "YYYY"',
			validation: (Rule) => Rule.required().max(4),
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
			description: 'Press release',
		}),
		defineField({
			name: 'enquire',
			title: 'Enquire',
			type: 'object',
			fields: [
				defineField({
					title: 'Call to action',
					name: 'callToAction',
					type: 'string',
					description: 'Button label',
				}),
				defineField({
					title: 'URL',
					name: 'href',
					type: 'url',
					validation: (Rule) =>
						Rule.uri({
							allowRelative: true,
							scheme: ['https', 'http', 'mailto', 'tel'],
						}),
				}),
			],
		} as const),
	],
	orderings: [
		{
			title: 'Newest first',
			name: 'newest',
			by: [{ field: 'endDate', direction: 'desc' }],
		},
		{
			title: 'Oldest first',
			name: 'oldest',
			by: [{ field: 'endDate', direction: 'asc' }],
		},
	],
	preview: {
		select: {
			title: 'artistName',
			artist0: 'artists.0.name',
			artist1: 'artists.1.name',
			artist2: 'artists.2.name',
			artist3: 'artists.3.name',
			year: 'year',
		},
		prepare: ({ title, artist0, artist1, artist2, artist3, year }) => {
			const artist = [artist0, artist1, artist2].filter(Boolean)
			const subtitle = artist.length > 0 ? `${year} | ${artist.join(', ')}` : ''
			const hasMoreArtists = Boolean(artist3)
			return {
				title,
				subtitle: hasMoreArtists ? `${subtitle}…` : subtitle,
				media: DesktopIcon,
			}
		},
	},
})

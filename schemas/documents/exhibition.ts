import { StackCompactIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
	name: 'exhibition',
	title: 'Exhibitions',
	type: 'document',
	icon: StackCompactIcon,
	fields: [
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
			name: 'location',
			title: 'Location',
			type: 'string',
			options: {
				list: [
					{ title: 'Gallery', value: 'gallery' },
					{ title: 'External', value: 'external' },
				],
				layout: 'dropdown',
			},
			initialValue: 'gallery',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'externalDisplay',
			title: 'Link to an external website',
			type: 'boolean',
			description: 'Turn on (green) to display this exhibition via a link to an external website.',
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'Specify the page slug for the exhibition on the frontend.',
			options: {
				source: 'title',
				maxLength: 120,
			},
			hidden: ({ document }) => document?.externalDisplay === true,
			validation: (Rule) =>
				Rule.custom((set, context) => {
					const slugIsSet = set !== undefined
					if (!slugIsSet && context?.document?.location === 'gallery') {
						return 'Gallery exhibitions must have a slug in order to be displayed on the website.'
					}

					return true
				}),
		}),
		defineField({
			title: 'External link',
			name: 'externalLink',
			type: 'link',
			description: '(Optional) external page link for the exhibition instead (opens in new tab).',
			validation: (Rule) =>
				Rule.custom((set, context) => {
					const urlIsSet = set !== undefined
					if (!urlIsSet && context?.document?.externalDisplay === true) {
						return 'To display an exhibition at an external link you must provide a URL to that webpage.'
					}
					return true
				}),
			hidden: ({ document }) => document?.externalDisplay === false,
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
			name: 'mainImage',
			title: 'Main image',
			type: 'mainImage',
			description: 'Preview image',
		}),
		defineField({
			name: 'imageGallery',
			title: 'Image gallery',
			type: 'imageGallery',
		}),
		defineField({
			name: 'opening',
			title: 'Opening',
			type: 'datetime',
			options: {
				dateFormat: 'MMMM Do YYYY',
				timeFormat: 'h:mm a',
			},
		}),
		defineField({
			name: 'startDate',
			title: 'Start date',
			type: 'datetime',
			options: {
				dateFormat: 'MMMM Do YYYY',
				timeFormat: 'h:mm a',
			},
		}),
		defineField({
			name: 'endDate',
			title: 'End date',
			type: 'datetime',
			options: {
				dateFormat: 'MMMM Do YYYY',
				timeFormat: 'h:mm a',
			},
			validation: (Rule) => Rule.required().min(Rule.valueOfField('startDate')),
		}),
		defineField({
			name: 'year',
			title: 'Year',
			type: 'string',
			description: 'Must be included in format "YYYY" (important for ordering).',
			validation: (Rule) => Rule.required().max(4),
			initialValue: '2022',
		}),
		defineField({
			name: 'venue',
			title: 'Venue',
			type: 'reference',
			description: 'Location of the exhibition.',
			to: [{ type: 'venue' }],
		} as const),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
			description: 'Press release',
		}),
		defineField({
			name: 'photographerCredit',
			title: 'Photographer credit',
			type: 'string',
			description: 'Exhibition photographer displayed below press release.',
		}),
	],
	orderings: [
		{
			title: 'Year Ascending',
			name: 'yearAscending',
			by: [{ field: 'year', direction: 'asc' }],
		},
		{
			title: 'Year Descending',
			name: 'yearDescending',
			by: [{ field: 'year', direction: 'desc' }],
		},
		{
			title: 'Date Created Ascending',
			name: 'createdAscending',
			by: [{ field: '_updatedAt', direction: 'asc' }],
		},
		{
			title: 'Date Created Descending',
			name: 'createdDescending',
			by: [{ field: '_updatedAt', direction: 'desc' }],
		},
	],
	preview: {
		select: {
			title: 'title',
			artist0: 'artists.0.name',
			artist1: 'artists.1.name',
			artist2: 'artists.2.name',
			artist3: 'artists.3.name',
			year: 'year',
			media: 'mainImage',
		},
		prepare({ title, artist0, artist1, artist2, artist3, year, media }) {
			const artist = [artist0, artist1, artist2].filter(Boolean)
			const subtitle = artist.length > 0 ? `${year} | ${artist.join(', ')}` : ''
			const hasMoreArtists = Boolean(artist3)
			return {
				title,
				subtitle: hasMoreArtists ? `${subtitle}…` : subtitle,
				media: media || StackCompactIcon,
			}
		},
	},
})

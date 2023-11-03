import { CommentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'news',
	title: 'News',
	type: 'document',
	icon: CommentIcon,
	fields: [
		defineField({
			name: 'newsType',
			title: 'Type of news',
			type: 'string',
			options: {
				list: [
					{ title: 'Opening', value: 'opening' },
					{ title: 'Exhibition', value: 'exhibition' },
					{ title: 'Event', value: 'event' },
					{ title: 'Announcement', value: 'announcement' },
				],
			},
			description: 'Category: e.g. "Opening", "Event", "Exhibition", "Announcement"',
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			description: 'e.g. Item headline, gallery announcement.',
		}),
		defineField({
			name: 'text',
			title: 'Text',
			type: 'simpleBlockContent',
			description: 'e.g. Text about the item to display.',
		}),
		defineField({
			name: 'mainImage',
			title: 'Preview image',
			type: 'mainImage',
			description: 'Image to display with the event.',
		}),
		defineField({
			name: 'artists',
			title: 'Artist(s)',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'artist' } }],
		}),
		defineField({
			title: 'Link type',
			name: 'linkType',
			type: 'string',
			description:
				'If you wish to supply a link with this news item please select whether it is an internal link (a page on the Bortolozzi website) or an external link (a page on another website). If you do not want the news item to have any link at all, you should leave this field blank.',
			options: {
				list: [
					{ title: 'Internal Page', value: 'internal' },
					{ title: 'External URL', value: 'external' },
				],
			},
		}),
		defineField({
			title: 'Internal page',
			name: 'page',
			type: 'reference',
			to: [{ type: 'exhibition' }],
			description: 'Link to a page within the Bortolozzi website.',
			validation: (Rule) =>
				Rule.custom((set, context) => {
					const urlIsSet = set !== undefined
					if (!urlIsSet && context?.document?.linkType === 'internal') {
						return 'To link to a page you need to select that page from the select menu.'
					}
					return true
				}),
			hidden: ({ document }) => document?.linkType !== 'internal',
		}),
		defineField({
			title: 'External link',
			name: 'externalLink',
			type: 'link',
			description: 'Link opens on an external website in a new tab.',
			validation: (Rule) =>
				Rule.custom((set, context) => {
					const urlIsSet = set !== undefined
					if (!urlIsSet && context?.document?.linkType === 'external') {
						return 'For an external link you must provide a URL to that webpage.'
					}
					return true
				}),
			hidden: ({ document }) => document?.linkType !== 'external',
		}),
		defineField({
			name: 'startDate',
			title: 'Start date',
			type: 'date',
			options: {
				dateFormat: 'MMMM Do YYYY',
			},
			hidden: ({ parent }) => parent?.newsType !== 'exhibition',
		}),
		defineField({
			name: 'endDate',
			title: 'End date',
			type: 'date',
			options: {
				dateFormat: 'MMMM Do YYYY',
			},
			hidden: ({ parent }) => parent?.newsType !== 'exhibition',
		}),
		defineField({
			name: 'eventDate',
			title: 'Event date',
			type: 'datetime',
			options: {
				dateFormat: 'MMMM Do YYYY',
				timeFormat: 'h:mm a',
			},
			hidden: ({ parent }) => parent?.newsType === 'exhibition',
		}),
		defineField({
			name: 'year',
			title: 'Year',
			type: 'string',
			description: 'Must be in format "YYYY"',
			validation: (Rule) => Rule.max(4),
		}),
		defineField({
			name: 'venue',
			title: 'Venue',
			type: 'reference',
			to: [{ type: 'venue' }],
		}),
	],
	orderings: [
		{
			title: 'Newest first',
			name: 'newest',
			by: [{ field: 'endDate' ? 'endDate' : 'eventDate', direction: 'desc' }],
		},
		{
			title: 'Oldest first',
			name: 'oldest',
			by: [{ field: 'endDate' ? 'endDate' : 'eventDate', direction: 'asc' }],
		},
	],
	preview: {
		select: {
			blocks: 'text',
			artist0: 'artists.0.name',
			artist1: 'artists.1.name',
			artist2: 'artists.2.name',
			artist3: 'artists.3.name',
			venue: 'venue.name',
		},
		prepare({ artist0, artist1, artist2, artist3, venue, blocks }) {
			const block = (blocks || []).find((block) => block._type === 'block')
			const artist = [artist0, artist1, artist2].filter(Boolean)
			const subtitle = artist.length > 0 ? `${artist.join(', ')} — ${venue}` : ''
			const hasMoreArtists = Boolean(artist3)
			return {
				title: block
					? block.children
							.filter((child) => child._type === 'span')
							.map((span) => span.text)
							.join('')
					: 'No title provided',
				subtitle: hasMoreArtists ? `${subtitle}…` : subtitle,
			}
		},
	},
})

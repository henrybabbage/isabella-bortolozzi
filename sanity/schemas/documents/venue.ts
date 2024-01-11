import { PinIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'venue',
	title: 'Venues',
	type: 'document',
	icon: PinIcon,
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
		}),
		defineField({
			name: 'city',
			title: 'City',
			type: 'string',
		}),
		defineField({
			name: 'country',
			title: 'Country',
			type: 'string',
		}),
		defineField({
			title: 'External link',
			name: 'link',
			type: 'url',
		}),
		defineField({
			name: 'address',
			title: 'Street address',
			type: 'string',
		}),
		defineField({
			name: 'postcode',
			title: 'Postcode',
			type: 'string',
		}),
	],
})

import { defineField, defineType } from "sanity"

export default defineType({
	name: 'mainImage',
	type: 'image',
	title: 'Image',
	options: {
		storeOriginalFilename: true,
		hotspot: true,
	},
	fields: [
		defineField({
			name: 'alt',
			type: 'string',
			title: 'Alternative text',
			initialValue: 'Galerie Isabella Bortolozzi',
			validation: (Rule) => Rule.required().warning('Please fill out the alternative text'),
			description: 'Important for SEO and accessibility and improves website rating on Google',
		}),
	],
	preview: {
		select: {
			imageUrl: 'asset.url',
		},
	},
})

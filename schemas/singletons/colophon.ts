import { UlistIcon } from '@sanity/icons'
import { defineField, defineType } from "sanity"

export default defineType({
	name: 'colophon',
	title: 'Colophon',
	type: 'document',
    icon: UlistIcon,
	fields: [
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
            hidden: true,
		}),
		defineField({
			name: 'acknowledgements',
			title: 'Acknowledgements',
			type: 'array',
			of: [{ type: 'block' }],
		} as const),
	],
})

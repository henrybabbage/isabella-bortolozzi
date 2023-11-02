import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from "sanity"

export default defineType({
	name: 'visitorEmail',
	title: 'Visitor email',
	type: 'object',
    icon: EnvelopeIcon,
	fields: [
		defineField({
			name: 'email',
			title: 'Email',
			type:'string',
		})
	]
})
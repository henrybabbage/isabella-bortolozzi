import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
	name: 'home',
	title: 'Home',
	type: 'document',
	icon: HomeIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Internal',
			readOnly: true,
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 120,
			},
			readOnly: true,
		}),
		defineField({
			name: 'publicisedExhibitions',
			title: 'Publicised exhibitions',
			type: 'array',
            of: [
                defineArrayMember({
                  type: 'reference',
                  to: [{ type: 'exhibition' }],
                }),
            ],
			validation: (Rule) => Rule.unique().max(2),
			description: 'Order in preference of appearance',
		} as const),
		defineField({
			name: 'logoControl',
			title: 'Logo control',
			type: 'object',
			description: 'Control the colour of the logo on homepage',
			fields: [
				defineField({
					name: 'overrideColor',
					title: 'Override color',
					type: 'boolean',
					description: 'Override the automatically generated colour?',
				}),
				defineField({
					name: 'logoColor',
					title: 'Logo color',
					type: 'simplerColor',
					options: {
						colorList: [
							{ label: 'Black', value: '#222' },
							{ label: 'Custom...', value: 'custom' },
						],
					},
					hidden: ({ parent, value }) => !value && !parent?.overrideColor,
					description: 'Choose a colour for the logo to override the automatically generated colour',
				}),
			],
		} as const),
		defineField({
			name: 'banner',
			title: 'Banner',
			type: 'object',
			description: 'Select an exhibition to display in the banner',
			fields: [
				defineField({
					name: 'heading',
					title: 'Heading',
					type: 'string',
					options: {
						list: [
							{ title: 'Current', value: 'Current' },
							{ title: 'Upcoming', value: 'Upcoming' },
						],
						layout: 'dropdown',
					},
					description: 'Indicate whether this is Current or Upcoming',
				}),
				defineField({
					name: 'exhibition',
					title: 'Exhibition',
					type: 'reference',
					to: [{ type: 'exhibition' }],
				}),
			],
		} as const),
		defineField({
			name: 'footer',
			title: 'Footer',
			type: 'object',
			fields: [
				defineField({
					name: 'address',
					title: 'Address',
					type: 'text',
				}),
				defineField({
					name: 'additionalAddress',
					title: 'Additional address',
					type: 'text',
				}),
				defineField({
					name: 'openingHours',
					title: 'Opening hours',
					type: 'string',
				}),
				defineField({
					name: 'visitation',
					title: 'Visitation',
					type: 'string',
				}),
				defineField({
					name: 'googleMaps',
					title: 'Google Maps',
					type: 'url',
					description: 'Directions to the gallery',
				}),
				defineField({
					name: 'additionalGoogleMaps',
					title: 'Additional Google Maps',
					type: 'url',
					description: 'Directions to Eden Eden',
				}),
				defineField({
					name: 'phoneNumber',
					title: 'Phone number',
					type: 'string',
				}),
				defineField({
					name: 'email',
					title: 'Email',
					type: 'string',
				}),
				defineField({
					name: 'instagram',
					title: 'Instagram',
					type: 'string',
				}),
				defineField({
					name: 'newsletterHeading',
					title: 'Newsletter heading',
					type: 'string',
				}),
			],
		} as const),
	],
})

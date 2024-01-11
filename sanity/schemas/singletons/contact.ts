import { EarthGlobeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'contact',
	title: 'Contact',
	type: 'document',
	icon: EarthGlobeIcon,
	fields: [
		defineField({
			name: 'galleryName',
			title: 'Gallery name',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'galleryName',
				maxLength: 120,
			},
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((email: string) => {
					if (typeof email === 'undefined') {
						return true // Allow undefined values
					}
					return email
						.toLowerCase()
						.match(
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						)
						? true
						: 'This is not an email'
				}),
		}),
		defineField({
			name: 'address1',
			title: 'Address 1',
			type: 'blockContent',
		}),
		defineField({
			name: 'openingHours1',
			title: 'Opening hours 1',
			type: 'blockContent',
		}),
		defineField({
			name: 'address2',
			title: 'Address 2',
			type: 'blockContent',
		}),
		defineField({
			name: 'openingHours2',
			title: 'Opening hours 2',
			type: 'blockContent',
		}),
		defineField({
			name: 'phoneNumber',
			title: 'Phone number',
			type: 'string',
		}),
		defineField({
			name: 'faxNumber',
			title: 'Fax number',
			type: 'string',
		}),
		defineField({
			name: 'instagram',
			title: 'Instagram',
			type: 'string',
		}),
		defineField({
			name: 'facebook',
			title: 'Facebook',
			type: 'string',
		}),
		defineField({
			name: 'newsletter',
			title: 'Newsletter',
			type: 'newsletter',
		}),
		defineField({
			name: 'viewingRoomForm',
			title: 'Viewing room form',
			type: 'object',
			fields: [
				defineField({
					name: 'submitFormPrompt',
					title: 'Submit form prompt',
					type: 'string',
				}),
				defineField({
					name: 'viewingRoomErrorMessage',
					title: 'Viewing room error message',
					type: 'string',
				}),
				defineField({
					name: 'viewingRoomSuccessMessage',
					title: 'Viewing room success message',
					type: 'string',
				}),
			],
		}, {strict: false }),
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
		}),
	],
	preview: {
		select: {
			title: 'galleryName',
		},
	},
})

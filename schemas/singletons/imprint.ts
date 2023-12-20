import { CaseIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imprint',
  title: 'Imprint',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'blockContent',
    }),
    defineField({
      name: 'imprint',
      title: 'Imprint',
      type: 'blockContent',
    }),
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy policy',
      type: 'blockContent',
    }),
  ],
})

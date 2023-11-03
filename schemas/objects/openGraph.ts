import { RobotIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
    title: 'Open Graph',
    name: 'openGraph',
    type: 'object',
    icon: RobotIcon,
    fields: [
      defineField({
        title: 'Title',
        name: 'title',
        type: 'string',
        description: 'Heads up! This will override the page title.',
        validation: Rule => Rule.max(60).warning('Should be under 60 characters')
      }),
      defineField({
        title: 'Description',
        name: 'description',
        type: 'text',
        validation: Rule => Rule.max(155).warning('Should be under 155 characters')
      }),
      defineField({
        title: 'Image',
        description: 'Facebook recommends 1200x630 (will be auto resized)',
        name: 'image',
        type: 'mainImage'
      }),
    ],
    preview: {
      select: {
        title: 'title',
      },
      prepare({ title }) {
        return {
          title,
        }
      }
    }
  })
  
import { ThListIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'exhibitionRecord',
  title: 'Exhibition record',
  type: 'object',
  icon: ThListIcon,
  fields: [
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            description: "Must be in format 'YYYY'",
            validation: (Rule) => Rule.required().max(4),
        }),
        defineField({
            name: 'exhibitionRecord',
            title: 'Exhibition record',
            type: 'blockContent',
            description: 'Format: title (italicised), venue, city, country',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            blocks: 'exhibitionRecord',
            year: 'year',
        },
        prepare(value) {
        const block = (value.blocks || []).find(
            (block) => block._type === 'block',
        )
        const { year } = value
        return {
                title: block
                ? block.children
                    .filter((child) => child._type === 'span')
                    .map((span) => span.text)
                    .join('')
                : 'No data',
                subtitle: year ? year : 'No year',
                media: ThListIcon,
            }
        },
    },
})

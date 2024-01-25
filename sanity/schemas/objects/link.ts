import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    icon: LinkIcon,
    fields: [
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.uri({
                scheme: ['http', 'https'],
                allowRelative: false,
            }),
        }),
    ],
})

import { defineField, defineType } from "sanity";

export default defineType({
    type: 'object',
    name: 'newsletter',
    title: 'Newsletter',
    fields: [
      defineField({
        name: 'internal',
        type: 'string',
        title: 'Internal',
        description: 'Internal use',
        readOnly: true,
        hidden: true,
      }),
      defineField({
        name: 'heading',
        type: 'string',
        title: 'Heading',
      }),
      defineField({
        name: 'newsletterErrorMessage',
        title: 'Newsletter error message',
        type: 'string',
      }),
      defineField({
        name: 'newsletterSuccessMessage',
        title: 'Newsletter success message',
        type: 'string',
      }),
      defineField({
        name: 'actionUrl',
        type: 'url',
        title: 'URL to newsletter signup',
        description:
          'URL for the signup form. Remember to add your domain in your newsletter email host settings to avoid CORS errors.',
      }),
    ],
    preview: {
      select: {
        title: 'internal',
      },
      prepare({ title }) {
        return {
          title,
          subtitle: 'Newsletter signup section',
        };
      },
    },
})
  
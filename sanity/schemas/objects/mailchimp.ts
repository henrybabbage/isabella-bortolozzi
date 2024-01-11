import { EnvelopeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'object',
  name: 'mailchimp',
  title: 'Mailchimp newsletter signup',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      readOnly: true,
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subheading',
    }),
    defineField({
      name: 'actionUrl',
      type: 'url',
      title: 'URL to Mailchimp signup',
      description:
        'URL for the Mailchimp signup form. Remember to add your domain in your mailchimp settings to avoid CORS errors.',
    }),
    defineField({
        name: 'mailchimpAudienceId',
        title: 'Mailchimp Audience ID',
        type: 'string',
    }),
    defineField({
        name: 'mailchimpApiServer',
        title: 'Mailchimp API server',
        type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Mailchimp newsletter signup section',
      };
    },
  },
})

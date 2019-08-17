export const Settings = {
  title: 'Homepage & Site Settings',
  type: 'document',
  name: 'homepage',
  fields: [
    {
      name: 'albumTitle',
      label: 'Album Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seoTitle',
      label: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Used as both the Browser Tab title and in search results',
    },
    {
      name: 'seoDescription',
      label: 'SEO Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seoImage',
      label: 'SEO Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage & Site Settings',
    }),
  },
}

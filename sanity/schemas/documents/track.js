import { MdMusicNote } from 'react-icons/md'

export const Track = {
  title: 'Track',
  type: 'document',
  name: 'track',
  icon: MdMusicNote,
  fields: [
    {
      name: 'title',
      label: 'Track Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      label: 'Page URL',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
    },
    {
      name: 'trackNumber',
      label: 'Track Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'releaseDate',
      label: 'Release Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'listenLink',
      label: 'Listen Link',
      type: 'url',
    },
  ],
  orderings: [
    {
      title: 'Track Number',
      name: 'trackAsc',
      by: [{ field: 'trackNumber', direction: 'asc' }],
    },
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate.utc', direction: 'desc' }],
    },
    {
      title: 'Release Date, Old',
      name: 'releaseDateAsc',
      by: [{ field: 'releaseDate.utc', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      trackNumber: 'trackNumber',
    },
    prepare: ({ title, trackNumber }) => ({
      title: `${trackNumber} - ${title}`,
    }),
  },
}

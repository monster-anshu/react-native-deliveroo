import {defineArrayMember, defineField} from 'sanity'

export default defineField({
  name: 'featured',
  type: 'document',
  title: 'Featured',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Feartued Category Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'restaurants',
      type: 'array',
      title: 'Restaurants',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [
            {
              type: 'restaurant',
            },
          ],
        }),
      ],
    }),
  ],
})

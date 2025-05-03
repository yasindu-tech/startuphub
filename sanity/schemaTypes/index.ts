import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { startup } from './startup'
import { author } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
}

schema.types.push(postType)
schema.types.push(startup)
schema.types.push(author)
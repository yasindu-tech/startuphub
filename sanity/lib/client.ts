import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_API_TOKEN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for write operations
  token, // Add token for write operations
})

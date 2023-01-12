import { error } from '@sveltejs/kit';
import { queryJSON } from '$lib/ld/query'

const getResource = async id => {
  let result = await queryJSON(`describe <${id}>`)
  if (result.length === 0) {
    throw error(404, 'Resource not found.')
  }
  return result
}

export default getResource
import { error } from '@sveltejs/kit';
import db from '$lib/query.js'

const getResource = async id => {
  let result = await db.query(`describe <${id}>`)
  if (result.length === 0) {
    throw error(404, 'Resource not found.')
  }
  console.log(result[0])
  return result[0]
}

export default getResource
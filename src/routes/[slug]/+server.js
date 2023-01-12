import { json } from '@sveltejs/kit';
import getResource from './getResource.js'

export async function GET({url}) {
  let resource = await getResource(url.href)
  return json(resource)
}

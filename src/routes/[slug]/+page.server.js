import getResource from './getResource.js'
import { update } from '$lib/ld/query.js'
import rdfkv from '$lib/ld/rdf-kv.js'

export async function load({url}) {
  let resource = getResource(url.href)
  return resource
}

export const actions = {
  default: async ({url, request}) => {
    let formData = await request.formData()
    let id = url.href
    let updateData = rdfkv(id, formData)
    console.log(updateData)
    let success = await update(updateData)
    return success
  }
};
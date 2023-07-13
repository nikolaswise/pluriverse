import getResource from './getResource.js'
import db from '$lib/query.js'
import rdfkv from 'rdf-kv.js'

export async function load({url}) {
  let id = decodeURIComponent(url.href)
  let resource = getResource(id)
  return resource
}

export const actions = {
  default: async ({url, request}) => {
    let formData = await request.formData()
    let encoded = url.href
    let id = decodeURIComponent(encoded)
    let updateData = rdfkv(id, formData)
    let success = await db.update(updateData)
    return true
  }
};
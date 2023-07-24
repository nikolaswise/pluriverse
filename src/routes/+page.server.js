import db from '$lib/query.js'
import rdfkv from 'rdf-kv.js'

export async function load() {
  let json = await db.query(`
    construct {
      ?id ex:title ?title
    } where {
      ?id ex:title ?title
    }
  `)
  return {
    resource: json
  }
}

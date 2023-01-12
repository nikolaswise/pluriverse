import { json } from '@sveltejs/kit';
import { queryJSON } from '$lib/ld/query'

export async function GET({ params }) {
  let response = await queryJSON(`
DESCRIBE ?sub
WHERE {
  ?sub ${params.predicate} ${params.object} .
}`)
  return json(response)
}
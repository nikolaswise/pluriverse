import { json } from '@sveltejs/kit';

export async function GET({params}) {
  return json({
    value: params.slug,
    negotiated: true
  })
}

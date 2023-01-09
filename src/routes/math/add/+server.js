import { add } from '$lib/math'
import { redirect } from '@sveltejs/kit'

export async function POST({ url, request }) {
  console.log(`/routes/[slug]/+server.js runtime`)
  console.log(`POST`, url.pathname)
  const formData = await request.formData()
  console.log(formData)
  let result = add(formData.get('a'), formData.get('b'))
  throw redirect(307, `/${result}`);
}
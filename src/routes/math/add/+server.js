import { add } from '$lib/math'
import { redirect } from '@sveltejs/kit'
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const formData = await request.formData()
  let result = add(formData.get('a'), formData.get('b'))
  if (formData.get('redirect')) {
    throw redirect(307, `/${result}`);
  }
  return json({
    value: result
  })
}
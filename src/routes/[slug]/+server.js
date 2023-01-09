import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  console.log(`/routes/[slug]/+server.js runtime`)
  console.log(`GET`, url.pathname)
  return json({
    content: 'json',
    negotiated: true
  })
}

export async function POST({ url, request }) {
  console.log(`/routes/[slug]/+server.js runtime`)
  console.log(`POST`, url.pathname)
  const formData = await request.formData()
  console.log(formData)
  return new Response(String('POST'));
}
export async function load({params}) {
  console.log(`/routes/[slug]/+page.js runtime`)
  return {
    slug: params.slug,
    ssr: false
  }
}
export async function load({params}) {
  return {
    slug: params.slug,
    ssr: false
  }
}
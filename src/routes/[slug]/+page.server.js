export async function load({params}) {
  console.log(`/routes/[slug]/+page.server.js runtime`)
  return {
    slug: params.slug,
    ssr: true
  }
}

export const actions = {
  default: async (event) => {
    console.log('Accept POST')
    console.log(`/routes/[slug]/+page.server.js action`)
  }
};
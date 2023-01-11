export async function load({params}) {
  return {
    slug: params.slug,
    ssr: true
  }
}

export const actions = {
  default: async () => {
    console.log('Accept POST')
  }
};
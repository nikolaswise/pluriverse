export async function load({params}) {
  return {
    slug: params.slug,
    arbitrary: 'key'
  }
}
//
// export const actions = {
//   default: async () => {
//     console.log('Accept POST')
//   }
// };
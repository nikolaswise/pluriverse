export async function handle({ event, resolve }) {
  console.log('I run on every server request')
  const response = await resolve(event);
  return response;
}

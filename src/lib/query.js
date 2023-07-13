import {
  sparql_endpoint,
  sparql_user,
  sparql_password } from '$env/static/private'
import context from '$lib/context'
import prefixes from '$lib/prefixes'
import sparqler from 'sparqler-client.js'

const client = sparqler({
  endpoint: sparql_endpoint,
  prefixes: prefixes,
  context: context,
  user: sparql_user,
  password: sparql_password
})

export default client
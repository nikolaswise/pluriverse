import jsonld from 'jsonld'

const constructHeaders = ({user, password}) => {
  const headers = new Headers()
  headers.set('Authorization', 'Basic ' + btoa(user + ":" + password))
  return headers
}

const getTriples = ({headers, endpoint, prefixes}) => async (query) => await fetch(`${endpoint}/query`, {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams({
      'query': `${prefixes}
      ${query}`
    })
  })

const insertTriples = ({headers, endpoint, prefixes}) => async (triples) => await fetch(`${endpoint}/update`, {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams({
      'update': `insert data { ${triples} }`
    })
  }).catch((error) => {
    console.error('Error:', error);
  }
)

const removeTriples = ({headers, endpoint, prefixes}) => async (triples) => await fetch(`${endpoint}/update`, {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams({
      'update': `delete data { ${triples} }`
    })
  }).catch((error) => {
    console.error('Error:', error);
  }
)

const contextualize = async ({triples, context}) => {
  const doc = await jsonld.fromRDF(triples, {format: 'application/n-quads'});
  const compact = await jsonld.compact(doc, context)
  delete compact['@context']
  if (Object.keys(compact).length < 1) {
    return []
  }
  if (compact['@graph']) {
    return compact['@graph']
  }
  return [compact]
}

const returnsTriples = (query) => query.includes('construct') || query.includes('describe')

const query = ({headers, endpoint, prefixes, context}) => async query => {
  console.log(`------`)
  console.log(endpoint)
  console.log(`${prefixes}
      ${query}`)

  let triples = await getTriples({headers, endpoint, prefixes})(query)
    .then(result => {
      console.log(result)
      if (returnsTriples(query)) {
        return result.text()
      } else {
        return result.json()
      }
    })
    .catch(err => {
      console.error(err)
    })

  console.log(triples)
  switch(true) {
    case query.includes('ask'):
      return triples.boolean

    case query.includes('select'):
      return triples.results.bindings

    case returnsTriples(query):
      return await contextualize({triples, context})

    default:
      throw new Error('Query not recognized.')
  }
}

const insert = ({headers, endpoint, prefixes, context}) => async json => {
  let doc = {
    "@context": context,
    ...json
  }
  const triples = await jsonld.toRDF(doc, {format: 'application/n-quads'})
  return await insertTriples({headers, endpoint, prefixes })(triples)
}

const remove = ({headers, endpoint, prefixes, context}) => async json => {
  let doc = {
    "@context": context,
    ...json
  }
  const triples = await jsonld.toRDF(doc, {format: 'application/n-quads'})
  return await removeTriples({headers, endpoint, prefixes })(triples)
}

const update = ({headers, endpoint, prefixes}) => async (update) => await fetch(`${endpoint}/update`, {
  method: 'POST',
  headers: headers,
  body: new URLSearchParams({
    'update': `${prefixes}
    DELETE {
      ${update.delete}
    }
    INSERT {
      ${update.insert}
    }
    WHERE {
      ?s ?p ?o
    }`
  })
}).catch((error) => {
  console.error('Error:', error);
});

const sparqler = ({
  endpoint,
  prefixes,
  context,
  user,
  password
}) => {
  const headers = constructHeaders({user, password})
  console.log(`------`)
  console.log(endpoint)
  console.log(`------`)
  return {
    query: query({headers, endpoint, prefixes, context}),
    insert: insert({headers, endpoint, prefixes, context}),
    remove: remove({headers, endpoint, prefixes, context}),
    update: update({headers, endpoint, prefixes}),
  }
}

export default sparqler
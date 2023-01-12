import { sparql_endpoint } from '$env/static/private'
import jsonld from 'jsonld'
import context from '$lib/ld/context'
import prefixes from '$lib/ld/prefixes'

const getTriples = (accept) => async (query) => await fetch(`${sparql_endpoint}/query`, {
  method: 'POST',
  headers:{
    'Accept': accept
  },
  body: new URLSearchParams({
    'query': `${prefixes}
    ${query}`
  })
})

export const queryJSON = async query => {
  let triples = await getTriples('application/n-triples')(query)
    .then(result => result.text())
  const doc = await jsonld.fromRDF(triples, {format: 'application/n-quads'});
  const compact = await jsonld.compact(doc, context)
  console.log(`${prefixes}
    ${query}`)
  console.log(compact)
  delete compact['@context']
  if (compact['@graph']) {
    return compact['@graph']
  }
  if (Object.keys(compact).length === 0) {
    return []
  }
  return compact
}

export const queryArr = async query => {
  let triples = await getTriples('application/sparql-results+json')(query)
      .then(result => result.json())
  return triples
}

export const update = async update => {
  console.log( `${prefixes}
      DELETE {
        ${update.delete}
      }
      INSERT {
        ${update.insert}
      }
      WHERE {
        ?s ?p ?o
      }`)
  await fetch(`${sparql_endpoint}/update`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
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
  return true
}
# SvelteKit Triplestore

Features of this application include:

- [Linked-data](https://nikolas.ws/introduction-to-rdf) first structure.
- [JSON-LD](https://nikolas.ws/what-is-jsonld-for) graph capabillities.
- Automatically generated REST api & queries.
- Schema-less datastore; arbitrary key:val pairs on objects.
- N-to-N directed resource relationships.
- [Svelte](https://svelte.dev/) components, delivered in a [SvelteKit](https://kit.svelte.dev/) application.
- Helpers methods for performing queries and updates via [SPARQL](https://www.w3.org/TR/rdf-sparql-query/) graph query language.

## Getting Started

```
$ npm install
$ docker-compose build
$ docker-compose up
```

## Load with Data

1. Visit `http://localhost:7878/`
2. In the little endpoint input, set to `http://localhost:7878/update`
3. Run the following:

```
PREFIX example: <https://vocab.example.com/#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
INSERT DATA {
  <http://localhost:5173> rdf:type <example:Project> .
  <http://localhost:5173> example:title "Plural App" .
}
```

> What's up with those prefix thingies? `example:` and `rdf:`? Those are namespaces. They allow us to disambiguate keys from each other. For this project, you can use `example:` for _any key you want_. You can also edit the `src/lib/ld/prefixes.js` file to add other namespaces, if you want to create a new namespace or add extant linked-data terms.

## How it Works

Create resources via form posts. Request the data for those resources via REST API. Write UI's to present that data via Svelte components.

## Creating Resources with Forms

The `CreateResource.svelte` component shows the basics of how to use form posts to create new resources.

The forms `action` attribute will be the URL of the new resource. Any inputs with `name` attributes will be added as keys to the resource, with the associated input value.

The forms implement the [RDF-KV specification](https://doriantaylor.com/rdf-kv) for identifying relationships, scalar values, and types for those scalar values.

The TL:DR; on that spec is:

```
name="rdf:type :"  // value is a resource url. Creates a relationship between resources.

name="! rdf:type :"  // value is a resource url. Creates an inverted relationship between resources.

name="example:date ^xsd:date" // sets the scalar value type to Date
```

## Using REST

HTTP GET from a URL will return the object of that URLs data.
```
GET http://localhost:5173/resource
```

### Queries

A query can be constructed by `api/{key}/{value}`, and will return all the objects that contain that key/val pair.

```
GET http://localhost:5173/api/rdf:type/<example:Project>
GET http://localhost:5173/api/example:title/"Plural App"
```

Note the `"{value}"` vs `<{value}>`. Quotes are for querying scalar values, brackets are for relationships to other objects.


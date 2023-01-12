const objectIsResource = (str) => str.endsWith(':')
const objectIsLiteral = (str) => str.endsWith(`'`)
const objectHasLang = (str) => str.includes('@')
const objectHasType = (str) => str.includes('^')
const objectIsInverted = (str) => str.includes('!')
const objectIsBNode = (str) => str.includes('_')
const objectIsDeleted = (str) => str.includes('-')
const objectReplaces = (str) => str.includes('=')

const parseTriple = (subject, arr, object) => {
  console.log(arr)
  let predicate = arr[1]
  let graph = ''
  switch (true) {
    default:
      // default case is [subject, predicate, graph]
      subject = `${arr[0]}`
      object = `"${object}"`
      graph = `<${arr[2]}> `
      break;
  }
  return `<${subject}> ${predicate} ${object} ${graph}. `
}

const parseTuple = (subject, arr, object) => {
  let predicate = arr[0]
  switch (true) {
    case objectIsInverted(arr[0]):
      [subject, object] = [object, subject];
      predicate = arr[1]
      object = `<${object}>`
      break;
    case objectIsDeleted(arr[0]):
      return ''
      break;
    case objectReplaces(arr[0]):
      predicate = arr[1]
      object = `"${object}"`
      break;
    case objectIsResource(arr[1]):
      object = `<${object}>`
      break;
    case objectIsLiteral(arr[1]):
      object = `"${object}"`
      break;
    case objectHasLang(arr[1]):
      object = `"${object}"${arr[1]}`
      break;
    case objectHasType(arr[1]):
      object = `"${object}"^${arr[1]}`
      break;
    case objectIsBNode(arr[1]):
      object = `_:${object}`
      break;
    default:
      // default case is [subject, predicate]
      subject = `${arr[0]}`
      predicate = arr[1]
      object = `"${object}"`
      break;
  }
  return `<${subject}> ${predicate} ${object} . `
}

const reducer = (subject) => (acc, cur, i) => {
  let arr = cur[0].split(' ')
  let object = cur[1]
  let predicate
  switch (arr.length) {
    case 3:
      return `${acc}${parseTriple(subject, arr, object)}`
    case 2:
      return `${acc}${parseTuple(subject, arr, object)}`
    default:
      predicate = arr[0]
      return `${acc}<${subject}> ${predicate} "${object}" . `
  }
}

const deleter = (subject) => (acc, cur, i) => {
  let arr = cur[0].split(' ')
  if (arr.length < 2) { return '' }
  if (!objectIsDeleted(arr[0]) && !objectReplaces(arr[0])) { return '' }
  let object = cur[1]
  let predicate
  switch (arr.length) {
    default:
      predicate = arr[1]
      if (objectIsDeleted(arr[0])) {
        return `${acc}<${subject}> ${predicate} "${object}" . `
      } else {
        return `${acc}<${subject}> ${predicate} ?o . `
      }
  }
}

const reduceEntryInserts = (subject, formData) => [...formData.entries()].reduce(reducer(subject), '')
const reduceEntryDeletes = (subject, formData) => [...formData.entries()].reduce(deleter(subject), '')

const rdfkv = (subject, formData) => {
  return {
    delete: reduceEntryDeletes(subject, formData),
    insert: reduceEntryInserts(subject, formData)
  }
}

export default rdfkv
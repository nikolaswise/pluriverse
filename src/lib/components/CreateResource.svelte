<script type="text/javascript">
  import InputMultiple from '$lib/components/InputMultiple.svelte'
  import SelectMultiple from '$lib/components/SelectMultiple.svelte'

  export let relatedTo = []
  let relatedOptions = relatedTo.map(node => {
    return {
      name: node.title,
      value: node.id
    }
  })

  let id = crypto.randomUUID()
  let encoded
  $: {
    encoded = encodeURIComponent(id)
  }
</script>

<form
  action='/{encoded}'
  method='post'>
  <label>
    Resource Title
    <input
      type="text"
      name="ex:title"
    />
  </label>

  <InputMultiple
    name="ex:altLabel"
    label="Also Known As"
    submit="Add Label"
  />


  <SelectMultiple
    name="ex:relatedTo"
    options={relatedOptions}
  />

  <label>
    Resource Slug
    <input 
      type="text" 
      name=""
      bind:value={id}
    />
  </label>
  <input
    type="hidden"
    name="rdf:type :"
    value="ex:Resource">
  <button>
    Submit
  </button>
</form>

<style type="text/css">
  label,
  input {
    display: block;
  }
  label {
    margin-bottom: 1rem;
  }
</style>
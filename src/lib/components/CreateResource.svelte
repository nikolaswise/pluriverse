<script type="text/javascript">
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
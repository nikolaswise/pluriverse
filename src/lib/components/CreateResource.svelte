<script type="text/javascript">
  let id = crypto.randomUUID()
</script>

<form
  action='/{id}'
  method='post'>
  <label>
    Resource Title
    <input
      type="text"
      name="vox:title"
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
    value="vox:Resource">
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
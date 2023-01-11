<script type="text/javascript">
  export let a = 0
  export let b = 0
</script>

<form
  action="/math/add"
  method="POST">
  <input type="number" name="a" bind:value={a}>
  +
  <input type="number" name="b" bind:value={b}>
  <input type="hidden" name="redirect" value="true">
  <button>=</button>

</form>
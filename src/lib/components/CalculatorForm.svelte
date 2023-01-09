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
  <button>=</button>

</form>
<script type="text/javascript">
  import { add } from '$lib/math'

  export let a = 0
  export let b = 0

  let c = add(a, b)

  $: {
    c = add(a, b)
  }
</script>

<form>
  <input type="number" name="a" bind:value={a}>
  +
  <input type="number" name="b" bind:value={b}>
  =
  <output>
    {c}
  </output>
</form>

<style type="text/css">
  input {
    border: 6px solid pink;
  }
</style>
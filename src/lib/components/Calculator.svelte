<script type="text/javascript">
  import { add } from '$lib/math'
  import { count } from '$lib/stores.js'

  export let a = 0
  export let b = 0
  let c = add(a, b)

  $: {
     c = add(a, b)
     count.set(c);
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
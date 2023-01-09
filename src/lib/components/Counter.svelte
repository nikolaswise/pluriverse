<script>
  import { count } from '$lib/stores.js';
  import Incrementer from './Incrementer.svelte';
  import Decrementer from './Decrementer.svelte';
  import Resetter from './Resetter.svelte';
</script>

<p>The count is {$count}</p>

<Incrementer/>
<Decrementer/>
<Resetter/>
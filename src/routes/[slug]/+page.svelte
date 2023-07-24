<script type="text/javascript">
  import {arrayify} from '$lib/arrayify'
  export let data
</script>

<p>
  <mark>{data.id}</mark>
</p>
<h1>{data.title}</h1>
{#if data.altLabel}
  <h2>
    AKA
  </h2>
  {#each arrayify(data.altLabel) as alt}
     <p>{alt}</p>
  {/each}
{/if}

{#if data.relatedTo}
  <h2>
    Related To
  </h2>
  {#each arrayify(data.relatedTo) as related}
     <p>
      <a href={related}>{related}</a>
    </p>
  {/each}
{/if}
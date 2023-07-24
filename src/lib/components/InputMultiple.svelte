<script>
  export let label
  export let submit
  export let name

  let current_term = ''
  let terms = []

  const addTerm = () => {
    terms = [...terms, current_term]
    current_term = ''
  }

  const handleKeydown = (e) => {
    let trap = Boolean(document.activeElement.dataset.trap)
    if (trap && e.key === 'Enter') {
      e.preventDefault()
      addTerm()
    }
  }

  const removeTerm = (term) => (e) => {
    e.preventDefault()
    terms = terms.filter(value => value !== term)
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<label>
  {label}
  <input
    data-trap={true}
    bind:value={current_term}
    type="text">
  <button on:click|preventDefault={addTerm}>
    {submit}
  </button>
</label>

{#if terms.length === 0 }
<p><small>Hit enter to add term {terms.length === 0}</small></p>
{/if}

<p>
  {#each terms as term}
    <mark>{term} <button on:click={removeTerm(term)}>x</button></mark>
    <input
      name={name}
      value={term}
      type="hidden">
  {/each}
</p>


<style>
  label {
    margin-top: 1rem;
    display: block;
  }
  input {
    display: block;
  }
</style>
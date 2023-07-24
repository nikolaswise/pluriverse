<script>
  // […{name: String, value: ID}]
  export let options
  export let name
  export let placeholder = "Search for options…"

  let filter = ''
  let selected = []

  let filtered_options = options
  let option_map = new Map(
    options.map(({value, name}) => [value, name])
  )

  const remove = (option) => (e) => {
    e.preventDefault()
    selected = selected.filter(value => value != option)
  }

  $: {
    if (filter.length > 0) {
      filtered_options = options
        .filter(option => option.name.toLowerCase().includes(filter.toLowerCase()))
    } else {
      filtered_options = options
    }
  }
</script>

<input
  placeholder={placeholder}
  bind:value={filter}
  type="text">
<select
  name={name}
  multiple
  bind:value={selected} >
  {#each filtered_options as option}
    <option value={option.value}>
      {option.name}
    </option>
  {/each}
</select>
{#each selected as option}
  <div>
    <span>{option_map.get(option)}</span>
    <button on:click={remove(option)}>x</button>
  </div>
{/each}

<style>
  input, select {
    display: block;
    width: var(--select-width, 100%);
  }
  select, div {
    margin-bottom: 1rem;
  }
</style>
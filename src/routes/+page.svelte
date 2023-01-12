<script type="text/javascript">
  import Calculator from '$lib/components/Calculator.svelte'
  import CalculatorForm from '$lib/components/CalculatorForm.svelte'
  import Counter from '$lib/components/Counter.svelte'
  console.log('/routes/+page.svelte runtime')
</script>

<h1>Welcome to SvelteKit</h1>

<p>Build services, front-ends, and APIs.</p>

<h2>Two Way Binding</h2>

<Calculator a=100 b=2 />

<h2>Client / Server Actions</h2>

<CalculatorForm a=100 b=2 />

<h2>Observable Stores</h2>

<Counter />

<style type="text/css">
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }
</style>



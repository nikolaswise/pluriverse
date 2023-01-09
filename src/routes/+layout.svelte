<script type="text/javascript">
    import { count } from '$lib/stores.js'
</script>

<main>
  <slot></slot>
</main>

<footer>
  The count is <a href="/{$count}">{$count}</a>, ah ah ah!
</footer>

<style type="text/css">
  main,
  footer {
    max-width: 24rem;
    margin: 2rem auto;
  }
</style>
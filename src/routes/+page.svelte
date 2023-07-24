<script type="text/javascript">
  import CreateResource from '$lib/components/CreateResource.svelte'
  export let data
</script>


<h1>SvelteKit Triplestore Skeleton Application</h1>

<p>What is there to say about this app?</p>

<p>This application is a REST-style application, with all resources at the root level identified by their URL.</p>

<CreateResource
  relatedTo={data.resource} />

<h2>Resources</h2>

<ul>
  {#each data.resource as resource}
    <li>
      <a href={resource.id}>{resource.title}</a>
    </li>
  {/each}
</ul>
<script type="text/javascript">
	let predicates = ['@id', 'skos:prefLabel', 'type', 'dct:related']
	let subjects = [
		{
			'@id': '0x01', 
			'skos:prefLabel': 'Resource 01', 
			'type': 'Concept', 
			'dct:related': null
		},
		{
			'@id': '0x02', 
			'skos:prefLabel': 'Resource 02', 
			'type': 'Concept', 
			'dct:related': null
		},
		{
			'@id': '0x03', 
			'skos:prefLabel': 'Resource 03', 
			'type': 'Concept', 
			'dct:related': null
		},
		{
			'@id': '0x04', 
			'skos:prefLabel': 'Resource 04', 
			'type': 'Concept', 
			'dct:related': null
		},
	]


</script>

<h2>Like a spreadsheet!</h2>

<div 
	style="--cols: {predicates.length + 1}"
	class="datatable">

	{#each subjects as s}
		<details open>
			<summary>
				{s['@id']}
			</summary>
			<form 
				action="{s['@id']}"
				method="POST">
				{#each predicates as p}
					<div>
						<label>
							<em>{p}</em>
						</label>
						<input 
							bind:value={s[p]}
							type="text" 
							name="{p}">
					</div>
				{/each}
				<button>
					Save
				</button>
			</form>
		</details>
	{/each}
	
	<details>
		<summary>
			Add +
		</summary>
		Add predicate form ehre!
	</details>
</div>

<style type="text/css">
	.datatable {
/*		display: grid;*/
/*		grid-template-columns: repeat(var(--cols), 1fr);*/
	}

	input {
		display: block;
	}

</style>
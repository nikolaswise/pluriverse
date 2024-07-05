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
	class="datatable"
	style="--cols: {predicates.length + 1}">
	
	<div class="row">
		<div>view</div>
		{#each predicates as p}
			{#if p !== '@id'}
				<div>
					{p}
					<button popovertarget="edit-{p}">Edit</button>
					<dialog modal popover id="edit-{p}">
						{p}
						<form>
							<label>
								Value
							</label>
							<select>
								<option>Relationship</option>
								<option>Scalar</option>
							</select>
							<label>
								Domain
							</label>
							<input 
								placeholder="ex:predicate" 
								type="text" 
								name="p">
							<label>
								Range
							</label>
							<input 
								placeholder="ex:predicate" 
								type="text" 
								name="p">
							<label>
								Type
							</label>
							<select>
								<option>Text</option>
								<option>Decimal</option>
								<option>Integer</option>
								<option>Boolean</option>
								<option>Date</option>
								<option>Time</option>
							</select>
							<button>
								Save
							</button>
						</form>
					</dialog>
				</div>
			{/if}
		{/each}
		<div>
			<button popovertarget="new-predicate">Add+</button>
			<dialog modal popover id="new-predicate">
				<form>
					<label>
						Predicate URI
					</label>
					<input 
						placeholder="ex:predicate" 
						type="text" 
						name="p">
					<button>
						Create
					</button>
				</form>
			</dialog>
		</div>
	</div>

	{#each subjects as s}
		<form 
			class="row"
			action="{s['@id']}"
			method="POST">
			<a href="{s['@id']}">{s['@id']}</a>
			{#each predicates as p}
				{#if p !== '@id'}
					<input 
						value={s[p]}
						type="text" 
						name="{p}">
				{/if}
			{/each}
			<button>
				Save
			</button>
		</form>
	{/each}

</div>

<style type="text/css">
	.datatable {
		max-width: 100%;
		overflow-x: scroll;
	}
	.row {
		display: grid;
		grid-template-columns:repeat(var(--cols), 1fr);
	}
	label,
	select,
	input {
		display: block;
	}

</style>
<script>
	import Panel from "./Panel.svelte";
	import {
		BackgroundColor,
		FoldedFrontColor,
		FoldedBackColor,
		SimulatorFrontColor,
		SimulatorBackColor,
		LineOpacity,
		BoundaryColor,
		MountainColor,
		ValleyColor,
		FlatColor,
		JoinColor,
		UnassignedColor,
		ResetStyleDefaults,
	} from "../../stores/Style.js";
	import {
		FoldedRenderer
	} from "../../stores/Renderer.js";

	export let showPanel;
</script>

<Panel {showPanel}>
	<span slot="title">Style</span>
	<span slot="body">
		<div class="flex-column gap">

			<p>Folded</p>

			{#if $FoldedRenderer === "simulator"}
				<div class="flex-row center">
					<input type="color" bind:value={$SimulatorBackColor} />
					<input type="color" bind:value={$SimulatorFrontColor} />
				</div>
			{:else}
				<div class="flex-row center">
					<input type="color" bind:value={$FoldedBackColor} />
					<input type="color" bind:value={$FoldedFrontColor} />
				</div>
			{/if}

			<p>Crease Pattern</p>

			<div class="flex-row center">
				<div class="flex-column center gap">
					<input
						type="color"
						id="color-boundary"
						title="boundary"
						bind:value={$BoundaryColor} />
					<label for="color-boundary">B</label>
				</div>

				<div class="flex-column center gap">
					<input
						type="color"
						id="color-mountain"
						title="mountain"
						bind:value={$MountainColor} />
					<label for="color-mountain">M</label>
				</div>

				<div class="flex-column center gap">
					<input
						type="color"
						id="color-valley"
						title="valley"
						bind:value={$ValleyColor} />
					<label for="color-valley">V</label>
				</div>

				<div class="flex-column center gap">
					<input
						type="color"
						id="color-flat"
						title="flat"
						bind:value={$FlatColor} />
					<label for="color-flat">F</label>
				</div>

				<div class="flex-column center gap">
					<input
						type="color"
						id="color-join"
						title="join"
						bind:value={$JoinColor} />
					<label for="color-join">J</label>
				</div>

				<div class="flex-column center gap">
					<input
						type="color"
						id="color-unassigned"
						title="unassigned"
						bind:value={$UnassignedColor} />
					<label for="color-unassigned">U</label>
				</div>
			</div>

			<hr/>

			<div class="flex-row center">
				<button on:click={ResetStyleDefaults}>Reset Defaults</button>
			</div>

		</div>
	</span>
</Panel>

<style>
	.center {
		align-items: center;
	}
</style>

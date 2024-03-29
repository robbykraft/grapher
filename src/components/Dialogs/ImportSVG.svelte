<script>
	import { onMount } from "svelte";
	import { foldToViewBox } from "rabbit-ear/svg/general/viewBox.js";
	import Pages from "./Pages.svelte";
	import SVGCanvas from "../SVGCanvas/SVGCanvas.svelte";
	import EdgesLayer from "../SVGCanvas/EdgesLayer.svelte";
	import SVGColorsList from "./SVGColorsList.svelte";
	import {
		ImportedFileFOLDPreview,
		ImportedFileDefaultOptions,
		ImportedFileOptions,
	} from "../../stores/File.js";
	import { niceNumber } from "../../js/epsilon.js";

	let epsilonSlider = 10;
	let boundary = true;

	let circles = [];
	$: circles = ($ImportedFileFOLDPreview && $ImportedFileFOLDPreview.vertices_coords
		? $ImportedFileFOLDPreview.vertices_coords
		: []).map(coord => ({ cx: coord[0], cy: coord[1], r: $ImportedFileOptions.epsilon }));
	$: previewViewBox = foldToViewBox($ImportedFileFOLDPreview);
	$: strokeWidth = $ImportedFileOptions.boundingBox
		&& $ImportedFileOptions.boundingBox.span
		? Math.max($ImportedFileOptions.boundingBox.span[0],
			$ImportedFileOptions.boundingBox.span[0]) / 100
		: 0.01;
	$: colorCount = $ImportedFileOptions && $ImportedFileOptions.assignments
		? Object.keys($ImportedFileOptions.assignments).length
		: 0;
	$: $ImportedFileOptions.epsilon = Math.pow(2, epsilonSlider) / 10000;

	onMount(() => {
		epsilonSlider = Math.log2(($ImportedFileDefaultOptions.epsilon) * 10000);
	});

			// invertVertical={$ImportedFileOptions.invertVertical}

</script>

<h1>Import SVG File</h1>

<div class="svg-preview crease-pattern">
	<SVGCanvas
		{strokeWidth}
		viewBox={previewViewBox}>
		<EdgesLayer graph={$ImportedFileFOLDPreview} {strokeWidth} />
		<g class="vertices">
			{#each circles as circle}<circle {...circle} />{/each}
		</g>
	</SVGCanvas>
</div>

<Pages names={["canvas", "colors", "boundary", "epsilon"]}>
	<div slot="0" class="flex-column gap">
		<h3>canvas</h3>
		<div>
			<input
				type="checkbox"
				id="checkbox-y-flip"
				bind:checked={$ImportedFileOptions.invertVertical}>
			<label for="checkbox-y-flip">flip y-axis</label>
		</div>
	</div>

	<div slot="1" class="flex-column gap">
		<h3>{colorCount} colors found</h3>
		<SVGColorsList bind:assignments={$ImportedFileOptions.assignments} />
	</div>

	<div slot="2" class="flex-column gap">
		<h3>boundary</h3>
		<p class="explain">Walk around the boundary to assign boundary edges.</p>
		<div>
			<input
				type="checkbox"
				id="checkbox-boundary"
				bind:checked={boundary}>
			<label for="checkbox-boundary">find boundary</label>
		</div>
	</div>

	<div slot="3" class="flex-column gap">
		<h3>merge distance</h3>
		<p class="explain">Touching endpoints will become one vertex.</p>
		<input
			type="range"
			min="1"
			max="20"
			step="0.01"
			id="epsilon-slider"
			bind:value={epsilonSlider}>
		<p>distance: <span class="number">{niceNumber($ImportedFileOptions.epsilon)}</span></p>
		<p>suggested: <span class="number">{niceNumber($ImportedFileDefaultOptions.epsilon || 0)}</span></p>
	</div>
</Pages>

<style>
	input[type=range] {
		width: 100%;
	}
	p {
		max-width: 12rem;
		margin: auto;
	}
	.svg-preview {
		width: 12rem;
		height: 12rem;
		margin: auto;
	}
	.vertices circle {
		fill: var(--highlight);
		opacity: 0.666;
	}
	.flex-column {
		display: flex;
		flex-direction: column;
	}
	.flex-row {
		display: flex;
		flex-direction: row;
	}
	.gap {
		gap: 0.5rem;
	}
	.number {
		font-weight: bold;
	}
	.explain {
		font-style: italic;
		color: var(--dim);
	}
</style>

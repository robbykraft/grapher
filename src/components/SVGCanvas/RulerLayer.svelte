<script>
	import {
		clipLineFuncInLargerViewport,
		clipLineInLargerViewport,
		clipRayInLargerViewport,
	} from "../../js/intersect.js";

	export let viewport = [0, 0, 1, 1];
	export let rulers = [];

	$: segments = rulers
		.map(ruler => clipLineFuncInLargerViewport(ruler.line, ruler.domain, viewport))
		.filter(res => res !== undefined)
		.filter(res => res.length > 1)
		.filter(a => a !== undefined);

	// this is a work-around for an unfortunate rendering bug in Safari,
	// Safari has an issue rendering stroke-dasharray css animations but
	// only when the lines are vertical or horizontal (go figure?).
	// detect when this is the case, render these lines without animation.
	// $: segmentsRectilinear = segments
	// 	.map(([p0, p1]) => subtract2(p1, p0))
	// 	.map(vector => parallel(vector, [1, 0]) || parallel(vector, [0, 1]));
	// here is an alternate solution (this is wild that this works)
	// use a path instead of line, append a small little diagonal bit at the end
	$: hack = `l${[viewport[2] * 0.1, viewport[2] * 0.1].join(",")}`;
</script>

<g class="ruler-line-layer">
	{#each segments as s, i}
		<!-- <line
			x1={s[0][0]}
			y1={s[0][1]}
			x2={s[1][0]}
			y2={s[1][1]}
			class={segmentsRectilinear[i]
				? "ruler-line dashed-line"
				: "ruler-line animated-dashed-line"}
		/> -->
		<path
			d={`M${s[0].join(",")}L${s[1].join(",")}${hack}`}
			class="ruler-line animated-dashed-line"
		/>
	{/each}
</g>

<style>
	.ruler-line {
		fill: none;
		stroke: var(--bright);
	}
	@keyframes animate-dash {
		from { stroke-dashoffset: 0; }
		to { stroke-dashoffset: calc(500pt * var(--stroke-dash-length)); }
	}
	.animated-dashed-line {
		stroke-dasharray: var(--stroke-dash-length);
		animation: 60s linear 0s infinite reverse both running animate-dash;
	}
</style>

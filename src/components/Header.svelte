<script>
	import {
		DarkMode,
		AutoPlanarize,
		Snapping,
	} from "../stores/App.js";
	import {
		SNAP_NONE,
		SNAP_GRID,
		SNAP_SMART,
	} from "../app/keys.js";
	import { Graph } from "../stores/Graph.js";
	import { execute } from "../kernel/app.js";
	import { loadFileDialog } from "../js/file.js";

	// temp
	let showSimulator = false;
	let showTerminal = true;

	let inputFile;
	const clickDarkMode = () => { $DarkMode = !$DarkMode; };
</script>

	<nav>
		<ul>
			<li>file
				<ul>
					<li><button on:click={Graph.reset}>new</button></li>
					<hr />
					<li>example bases
						<ul>
							<li>fish</li>
							<li>bird</li>
							<li>frog</li>
							<li>windmill</li>
						</ul>
					</li>
					<hr />
					<li><button on:click={() => inputFile.click()}>load</button></li>
					<li>
						<button on:click={() => execute("download", "origami.fold")}>save</button>
					</li>
				</ul>
			</li>
			<li>graph
				<ul>
					<li>
						<span class="popover">convert to planar graph</span>
						<button on:click={() => execute("planarize")}>planarize</button>
					</li>
					<li class="no-select">
						<span class="popover">automatically planarize after (most) operations</span>
						<input type="checkbox" id="checkbox-auto-planarize" bind:checked={$AutoPlanarize}>
						<label for="checkbox-auto-planarize">auto-planarize</label>
					</li>
					<hr />
					<li class="no-select description">snapping</li>
					<li class="no-select">
						<div>
							<input
								type="radio"
								id="radio-snapping-no-snapping"
								bind:group={$Snapping}
								value={SNAP_NONE} 
							>
							<label for="radio-snapping-no-snapping">off</label>
						</div>
						<div>
							<input
								type="radio"
								id="radio-snapping-grid"
								bind:group={$Snapping}
								value={SNAP_GRID} 
							>
							<label for="radio-snapping-grid">grid</label>
						</div>
						<div>
							<input
								type="radio"
								id="radio-snapping-smart"
								bind:group={$Snapping}
								value={SNAP_SMART} 
							>
							<label for="radio-snapping-smart">smart</label>
						</div>
					</li>
					<li>
						<button on:click={() => execute("snapAllVertices")}>snap once to grid</button>
					</li>
				</ul>
			</li>
			<li>assignment
				<ul>
					<li>reassign selected
						<ul>
							<li><button on:click={() => {}}>boundary</button></li>
							<li><button on:click={() => {}}>mountain</button></li>
							<li><button on:click={() => {}}>valley</button></li>
							<li><button on:click={() => {}}>flat</button></li>
							<li><button on:click={() => {}}>cut</button></li>
							<li><button on:click={() => {}}>join</button></li>
							<li><button on:click={() => {}}>unassigned</button></li>
						</ul>
					</li>
					<li><button on:click={() => {}}>flatten 3D angles</button></li>
				</ul>
			</li>
			<li>select
				<ul>
					<li><button on:click={() => {}}>select all</button></li>
					<li>select by assignment
						<ul>
							<li><button on:click={() => {}}>boundary</button></li>
							<li><button on:click={() => {}}>mountain</button></li>
							<li><button on:click={() => {}}>valley</button></li>
							<li><button on:click={() => {}}>flat</button></li>
							<li><button on:click={() => {}}>cut</button></li>
							<li><button on:click={() => {}}>join</button></li>
							<li><button on:click={() => {}}>unassigned</button></li>
						</ul>
					</li>
					<li><button on:click={() => {}}>select 3D angles</button></li>
					<hr />
					<li class="no-select description">select type:</li>
					<li class="no-select">
						<input type="radio" id="radio-select-vertex">
						<label for="radio-select-vertex">vertex</label>
						<input type="radio" id="radio-select-edge">
						<label for="radio-select-edge">edge</label>
						<input type="radio" id="radio-select-face">
						<label for="radio-select-face">face</label>
					</li>
					<hr />
					<li class="no-select description">modify selection</li>
					<li>set fold angle</li>
					<li>set assignment</li>
				</ul>
			</li>
			<li>analysis
				<ul>
					<li>flat-foldable vertex</li>
					<li>show face-winding</li>
					<li>isolated vertices</li>
					<li class="no-select description">show indices</li>
					<li class="no-select">
						<input type="checkbox" id="checkbox-vertices-indices">
						<label for="checkbox-vertices-indices">vertices</label>
					</li>
					<li class="no-select">
						<input type="checkbox" id="checkbox-edges-indices">
						<label for="checkbox-edges-indices">edges</label>
					</li>
					<li class="no-select">
						<input type="checkbox" id="checkbox-faces-indices">
						<label for="checkbox-faces-indices">faces</label>
					</li>
				</ul>
			</li>
			<li>window
				<ul>
					<li class="no-select">
						<input type="checkbox" id="checkbox-show-simulator" bind:checked={showSimulator}>
						<label for="checkbox-show-simulator">show simulator</label>
					</li>
					<li class="no-select">
						<input type="checkbox" id="checkbox-show-terminal" bind:checked={showTerminal}>
						<label for="checkbox-show-terminal">show terminal</label>
					</li>
					<hr />
					<li highlighted={$DarkMode}>
						<button on:click={clickDarkMode}>dark mode</button>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<input
		type="file"
		id="file"
		bind:this={inputFile}
		on:change={loadFileDialog} />

<style>
	.popover { display: none; }
	input[type=file] {
/*		visibility: hidden;*/
		display: none;
	}
	/* navbar */
	button {
		all: unset;
		margin: 0;
		padding: 0;
		border: 0;
	}
	nav {
		display: flex;
		flex-direction: row;
		height: 2rem;
		/* font-weight: 700;*/
		box-shadow: 0 0rem 0.5rem 0 #111;
		position: relative;
	}
	nav li {
		padding: 0 1rem;
/*		cursor: pointer;*/
		user-select: none;
		height: 100%;
	}
	nav hr {
		margin: 0.25rem auto;
		width: 90%;
	}
	nav > ul {
		height: 100%;
	}
	nav > ul > li {
		display: inline-flex;
		align-items: center;
	}
	nav ul ul li {
		padding: 0.25rem 1rem;
	}
	nav ul ul {
		display: none;
		position: absolute;
		z-index: 3;
		top: calc(2rem - 3px);
		box-shadow: 0 calc(1rem * 0.5) 1rem 0 black;
	}
	nav ul ul li {
		position: relative;
	}
	nav ul ul ul {
		top: 0;
		left: calc(6rem);
	}
	nav li:hover > ul {
		display: block;
	}

	/* colors*/
	nav,
	nav ul ul {
		background-color: #3a3a3a;
		color: #eee;
	}
	nav li[highlighted=true] {
		background-color: #e53;
		color: white;
	}
	nav li:hover {
		background-color: #444;
		color: white;
	}
	nav li[highlighted=true]:hover {
		background-color: #f75;
	}
	nav li.no-select {
		background-color: unset;
		color: unset;
	}
	nav li.no-select:hover {
		background-color: unset;
	}
	nav li.description {
		font-style: italic;
		opacity: 80%;
	}
</style>

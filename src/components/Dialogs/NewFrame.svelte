<script>
	import { execute } from "../../kernel/app.js";
	import { DialogNewFrame } from "../../stores/App.js";

	const newEmpty = () => {
		execute("appendFrame", {});
		$DialogNewFrame.close();
	};
</script>

<dialog bind:this={$DialogNewFrame}>
	<h1>new frame</h1>
	<hr />
	<h3>stand-alone</h3>
	<button on:click={newEmpty}>empty</button>
	<hr />
	<h3>child frame</h3>
	<button on:click={newEmpty}>foldedForm</button>
</dialog>

<style>
	dialog {
		border: 0;
		background-color: #333;
	}
	dialog::backdrop {
		background-color: #0004;
	}
	h1 {
		font-size: 2rem;
	}
</style>
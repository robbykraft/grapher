import pointerEvent from "./pointerEvent.js";
import panel from "./panel.svelte";
import icon from "./icon.svelte";
import SVGLayer from "./SVGLayer.svelte";

const scribble = {
	key: "scribble",
	name: "scribble",
	group: "many lines",
	icon,
	cp: {
		pointerEvent,
		SVGLayer,
	},
	panel,
};

export default scribble;

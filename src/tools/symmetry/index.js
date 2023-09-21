import pointerEvent from "./pointerEvent.js";
import panel from "./panel.svelte";
import icon from "./icon.svelte";
import SVGLayer from "./SVGLayer.svelte";
import {
	reset,
	subscribe,
	unsubscribe,
} from "./stores.js";

const symmetry = {
	key: "symmetry",
	name: "symmetry",
	group: "transform",
	icon,
	pointerEvent,
	panel,
	SVGLayer,
	reset,
	subscribe,
	unsubscribe,
};

export default symmetry;

import { get } from "svelte/store";
import { Presses } from "../../stores/UI.js";
import {
	RadialSnapDegrees,
	RadialSnapOffset,
} from "../../stores/Snap.js";
import { RulerLines, RulerRays } from "../../stores/Ruler.js";
import execute from "../../kernel/execute.js";

export const keyboardEventFoldLine = (eventType, event) => {
	switch (event.keyCode) {
	case 16:
		switch (eventType) {
		case "down":
			const presses = get(Presses);
			if (presses.length) {
				execute("radialRulers",
					presses[0],
					get(RadialSnapDegrees),
					get(RadialSnapOffset),
				);
			}
			break;
		case "up":
			RulerLines.set([]);
			RulerRays.set([]);
			break;
		}
		break;
	default:
		break;
	}
};
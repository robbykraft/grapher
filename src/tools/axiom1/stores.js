import {
	writable,
	derived,
} from "svelte/store";
import {
	snapToPoint,
	snapToRulerLine,
} from "../../js/snap.js";
import { execute, executeCommand } from "../../kernel/execute.js";
import { UILines } from "../../stores/UI.js";
import { RulerLines } from "../../stores/Ruler.js";

export const Move = writable(undefined);
export const Drag = writable(undefined);
export const Presses = writable([]);
export const Releases = writable([]);

export const Step = derived(
	[Presses, Releases],
	([$Presses, $Releases]) => $Presses.length + $Releases.length,
	0,
);

export const MoveCoords = derived(
	[Move, Step],
	([$Move, $Step]) => $Step < 2
		? snapToPoint($Move, false)
		: snapToRulerLine($Move, false).coords,
	undefined,
);

export const DragCoords = derived(
	[Drag, Step],
	([$Drag, $Step]) => $Step < 2
		? snapToPoint($Drag, false)
		: snapToRulerLine($Drag, false).coords,
	undefined,
);

export const Coords0 = derived(
	Presses,
	($Presses) => snapToPoint($Presses[0], false),
	undefined,
);

export const Coords1 = derived(
	Releases,
	($Releases) => snapToPoint($Releases[0], false),
	undefined,
);

export const Segment0 = derived(
	Presses,
	($Presses) => snapToRulerLine($Presses[1], false).coords,
	undefined,
);

export const Segment1 = derived(
	Releases,
	($Releases) => snapToRulerLine($Releases[1], false).coords,
	undefined,
);

export const AxiomPreview = derived(
	[Coords0, Coords1, DragCoords],
	([$Coords0, $Coords1, $DragCoords]) => {
		if ($Coords0 && !$Coords1 && $DragCoords) {
			const point1 = $Coords0.join(", ");
			const point2 = $DragCoords.join(", ");
			const args = `[${point1}], [${point2}]`;
			execute(`setUILines(axiom1(${args}))`);
		}
	},
	undefined,
);

export const AxiomRulers = derived(
	[Coords0, Coords1],
	([$Coords0, $Coords1]) => {
		if ($Coords0 && $Coords1) {
			const point1 = $Coords0.join(", ");
			const point2 = $Coords1.join(", ");
			const args = `[${point1}], [${point2}]`;
			// execute(`setUILines([])`);
			UILines.set([]);
			execute(`setRulerLines(axiom1(${args}))`);
		}
	},
	undefined,
);

export const DoAxiom = derived(
	[Segment0, Segment1],
	([$Segment0, $Segment1]) => {
		if ($Segment0 && $Segment1) {
			executeCommand("segment", $Segment0, $Segment1);
			reset();
		}
	},
	undefined,
);

export const reset = () => {
	Move.set(undefined);
	Drag.set(undefined);
	Presses.set([]);
	Releases.set([]);
	UILines.set([]);
	RulerLines.set([]);
};

let unsub = [];

export const subscribe = () => {
	unsub = [
		AxiomPreview.subscribe(() => {}),
		AxiomRulers.subscribe(() => {}),
		DoAxiom.subscribe(() => {}),
	];
};

export const unsubscribe = () => {
	unsub.forEach(unsubFn => unsubFn());
	reset();
};

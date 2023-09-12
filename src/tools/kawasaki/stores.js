import {
	writable,
	derived,
} from "svelte/store";
import {
	snapToPoint,
	snapToVertex,
	snapToRulerLine,
} from "../../js/snap.js";
import { UIRays } from "../../stores/UI.js";
import { RulerRays } from "../../stores/Ruler.js";
import execute from "../../kernel/execute.js";
import executeUI from "../../kernel/executeUI.js";

export const Move = writable(undefined);
export const Drag = writable(undefined);
export const Press = writable(undefined);

const MoveSnap = derived(Move, ($Move) => snapToVertex($Move), {});
const PressSnap = derived(Press, ($Press) => snapToVertex($Press), {});

export const MoveCoords = derived(
	MoveSnap,
	($MoveSnap) => $MoveSnap.coords,
	undefined,
);

export const MoveVertex = derived(
	MoveSnap,
	($MoveSnap) => $MoveSnap.vertex,
	undefined,
);

// todo when shift snap to ruler line
export const DragCoords = derived(
	Drag,
	($Drag) => snapToRulerLine($Drag).coords,
	undefined,
);

export const PressVertex = derived(
	PressSnap,
	($PressSnap) => $PressSnap.vertex,
	undefined,
);

export const PressCoords = derived(
	PressSnap,
	($PressSnap) => $PressSnap.coords,
	undefined,
);

export const KawasakiRulers = derived(
	PressVertex,
	($PressVertex) => $PressVertex !== undefined
		? execute("kawasakiRulers", $PressVertex)
		: RulerRays.set([]),
	undefined,
);

export const KawasakiRulerPreviews = derived(
	MoveVertex,
	($MoveVertex) => $MoveVertex !== undefined
		? executeUI("kawasakiRulerPreviews", $MoveVertex)
		: UIRays.set([]),
	undefined,
);

export const reset = () => {
	Move.set(undefined);
	Press.set(undefined);
	Drag.set(undefined);
};

let unsub;
let unsub2;

export const subscribe = () => {
	unsub2 = KawasakiRulerPreviews.subscribe(() => {});
	unsub = KawasakiRulers.subscribe(() => {});
};

export const unsubscribe = () => {
	if (unsub) { unsub(); }
	if (unsub2) { unsub2(); }
	reset();
};

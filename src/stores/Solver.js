import { writable } from "svelte/store";

// settings to fine-tune the simulator's solver
export const Integration = writable("euler");
export const AxialStiffness = writable(20);
export const FaceStiffness = writable(0.2);
export const JoinStiffness = writable(0.7);
export const CreaseStiffness = writable(0.7);
export const DampingRatio = writable(0.45);

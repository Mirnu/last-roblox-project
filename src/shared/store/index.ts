import { CombineStates } from "@rbxts/reflex";
import { taskSlice } from "./tasks/task-slice";
import { playerSlice } from "./players/player-slice";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	tasks: taskSlice,
	players: playerSlice,
};

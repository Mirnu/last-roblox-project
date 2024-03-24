import { createProducer } from "@rbxts/reflex";
import { mapProperty } from "shared/utils/object-utils";

export interface PlayerState {
	readonly [id: number]: PlayerEntity | undefined;
}

export interface PlayerEntity {
	thirst: number;
	amountCoke: number;
}

const initialState: PlayerState = {};

export const playerSlice = createProducer(initialState, {
	addPlayer: (state, id: number, player: PlayerEntity) => ({
		...state,
		[id]: player,
	}),
	removePlayer: (state, id: number) => ({
		...state,
		[id]: undefined,
	}),
	addThirst: (state, id: number, thirst: number) => {
		return mapProperty(state, id, (playerEntity) => ({
			...playerEntity,
			thirst: math.clamp(playerEntity.thirst + thirst, 0, 100),
		}));
	},
	addCoke: (state, id: number) => {
		return mapProperty(state, id, (playerEntity) => ({
			...playerEntity,
			amountCoke: playerEntity.amountCoke + 1,
		}));
	},
});

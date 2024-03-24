import { createSelector } from "@rbxts/reflex";
import { SharedState } from "..";
import { castPlayers } from "shared/utils/cast-utils";

export const selectPlayers = (state: SharedState) => state.players;

export const selectPlayerById = (id: number) => (state: SharedState) => state.players[id];

export const selectThirstById = (id: number) => (state: SharedState) => state.players[id]?.thirst;
export const selectAmountCokeById = (id: number) => (state: SharedState) => state.players[id]?.amountCoke;

export const selectThirstPlayers = createSelector(selectPlayers, (state) => {
	const players = castPlayers(state);
	return players.filter((playerEntity) => playerEntity.thirst === 0);
});

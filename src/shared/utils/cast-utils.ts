import { PlayerEntity, PlayerState } from "shared/store/players/player-slice";

export function castPlayers(state: PlayerState) {
	return state as PlayerEntity[];
}

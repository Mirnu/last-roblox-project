import Signal from "@rbxts/signal";

export const NightSignals = {
	GameStartedSignal: new Signal(),
	TimeUpdatedSignal: new Signal<(time: number) => void>(),
};

export const TaskSignals = {
	PlayerFailedTask: new Signal<(player: Player) => void>(),
};

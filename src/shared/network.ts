import { Networking } from "@flamework/networking";
import { BroadcastAction } from "@rbxts/reflex";
import { TaskEntity } from "./store/tasks/task-slice";

interface ClientToServerEvents {
	requestState(): void;
	TVWatched(object: BasePart, time: number): void;
}

interface ServerToClientEvents {
	broadcast(actions: BroadcastAction[]): void;
	MakeDarken(time: number, difference?: number): void;
	TimeUpdated(time: number): void;
	HighlightInstance(model: HighlightModel, state: boolean): void;
	ShowCompletedTask(task: TaskEntity): void;
	ShowFailedTask(task: TaskEntity): void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();

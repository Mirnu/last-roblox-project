import { createSelector } from "@rbxts/reflex";
import { SharedState } from "..";
import { TaskEntity } from "./task-slice";

export const selectTasks = (state: SharedState) => state.tasks;

export const selectTaskById = (id: string) => {
	return (state: SharedState) => state.tasks[id];
};

export const selectCompletedTimeByTaskId = (id: string) => {
	return (state: SharedState) => state.tasks[id]?.completedTime;
};

export const selectPlayerTasks = (player: number) => {
	return createSelector(selectTasks, (tasks) => {
		const playerTasks: TaskEntity[] = [];
		for (const [index, task] of pairs(tasks)) {
			task.player === player && playerTasks.push(task);
		}
		return playerTasks;
	});
};

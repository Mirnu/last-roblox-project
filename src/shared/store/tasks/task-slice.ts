import { createProducer } from "@rbxts/reflex";
import { Task } from "shared/config/task-config";
import { mapProperty } from "shared/utils/object-utils";

export interface TaskState {
	readonly [id: string]: TaskEntity;
}

export interface TaskEntity {
	readonly id: string;
	readonly player: number;
	readonly task: Task;
	readonly completedTime: number;
}

const initialState: TaskState = {};

export const taskSlice = createProducer(initialState, {
	addTask: (state, task: TaskEntity) => ({
		...state,
		[task.id]: task,
	}),
	removeTask: (state, id) => ({
		...state,
		[id]: undefined,
	}),
	changeTime: (state, id: string, time: number) => {
		return mapProperty(state, id, (taskEntity) => {
			return { ...taskEntity, completedTime: taskEntity.completedTime + time };
		});
	},
});

import { TaskEntity, TaskState } from "shared/store/tasks/task-slice";

export function getRemovedTask(cur: TaskState, prev: TaskState) {
	for (const [id, task] of pairs(prev)) {
		const tasks = cur as unknown as TaskEntity[];
		if (!tasks.find((taskEntity) => taskEntity.id === task.id)) {
			return task;
		}
	}
}

export function getNewTask(cur: TaskState, prev: TaskState) {
	for (const [id, task] of pairs(cur)) {
		const tasks = prev as unknown as TaskEntity[];
		if (!tasks.find((taskEntity) => taskEntity.id === task.id)) {
			return task;
		}
	}
}

import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { store } from "client/store";
import { selectCompletedTimeByTaskId, selectTaskById, selectTasks } from "shared/store/tasks/task-selector";
import { getRemovedTask } from "shared/utils/task-utils";
import { Events } from "client/network";

interface Attributes {}

@Component({})
export class TaskComponent extends BaseComponent<Attributes, TaskTemplate> implements OnStart {
	onStart() {}

	public Render(id: string) {
		const taskEntity = store.getState(selectTaskById(id));

		this.instance.TaskTemplate.Text = taskEntity.task.text;
		this.instance.Time.Text = tostring(taskEntity.completedTime);
		const unsubscribe = store.subscribe(selectCompletedTimeByTaskId(id), (state) => {
			if (state === undefined) return;
			this.instance.Time.Text = tostring(state);
		});
		store.subscribe(selectTasks, (state, prev) => {
			const removedTask = getRemovedTask(state, prev);
			if (removedTask === undefined || removedTask.id !== id) return;
			unsubscribe();
			this.instance.Destroy();
		});
		Events.ShowFailedTask.connect((taskEntity) => {
			if (taskEntity.id === id) {
				unsubscribe();
				this.instance.Destroy();
			}
		});
	}
}

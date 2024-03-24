import { OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { store } from "client/store";
import { selectPlayerTasks } from "shared/store/tasks/task-selector";
import { LocalPlayer } from "client/utils/player-utils";
import { getNewTask } from "shared/utils/task-utils";
import { TaskState } from "shared/store/tasks/task-slice";
import { assets } from "shared/assets/assets";
import { TaskComponent } from "./TaskComponent";

interface Attributes {}

@Component({})
export class TaskListComponent extends BaseComponent<Attributes, TasksUI> implements OnStart {
	constructor(private components: Components) {
		super();
	}

	onStart() {
		store.subscribe(selectPlayerTasks(LocalPlayer.UserId), (state, prev) => {
			const task = getNewTask(state as unknown as TaskState, prev as unknown as TaskState);
			if (task === undefined) return;
			const taskUI = assets.ui.TaskTemplate.Clone();
			taskUI.Parent = this.instance.Frame;
			this.components.addComponent<TaskComponent>(taskUI).Render(task.id);
		});
	}
}

import { Component } from "@flamework/components";
import { BaseTaskComponent } from "../abstract/BaseTaskComponent";
import { Rest } from "shared/config/task-config";
import { OnStart } from "@flamework/core";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { store } from "server/store";
import { cancelThread } from "shared/utils/thread-utils";
import { timeSpeed } from "server/classes/nights/nights";

@Component({
	tag: "Rest",
})
export class RestComponent extends BaseTaskComponent<Model> implements OnStart {
	public task = Rest;
	private thread!: thread;

	onStart(): void {
		this.OnTaskStartedSignal.Connect((taskEntity: TaskEntity) => this.start(taskEntity));
	}

	private start(taskEntity: TaskEntity) {
		task.delay(taskEntity.completedTime, () => {
			this.taskDone(taskEntity.player);
			cancelThread(this.thread);
		});
	}
	protected countDown(player: number, id: number): void {
		this.thread = task.spawn(() => {
			while (task.wait(1 / timeSpeed)) {
				store.changeTime(tostring(id), -1);
			}
		});
	}
}

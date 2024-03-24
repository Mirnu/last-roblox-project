import { BaseComponent, Component } from "@flamework/components";
import { Players, RunService } from "@rbxts/services";
import { Action, SharedComponent, SharedSubscribe } from "@rbxts/shared-components-flamework";
import Signal from "@rbxts/signal";
import { timeSpeed } from "server/classes/nights/nights";
import { test } from "server/components/factories/TaskFactoryComponent";
import { Events } from "server/network";
import { store } from "server/store";
import { TaskSignals } from "shared/classes/containers/signal-container";
import { Task } from "shared/config/task-config";
import { selectTaskById, selectPlayerTasks } from "shared/store/tasks/task-selector";
import { TaskEntity } from "shared/store/tasks/task-slice";

export interface BaseTask {
	task: Task;
	Start(taskEntity: TaskEntity): void;
	OnTaskEndedSignal: Signal;
}

@Component({})
export abstract class BaseTaskComponent<I extends Model> extends BaseComponent<{}, I> implements BaseTask {
	abstract task: Task;
	protected abstract countDown(player: number, id: number): void;

	public taskEntity!: TaskEntity;
	public OnTaskStartedSignal = new Signal<(taskEntity: TaskEntity) => void>();
	public OnTaskEndedSignal = new Signal();

	public Start(taskEntity: TaskEntity) {
		if (this.task.enabled !== undefined && !this.task.enabled) return;
		this.taskEntity = taskEntity;
		this.OnTaskStartedSignal.Fire(taskEntity);
		!test && this.countDown(taskEntity.player, tonumber(taskEntity.id)!);
	}

	protected CountDown(player: number, id: number) {
		task.spawn(() => {
			while (task.wait(1 / timeSpeed)) {
				const playerEntity = Players.GetPlayerByUserId(player)!;
				const taskEntity = store.getState(selectTaskById(tostring(id)));
				if (taskEntity === undefined) return;
				const remainingTime = taskEntity.completedTime;
				if (remainingTime === 0) {
					store.getState(selectPlayerTasks(player)).forEach((taskEntity) => {
						store.removeTask(tostring(taskEntity.id));
						Events.ShowFailedTask.fire(playerEntity, taskEntity);
					});

					TaskSignals.PlayerFailedTask.Fire(playerEntity);
					this.OnTaskEndedSignal.Fire();
					return;
				}
				store.changeTime(tostring(id), -1);
			}
		});
	}

	protected taskDone(playerID: number) {
		if (playerID !== this.taskEntity.player) return false;
		this.OnTaskEndedSignal.Fire();
		Events.ShowCompletedTask.broadcast(this.taskEntity);
		store.removeTask(this.taskEntity.id);
		return true;
	}
}

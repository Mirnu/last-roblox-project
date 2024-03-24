import { OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { PlayerService } from "server/services/PlayerService";
import { BaseTask } from "../tasks/abstract/BaseTaskComponent";
import { NightSignals } from "shared/classes/containers/signal-container";
import { cancelThread, getNewID } from "shared/utils/thread-utils";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { timeSpeed } from "server/classes/nights/nights";
import { store } from "server/store";
import { selectPlayerTasks } from "shared/store/tasks/task-selector";

interface Attributes {}

export const test = true;
export const checkOnEnabled = false;

@Component({})
export class TaskFactoryComponent extends BaseComponent<Attributes, Player> implements OnStart {
	constructor(private playerService: PlayerService) {
		super();
	}

	private thread?: thread;

	onStart() {
		NightSignals.GameStartedSignal.Connect(() => {
			test ? this.test() : this.start();
		});
	}

	private start() {
		this.addFirstsTasks();
		this.startCycleGivingTasks();
	}

	private addFirstsTasks() {
		this.addPlayerTask();
		task.wait(15 / timeSpeed);
		this.addPlayerTask();
	}

	private startCycleGivingTasks() {
		this.thread = task.spawn(() => {
			while (task.wait(30 / timeSpeed)) {
				if (this.playerService.Nights.Time === 360) return;
				this.addPlayerTask();
			}
		});
	}

	private test() {
		this.playerService.AllTasks.forEach((taskComponent, index) => {
			const taskEntity = {
				id: tostring(index),
				player: this.instance.UserId,
				task: taskComponent.task,
				completedTime: taskComponent.task.completedTime,
			} as TaskEntity;
			store.addTask(taskEntity);
			taskComponent.Start(taskEntity);
		});
	}

	private addPlayerTask(index?: number) {
		const taskEntity = this.playerService.AllTasks[index ?? 0];
		if (taskEntity === undefined) return;
		if (
			(checkOnEnabled && taskEntity.task.enabled === undefined) ||
			(taskEntity.task.enabled !== undefined && !taskEntity.task.enabled)
		) {
			this.addPlayerTask(index !== undefined ? index + 1 : 1);
			return;
		}
		const taskComponent =
			index !== undefined ? this.playerService.AllTasks.remove(index) : this.playerService.AllTasks.shift();
		taskComponent !== undefined && this.Start(taskComponent);
	}

	private Start(taskComponent: BaseTask) {
		const id = getNewID();
		const taskEntity = {
			id: tostring(id),
			player: this.instance.UserId,
			task: taskComponent.task,
			completedTime: taskComponent.task.completedTime,
		} as TaskEntity;

		store.addTask(taskEntity);
		taskComponent.Start(taskEntity);
		const connect = taskComponent.OnTaskEndedSignal.Connect(() => {
			const playerTasks = store.getState(selectPlayerTasks(this.instance.UserId));
			if (playerTasks.size() !== 0 || this.playerService.AllTasks.size() === 0) return;
			if (!this.playerService.WorkingPlayers.find((value) => value.UserId === this.instance.UserId)) return;
			connect.Disconnect();
			task.wait(0.1);
			this.restartCycle();
			this.addPlayerTask();
		});
	}

	private restartCycle() {
		if (this.thread !== undefined) {
			cancelThread(this.thread);
			this.startCycleGivingTasks();
		}
	}
}

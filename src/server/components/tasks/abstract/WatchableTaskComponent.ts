import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { HighlightTaskComponent } from "./HighlightTaskComponent";
import { Task } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { cancelThread } from "shared/utils/thread-utils";
import { Events } from "server/network";

@Component({})
export abstract class WatchableTaskComponent extends HighlightTaskComponent<WatchableModel> {
	abstract task: Task;
	private connect!: RBXScriptConnection;
	private time = 0;
	private thread!: thread;

	onInit() {
		this.instance.BillboardGui.Frame.Visible = false;
		this.OnTaskStartedSignal.Connect((taskEntity: TaskEntity) => this.start(taskEntity));
		super.onInit(this.instance);
	}

	start(taskEntity: TaskEntity): void {
		this.taskEntity = taskEntity;
		this.instance.BillboardGui.Frame.Visible = true;
		this.connect = Events.TVWatched.connect((player, object, dt) => {
			if (object !== this.instance.Box || player.UserId !== taskEntity.player) return;
			this.time += dt;
			this.setTime(this.time);
			this.startCD();
			this.task.holdDuration !== undefined && this.time >= this.task.holdDuration && this.TaskDone(player.UserId);
		});
		this.OnTaskEndedSignal.Connect(() => {
			this.connect.Disconnect();
			this.time = 0;
			this.setTime(0);
		});
	}

	private startCD() {
		cancelThread(this.thread);
		this.thread = task.delay(3, () => {
			this.time = 0;
			this.setTime(this.time);
		});
	}

	private TaskDone(playerID: number) {
		this.instance.BillboardGui.Frame.Visible = false;
		super.taskDone(playerID);
		this.OnTaskEndedSignal.Fire();
		this.connect.Disconnect();
		cancelThread(this.thread);
	}

	private setTime(time: number) {
		this.instance.BillboardGui.Frame.Label.Text = time !== 0 ? tostring(math.floor(time * 100) / 100) : "0.00";
	}

	protected countDown(player: number, id: number): void {
		super.CountDown(player, id);
	}
}

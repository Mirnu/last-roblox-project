import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { TaskEntity } from "shared/store/tasks/task-slice";
import Signal from "@rbxts/signal";
import { Players, TweenService } from "@rbxts/services";
import { Events } from "client/network";

interface Attributes {}

@Component()
export class CompletedTaskComponent extends BaseComponent<Attributes, CompletedTasksUI> implements OnStart {
	private completedTasks: TaskEntity[] = [];
	private textLabel = this.instance.PlayerCompletedTask;
	private thread?: thread;
	private tween?: Tween;
	private textRenderedSignal = new Signal();

	onStart() {
		this.textLabel.Text = "";
		this.instance.Enabled = true;
		Events.ShowCompletedTask.connect((completedTask) => {
			this.completedTasks.push(completedTask);
			this.renderText();
		});
	}

	private renderText() {
		if (this.thread && coroutine.status(this.thread) === "suspended") {
			const connect = this.textRenderedSignal.Connect(() => {
				connect.Disconnect();
				this.tween?.Cancel();
				this.transparency(0);
				this.renderText();
			});
			return;
		}
		this.transparency(0);
		this.thread = task.spawn(() => {
			const taskEntity = this.completedTasks.shift()!;
			const text = `${Players.GetPlayerByUserId(taskEntity.player!)?.Name} completed ${taskEntity.task.text}`;
			this.textLabel.Text = "";

			for (let i = 0; i < text.size() + 1; i++) {
				this.textLabel.Text = text.sub(0, i);
				task.wait(0.05);
			}
			task.wait(text.size() * 0.1 + 1);
			this.completedTasks.size() > 0 ? this.textRenderedSignal.Fire() : this.makeTransparency();
		});
	}

	private transparency(value: number) {
		this.textLabel.TextTransparency = value;
		this.textLabel.UIStroke.Transparency = value;
	}

	private makeTransparency() {
		const transparency = new Instance("NumberValue");
		this.tween = TweenService.Create(transparency, new TweenInfo(0.25), { Value: 1 });
		this.tween.Play();
		transparency.Changed.Connect((value) => {
			this.transparency(value);
		});
		this.tween.Completed.Wait();
		this.textLabel.Text = "";
	}
}

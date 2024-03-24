import { Component } from "@flamework/components";
import { Task } from "shared/config/task-config";
import { TweenService } from "@rbxts/services";
import Signal from "@rbxts/signal";
import Maid from "@rbxts/maid";
import { HighlightTaskComponent } from "./HighlightTaskComponent";

@Component({})
export abstract class WindowTaskComponent extends HighlightTaskComponent<Model> {
	abstract task: Task;
	private maid = new Maid();

	private windows = this.instance.GetChildren() as Window[];
	private countWindows = this.windows.size();

	protected OnWindowTriggeredSignal = new Signal<(playerID: number, window: Window) => void>();

	onInit() {
		this.windows.forEach((window) => {
			window.Box.ProximityPrompt.Enabled = false;
			super.onInit(window);
		});
		this.OnTaskStartedSignal.Connect(() => this.initAllWindows());
		this.OnTaskEndedSignal.Connect(() => this.maid.DoCleaning());
	}

	private initAllWindows() {
		this.windows.forEach((window) => {
			window.Box.ProximityPrompt.ActionText = this.task.text;
			window.Box.ProximityPrompt.Enabled = true;
			this.handleWindow(window);
		});
	}

	private handleWindow(window: Window) {
		const connect = window.Box.ProximityPrompt.Triggered.Connect((player: Player) => {
			if (player.UserId !== this.taskEntity.player) return;
			connect.Disconnect();
			window.Box.ProximityPrompt.Enabled = false;
			this.OnWindowTriggeredSignal.Fire(player.UserId, window);
		});
	}

	protected WindowTriggered(playerID: number, window: Window, opened: boolean) {
		this.countWindows--;
		this.countWindows <= 0 && this.taskDone(playerID);
		this.changeStateWindow(window, opened);
	}

	private changeStateWindow(window: Window, opened: boolean) {
		const offset = new Vector3(0, 2.259, 0);
		const ts = TweenService.Create(window.Working, new TweenInfo(0.5), {
			CFrame: opened ? window.Working.CFrame.add(offset) : window.Working.CFrame.sub(offset),
		});
		ts.Play();
	}

	protected countDown(player: number, id: number): void {
		this.CountDown(player, id);
	}
}

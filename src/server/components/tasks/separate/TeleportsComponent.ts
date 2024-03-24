import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { BaseTaskComponent } from "../abstract/BaseTaskComponent";
import { HighlightTaskComponent } from "../abstract/HighlightTaskComponent";
import { Task, Teleports } from "shared/config/task-config";

interface Attributes {}

@Component({})
export class TeleportsComponent extends HighlightTaskComponent<Model> implements OnStart {
	public task = Teleports;

	private teleports = this.instance.GetChildren() as TaskModel[];
	private teleportsCount = this.teleports.size();

	onStart() {
		this.teleports.forEach((teleport) => {
			teleport.Box.ProximityPrompt.Enabled = false;
			super.onInit(teleport);
		});
		this.OnTaskStartedSignal.Connect(() => this.initTeleports());
	}

	protected countDown(player: number, id: number): void {
		this.CountDown(player, id);
	}

	private initTeleports() {
		this.teleports.forEach((teleport) => {});
	}
}

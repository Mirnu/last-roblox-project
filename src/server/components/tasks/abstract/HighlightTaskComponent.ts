import { Component } from "@flamework/components";
import { BaseTask, BaseTaskComponent } from "./BaseTaskComponent";
import { Task } from "shared/config/task-config";
import { Players, RunService } from "@rbxts/services";
import { GetCharacter } from "shared/utils/player-utils";
import { Events } from "server/network";
import { store } from "server/store";
import { selectCompletedTimeByTaskId } from "shared/store/tasks/task-selector";
import { TaskEntity } from "shared/store/tasks/task-slice";

type callBack = () => void;

@Component({})
export abstract class HighlightTaskComponent<I extends Model> extends BaseTaskComponent<I> {
	abstract task: Task;
	private runServiceConnect!: RBXScriptConnection;

	protected onInit(instance: HighlightModel): void {
		let unsubscribe: callBack;
		this.OnTaskStartedSignal.Connect((taskEntity: TaskEntity) => {
			print(1);
			unsubscribe = store.subscribe(selectCompletedTimeByTaskId(taskEntity.id), (state, prev) => {
				state < 10 && this.showHighlight(instance);
			});
			this.highlighting(instance);
		});
		this.OnTaskEndedSignal.Connect(() => {
			unsubscribe && unsubscribe();
		});
	}

	private highlighting(instance: HighlightModel) {
		const player = Players.GetPlayerByUserId(this.taskEntity.player)!;
		const character = GetCharacter(player);
		this.runServiceConnect = RunService.Heartbeat.Connect(() => {
			character.HumanoidRootPart.Position.sub(instance.GetPivot().Position).Magnitude > 20
				? Events.HighlightInstance.fire(player, instance, false)
				: Events.HighlightInstance.fire(player, instance, true);
		});

		this.OnTaskEndedSignal.Connect(() => {
			this.runServiceConnect.Disconnect();
			Events.HighlightInstance.fire(player, instance, false);
		});
	}

	public showHighlight(instance: HighlightModel) {
		const player = Players.GetPlayerByUserId(this.taskEntity.player)!;
		this.runServiceConnect.Disconnect();
		Events.HighlightInstance.fire(player, instance, true);
	}
}

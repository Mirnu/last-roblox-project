import { Component } from "@flamework/components";
import { store } from "server/store";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { BaseTaskComponent } from "./BaseTaskComponent";
import { Events } from "server/network";
import Signal from "@rbxts/signal";
import { HighlightTaskComponent } from "./HighlightTaskComponent";
import { TryLuck } from "shared/utils/player-utils";

interface State {
	taskDone: boolean;
}

@Component({})
export abstract class ProximtyTaskComponent<I extends TaskModel> extends HighlightTaskComponent<I> {
	protected OnTriggeredSignal = new Signal<(taskEntity: TaskEntity) => void>();

	protected state: State = {
		taskDone: false,
	};

	public onInit() {
		this.instance.Box.ProximityPrompt.Enabled = false;
		this.OnTaskStartedSignal.Connect((taskEntity: TaskEntity) => this.start(taskEntity));
		super.onInit(this.instance);
	}

	public start(taskEntity: TaskEntity) {
		this.taskEntity = taskEntity;
		const proximty = this.instance.Box.ProximityPrompt;
		proximty.Enabled = true;
		proximty.ActionText = taskEntity.task.text;
		proximty.HoldDuration = this.taskEntity.task.holdDuration!;
		this.instance.Box.ProximityPrompt.Triggered.Connect((player) => {
			if (TryLuck(this.taskEntity.task.chance)) {
				if (!this.taskDone(player.UserId)) return;
				this.OnTriggeredSignal.Fire(taskEntity);
			}
		});
		this.OnTaskEndedSignal.Connect(() => {
			if (this.instance.FindFirstChild("Box") === undefined) return;
			this.instance.Box.ProximityPrompt.Enabled = false;
		});
	}

	protected countDown(player: number, id: number) {
		this.CountDown(player, id);
	}

	protected playSound(soundID: string, looped: boolean) {
		if (!this.task.willSound) return;
		const sound = new Instance("Sound");
		sound.SoundId = soundID;
		sound.Looped = looped;
		sound.Volume += sound.Volume - 0.5;
		sound.PlaybackRegionsEnabled = true;
		sound.RollOffMaxDistance = 200;
		sound.RollOffMinDistance = 5;
		sound.PlaybackRegion = new NumberRange(50, 200);
		sound.Parent = this.instance.Box;
		sound.Play();
		sound.Played.Connect(() => sound?.Destroy());
		return sound;
	}
}

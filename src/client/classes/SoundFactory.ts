import { Workspace } from "@rbxts/services";
import { Events } from "client/network";
import { LocalPlayer } from "client/utils/player-utils";
import { Task } from "shared/config/task-config";

export class SoundFactory {
	public Init() {
		Events.ShowCompletedTask.connect((completedTask) => {
			if (completedTask.task.soundID === undefined || completedTask.task.completedTime === undefined) return;
			completedTask.player === LocalPlayer.UserId
				? this.playLocalSound(completedTask.task)
				: this.playGlobalSound(completedTask.task.soundID);
		});
	}

	private playLocalSound(Task: Task) {
		if (!Task.willSound || !Task.soundClient) return;
		const sound = this.createSound(Task.soundID!);
		sound.Looped = Task.soundLooped!;
		sound.Volume += sound.Volume - 0.5;
		sound.PlaybackRegionsEnabled = true;
		sound.RollOffMaxDistance = 200;
		sound.RollOffMinDistance = 5;
		sound.PlaybackRegion = new NumberRange(50, 200);
		sound.Play();
		Task.timeSound !== undefined && task.delay(Task.timeSound, () => sound.Stop());
	}

	private playGlobalSound(soundID: string) {
		const sound = this.createSound(soundID);
		sound.Volume += 9.5;
		sound.Play();
	}

	private createSound(soundID: string) {
		const sound = new Instance("Sound", Workspace);
		sound.SoundId = soundID;
		return sound;
	}
}

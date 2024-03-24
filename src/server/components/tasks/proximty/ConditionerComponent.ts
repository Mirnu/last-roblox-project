import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { OnStart } from "@flamework/core";
import { Conditioner } from "shared/config/task-config";

@Component({
	tag: "Conditioner",
})
export class ConditionerComponent extends ProximtyTaskComponent<ParticleModel> implements OnStart {
	public task = Conditioner;

	onStart(): void {
		this.onInit();
		this.OnTriggeredSignal.Connect(() => {
			this.instance.ParticlePart.ParticleEmitter.Enabled = true;
			assert(this.taskEntity.task.soundLooped, "SoundLooped id undefined");
			this.playSound(this.taskEntity.id, this.taskEntity.task.soundLooped);
		});
	}
}

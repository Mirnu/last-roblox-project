import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Radiator, Task } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";

interface Attributes {}

@Component({
	tag: "Radiator",
})
export class RadiatorComponent extends ProximtyTaskComponent<ParticleModel> implements OnStart {
	public task = Radiator;

	onStart() {
		this.instance.ParticlePart.ParticleEmitter.Enabled = false;
		this.OnTriggeredSignal.Connect(() => {
			this.instance.ParticlePart.ParticleEmitter.Enabled = true;
		});
		this.onInit();
	}
}

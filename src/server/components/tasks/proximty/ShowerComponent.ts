import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Shower } from "shared/config/task-config";
import { Events } from "server/network";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { Players } from "@rbxts/services";

@Component({
	tag: "Shower",
})
export class ShowerComponent extends ProximtyTaskComponent<ParticleModel> implements OnStart {
	public task = Shower;

	onStart() {
		this.instance.ParticlePart.ParticleEmitter.Enabled = false;
		this.OnTriggeredSignal.Connect((taskEntity: TaskEntity) => {
			Events.MakeDarken(Players.GetPlayerByUserId(taskEntity.player)!, 2);
			this.instance.ParticlePart.ParticleEmitter.Enabled = true;
			task.wait(3);
			this.instance.ParticlePart.ParticleEmitter.Enabled = false;
		});
		this.onInit();
	}
}

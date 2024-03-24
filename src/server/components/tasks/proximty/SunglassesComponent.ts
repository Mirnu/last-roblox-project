import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Sunglasses, Task } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { Events } from "server/network";
import { Players } from "@rbxts/services";

@Component({
	tag: "Sunglasses",
})
export class SunglassesComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Sunglasses;

	onStart() {
		this.onInit();
		this.OnTriggeredSignal.Connect((taskEntity: TaskEntity) => {
			Events.MakeDarken(Players.GetPlayerByUserId(taskEntity.player)!, 0, -0.1);
		});
	}
}

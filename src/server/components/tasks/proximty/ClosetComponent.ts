import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Closet, Task } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { Events } from "server/network";
import { Players } from "@rbxts/services";
import { OnStart } from "@flamework/core";

@Component({
	tag: "Closet",
})
export class ClosetComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Closet;

	onStart(): void {
		this.onInit();
		this.OnTriggeredSignal.Connect((taskEntity: TaskEntity) => {
			Events.MakeDarken(Players.GetPlayerByUserId(taskEntity.player)!, 2);
		});
	}
}

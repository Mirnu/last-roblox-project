import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { NewsPaper, Task } from "shared/config/task-config";
import { Players } from "@rbxts/services";
import { Events } from "server/network";

@Component({
	tag: "NewsPaper",
})
export class NewsPaperComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = NewsPaper;
	onStart() {
		this.OnTriggeredSignal.Connect((taskEntity) =>
			Events.MakeDarken(Players.GetPlayerByUserId(taskEntity.player)!, 2),
		);
		super.onInit();
	}
}

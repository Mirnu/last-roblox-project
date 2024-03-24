import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Alarm, Task } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";

@Component({
	tag: "Alarm",
})
export class AlarmComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Alarm;
	private sound?: Sound;

	onStart() {
		this.onInit();

		this.OnTaskStartedSignal.Connect(() => {
			this.sound = this.playSound("rbxassetid://9125562261", true);
		});
		this.OnTriggeredSignal.Connect(() => {
			this.sound?.Stop();
		});
	}
}

import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Radio } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";

@Component({
	tag: "Radio",
})
export class RadioComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Radio;

	onStart() {
		this.onInit();
	}
}

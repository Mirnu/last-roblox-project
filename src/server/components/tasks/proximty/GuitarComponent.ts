import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Guitar } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { OnStart } from "@flamework/core";

@Component({
	tag: "Guitar",
})
export class GuitarComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Guitar;

	onStart(): void {
		this.onInit();
	}
}

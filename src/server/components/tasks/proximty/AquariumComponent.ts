import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Aquarium, Task } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";

@Component({
	tag: "Aquarium",
})
export class AquariumComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Aquarium;

	onStart() {
		this.onInit();
	}
}

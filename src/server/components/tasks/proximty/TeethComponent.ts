import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { Teeth } from "shared/config/task-config";
import { OnStart } from "@flamework/core";

@Component({
	tag: "Teeth",
})
export class TeethComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Teeth;

	onStart(): void {
		this.onInit();
	}
}

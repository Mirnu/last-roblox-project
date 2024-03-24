import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Dumbbells } from "shared/config/task-config";

@Component({
	tag: "Dumbbells",
})
export class DumbbellsComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Dumbbells;
	onStart() {
		this.onInit();
	}
}

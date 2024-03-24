import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Wash } from "shared/config/task-config";

@Component({
	tag: "Wash",
})
export class WashComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Wash;
	onStart() {
		super.onInit();
	}
}

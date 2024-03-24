import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Bear } from "shared/config/task-config";
import { OnStart } from "@flamework/core";

@Component({
	tag: "Bear",
})
export class BearComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Bear;

	onStart(): void {
		this.onInit();
	}
}

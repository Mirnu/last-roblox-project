import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Gift } from "shared/config/task-config";

@Component({
	tag: "Gift",
})
export class GiftComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Gift;
	onStart() {
		this.OnTaskEndedSignal.Connect(() => {
			this.instance.Destroy();
		});
		this.onInit();
	}
}

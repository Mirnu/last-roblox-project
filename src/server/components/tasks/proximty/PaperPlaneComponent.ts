import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { PaperPlane } from "shared/config/task-config";
import { assets } from "shared/assets/assets";
import { Workspace } from "@rbxts/services";

@Component({
	tag: "PaperPlane",
})
export class PaperPlaneComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = PaperPlane;
	onStart() {
		this.OnTriggeredSignal.Connect(() => {
			const newPaperPlane = assets.tasks.PaperPlane.PaperPlane.Clone();
			newPaperPlane.PivotTo(this.instance.GetPivot());
			newPaperPlane.Parent = Workspace;
			this.instance.Destroy();
		});
		super.onInit();
	}
}

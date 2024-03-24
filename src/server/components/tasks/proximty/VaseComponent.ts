import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Vase } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { assets } from "shared/assets/assets";
import { Workspace } from "@rbxts/services";

@Component({
	tag: "Vase",
})
export class VaseComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Vase;

	onStart() {
		this.OnTriggeredSignal.Connect(() => {
			const newVase = assets.tasks.vase.TableVase.Clone();
			newVase.PivotTo(this.instance.GetPivot());
			newVase.Parent = Workspace;
			this.instance.Destroy();
		});
		this.onInit();
	}
}

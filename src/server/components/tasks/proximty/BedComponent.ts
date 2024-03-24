import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { assets } from "shared/assets/assets";
import { Workspace } from "@rbxts/services";
import { Bed } from "shared/config/task-config";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { TaskEntity } from "shared/store/tasks/task-slice";

@Component({
	tag: "Bed",
})
export class BedComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Bed;

	onStart() {
		this.onInit();
		this.OnTriggeredSignal.Connect(() => {
			const newBed = assets.tasks.bed.MakedBed.Clone();
			newBed.PivotTo(this.instance.GetPivot());
			newBed.Parent = Workspace;
			this.instance.Destroy();
		});
	}
}

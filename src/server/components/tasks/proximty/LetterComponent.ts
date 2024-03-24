import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Letter, Task } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";

interface Attributes {}

@Component({
	tag: "Letter",
})
export class LetterComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Letter;

	onStart(): void {
		this.onInit();
	}
}

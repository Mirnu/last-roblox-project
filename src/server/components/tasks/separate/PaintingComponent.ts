import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { WatchableTaskComponent } from "../abstract/WatchableTaskComponent";
import { Painting } from "shared/config/task-config";

@Component({
	tag: "Painting",
})
export class PaintingComponent extends WatchableTaskComponent implements OnStart {
	public task = Painting;

	onStart(): void {
		super.onInit();
	}
}

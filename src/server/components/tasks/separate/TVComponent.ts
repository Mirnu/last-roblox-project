import { Component } from "@flamework/components";
import { TV } from "shared/config/task-config";
import { OnStart } from "@flamework/core";
import { WatchableTaskComponent } from "../abstract/WatchableTaskComponent";

@Component({
	tag: "TV",
})
export class TVComponent extends WatchableTaskComponent implements OnStart {
	public task = TV;

	onStart(): void {
		super.onInit();
	}
}

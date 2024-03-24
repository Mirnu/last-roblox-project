import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { OpenWindows } from "shared/config/task-config";
import { WindowTaskComponent } from "../abstract/WindowTaskComponent";

@Component({
	tag: "OpenWindows",
})
export class OpenWindowsComponent extends WindowTaskComponent implements OnStart {
	public task = OpenWindows;

	onStart() {
		this.OnWindowTriggeredSignal.Connect((playerID, window) => {
			this.WindowTriggered(playerID, window, true);
		});
		super.onInit();
	}
}

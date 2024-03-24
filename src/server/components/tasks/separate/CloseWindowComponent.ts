import { OnStart } from "@flamework/core";
import { Component, Components } from "@flamework/components";
import { CloseWindows } from "shared/config/task-config";
import { WindowTaskComponent } from "../abstract/WindowTaskComponent";
import { OpenWindowsComponent } from "./OpenWindowsComponent";

@Component({
	tag: "CloseWindows",
})
export class CloseWindowComponent extends WindowTaskComponent implements OnStart {
	constructor(private components: Components) {
		super();
	}

	public task = CloseWindows;

	onStart() {
		this.task.enabled = false;
		this.OnWindowTriggeredSignal.Connect((playerID, window) => {
			this.WindowTriggered(playerID, window, false);
		});
		this.traceOpenWindows();
		super.onInit();
	}

	private traceOpenWindows() {
		const openWindowsComponent = this.components.getAllComponents<OpenWindowsComponent>().shift();
		if (openWindowsComponent === undefined) {
			this.traceWithConnection();
			return;
		}

		openWindowsComponent.OnTaskEndedSignal.Connect(() => {
			this.task.enabled = true;
		});
	}

	private traceWithConnection() {
		const connect = this.components.onComponentAdded<OpenWindowsComponent>((openWindowsComponent) => {
			openWindowsComponent.OnTaskEndedSignal.Connect(() => {
				this.task.enabled = true;
				connect.Disconnect();
			});
		});
	}
}

import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Fan, Task } from "shared/config/task-config";
import { RunService } from "@rbxts/services";

@Component({
	tag: "Fan",
})
export class FanComponent extends ProximtyTaskComponent<Fan> implements OnStart {
	public task = Fan;
	private connect?: RBXScriptConnection;

	onStart() {
		this.OnTriggeredSignal.Connect(() => this.connect?.Disconnect());
		this.OnTaskStartedSignal.Connect(() => this.spin());
		super.onInit();
	}

	private spin() {
		this.connect = RunService.Heartbeat.Connect(() => {
			this.instance.Blades.CFrame = this.instance.Blades.CFrame.mul(CFrame.Angles(0, 0, math.rad(10)));
		});
	}
}

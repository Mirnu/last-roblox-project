import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { RunService, Workspace } from "@rbxts/services";
import { GetCharacter } from "shared/utils/player-utils";
import { LocalPlayer } from "client/utils/player-utils";
import { Events } from "client/network";

interface Attributes {}

@Component({})
export class RaycastComponent extends BaseComponent<Attributes, Camera> implements OnStart {
	private camera = Workspace.CurrentCamera!;

	onStart() {
		RunService.Heartbeat.Connect((dt) => {
			const params = new RaycastParams();
			params.IgnoreWater = true;
			params.AddToFilter(GetCharacter(LocalPlayer));
			params.FilterType = Enum.RaycastFilterType.Exclude;
			const result = Workspace.Raycast(
				this.camera.CFrame.Position,
				this.camera.CFrame.LookVector.mul(100),
				params,
			);

			if (result === undefined) return;
			Events.TVWatched.fire(result.Instance, dt);
		});
	}
}

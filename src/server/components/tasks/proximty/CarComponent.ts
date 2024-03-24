import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Car } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";

@Component({
	tag: "Car",
})
export class CarComponent extends ProximtyTaskComponent<CarModel> implements OnStart {
	public task = Car;

	onStart() {
		this.instance.Lights.SpotLight.Enabled = false;
		this.instance.Windows.Color = Color3.fromRGB(17, 17, 17);
		this.onInit();
		this.OnTriggeredSignal.Connect(() => {
			this.instance.Lights.SpotLight.Enabled = true;
			this.instance.Windows.Color = Color3.fromRGB(150, 150, 150);
		});
	}
}

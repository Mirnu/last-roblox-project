import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { PetBowl } from "shared/config/task-config";

const offset = new Vector3(-0.06, 0.245, -0.115);

@Component({
	tag: "PetBowl",
})
export class PetBowlComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = PetBowl;
	onStart() {
		this.OnTriggeredSignal.Connect(() => this.createFood());
		super.onInit();
	}

	private createFood() {
		const food = new Instance("Part");
		food.Anchored = true;
		food.Color = Color3.fromRGB(165, 146, 96);
		food.Size = new Vector3(1.83, 0.637, 1.865);
		food.CFrame = new CFrame(this.instance.GetPivot().Position.add(offset));
		food.Material = Enum.Material.Plastic;
		food.Parent = this.instance;
	}
}

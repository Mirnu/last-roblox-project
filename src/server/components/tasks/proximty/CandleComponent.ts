import { OnStart } from "@flamework/core";
import { Component } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Candle } from "shared/config/task-config";

@Component({
	tag: "Candle",
})
export class CandleComponent extends ProximtyTaskComponent<Candle> implements OnStart {
	public task = Candle;
	onStart() {
		this.turnLights(false);
		this.OnTaskEndedSignal.Connect(() => this.turnLights(true));
		this.onInit();
	}

	private turnLights(state: boolean) {
		(this.instance.Effects.GetChildren() as unknown as Light[]).forEach((effect) => {
			effect.Enabled = state;
		});
	}
}

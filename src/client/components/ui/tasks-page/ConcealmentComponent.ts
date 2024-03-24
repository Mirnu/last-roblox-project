import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Events } from "client/network";
import { TweenService } from "@rbxts/services";

interface Attributes {}

@Component({})
export class ConcealmentComponent extends BaseComponent<Attributes, ConcealmentUI> implements OnStart {
	private maxTransparency = 1;

	onStart() {
		Events.MakeDarken.connect((time, difference) => {
			if (time > 0) {
				this.makeTransparency(0);
				task.wait(time);
				this.makeTransparency(this.maxTransparency);
			} else if (difference !== undefined) {
				const transparancy = 1 + difference;
				this.maxTransparency = transparancy;
				this.makeTransparency(transparancy);
			}
		});
	}

	private makeTransparency(transparancy: number) {
		const ts = TweenService.Create(this.instance.Frame, new TweenInfo(0.2), {
			BackgroundTransparency: transparancy,
		});
		ts.Play();
	}
}

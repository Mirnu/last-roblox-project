import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Events } from "client/network";

interface Attributes {}

@Component({})
export class TimeComponent extends BaseComponent<Attributes, GameTimeUI> implements OnStart {
	onStart() {
		Events.TimeUpdated.connect((time) => this.renderTime(time));
	}

	private renderTime(time: number) {
		if (time < 0) {
			this.instance.TimeLabel.Text = `11:${60 + time}`;
			return;
		}

		const hours = time / 60 < 1 ? 0 : math.floor(time / 60);
		const minutes = time - 60 * hours;
		this.instance.TimeLabel.Text = minutes > 9 ? `0${hours}:${minutes}` : `0${hours}:0${minutes}`;
	}
}

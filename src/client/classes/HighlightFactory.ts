import { Events } from "client/network";

export class HighlightFactory {
	public Init() {
		Events.HighlightInstance.connect((instance, state) => {
			instance.Highlight.Enabled = state;
		});
	}
}

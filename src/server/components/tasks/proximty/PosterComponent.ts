import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Poster } from "shared/config/task-config";
import { Players } from "@rbxts/services";

@Component({
	tag: "Poster",
})
export class PosterComponent extends ProximtyTaskComponent<Poster> implements OnStart {
	public task = Poster;

	onStart() {
		this.OnTaskStartedSignal.Connect(() => this.setRandomImage());
		this.OnTriggeredSignal.Connect(() => this.instance.Destroy());
		super.onInit();
	}

	private setRandomImage() {
		const players = Players.GetChildren();
		const player = players[math.random(0, players.size())] as Player;
		if (player === undefined) return;
		const thumbType = Enum.ThumbnailType.AvatarBust;
		const thumbSize = Enum.ThumbnailSize.Size420x420;
		const [content, isReady] = Players.GetUserThumbnailAsync(player.UserId, thumbType, thumbSize);
		this.instance.Poster.PosterPart.PlayerImage.Texture = content;
	}
}

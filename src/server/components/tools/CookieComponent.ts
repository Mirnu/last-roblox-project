import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { store } from "server/store";
import { BadgeService, Players } from "@rbxts/services";
import { CookieBadge } from "shared/config/badge-config";

interface Attributes {}

@Component({})
export class CookieComponent extends BaseComponent<Attributes, Tool> implements OnStart {
	onStart() {
		this.instance.Activated.Connect(() => this.toolActivated());
	}

	private toolActivated() {
		const character = this.instance.FindFirstAncestorOfClass("Model");
		const player = Players.GetPlayerFromCharacter(character);
		if (player === undefined) return;
		this.acceleratePlayer(character as Character);
		store.addThirst(player.UserId, 50);
		BadgeService.AwardBadge(player.UserId, CookieBadge);
		this.instance.Destroy();
	}

	private acceleratePlayer(character: Character) {
		character.Humanoid.WalkSpeed *= 1.5;
		task.delay(5, () => {
			character.Humanoid.WalkSpeed /= 1.5;
		});
	}
}

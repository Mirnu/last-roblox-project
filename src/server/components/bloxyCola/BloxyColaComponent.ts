import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { store } from "server/store";
import { selectAmountCokeById } from "shared/store/players/player-selector";
import { GetCharacter } from "shared/utils/player-utils";
import { BadgeService } from "@rbxts/services";
import { BloxyColaBadge } from "shared/config/badge-config";

interface Attributes {}

@Component({
	tag: "BloxyCola",
})
export class BloxyColaComponent extends BaseComponent<Attributes, BloxyColaBox> implements OnStart {
	onStart() {
		this.instance.Box.ProximityPrompt.Triggered.Connect((player) => this.getCola(player));
	}

	private getCola(player: Player) {
		store.addThirst(player.UserId, 100);
		store.addCoke(player.UserId);
		this.checkOnAmountCoke(player);
		this.removeCola();
	}

	private checkOnAmountCoke(player: Player) {
		const amountCoke = store.getState(selectAmountCokeById(player.UserId))!;
		assert(amountCoke, "Coke in undefined");
		if (amountCoke >= 10) {
			const character = GetCharacter(player);
			character.Humanoid.Health = 0;
			BadgeService.AwardBadge(player.UserId, BloxyColaBadge);
		}
	}

	private removeCola() {
		const colaInFloor2 = this.instance.Floor2.GetChildren();
		const colaInFloor1 = this.instance.Floor1.GetChildren();
		colaInFloor2.size() > 0
			? colaInFloor2.shift()?.Destroy()
			: colaInFloor1.size() > 1 && colaInFloor1.shift()?.Destroy();
	}
}

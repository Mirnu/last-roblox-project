import { OnStart } from "@flamework/core";
import { Component, Components } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Jar } from "shared/config/task-config";
import { Players } from "@rbxts/services";
import { assets } from "shared/assets/assets";
import { CookieComponent } from "server/components/tools/CookieComponent";

@Component({
	tag: "Jar",
})
export class JarComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	constructor(private components: Components) {
		super();
	}
	public task = Jar;
	onStart() {
		this.OnTriggeredSignal.Connect((taskEntity) =>
			this.addPlayerCookie(Players.GetPlayerByUserId(taskEntity.player)!),
		);
		super.onInit();
	}

	private addPlayerCookie(player: Player) {
		const cookie = this.createCookie();
		cookie.Parent = player.Backpack;
	}

	private createCookie() {
		const cookie = assets.tasks.Cookie.Cookie.Clone();
		this.components.addComponent<CookieComponent>(cookie);
		return cookie;
	}
}

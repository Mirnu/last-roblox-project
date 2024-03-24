import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { MailBox } from "shared/config/task-config";
import { BadgeService, Players } from "@rbxts/services";
import { assets } from "shared/assets/assets";
import { MailBadge } from "shared/config/badge-config";
import { TryLuck } from "shared/utils/player-utils";

const chance = 5;

@Component({
	tag: "MailBox",
})
export class MailBoxComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = MailBox;
	onStart() {
		this.OnTriggeredSignal.Connect((taskEntity) => {
			this.addPlayerMail(Players.GetPlayerByUserId(taskEntity.player)!);
		});
		super.onInit();
	}

	private addPlayerMail(player: Player) {
		if (!TryLuck(chance)) return;
		const mail = assets.tasks.Mail.Mail.Clone();
		mail.Parent = player.Backpack;
		BadgeService.AwardBadge(player.UserId, MailBadge);
		this.playSound("rbxassetid://133120210", false);
	}
}

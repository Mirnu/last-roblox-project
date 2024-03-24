import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { PlayerService } from "server/services/PlayerService";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { Nap } from "shared/config/task-config";
import { Events } from "server/network";
import { BadgeService, Players } from "@rbxts/services";
import { NapBadge } from "shared/config/badge-config";

@Component({
	tag: "NapBed",
})
export class NapComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	constructor(private playerService: PlayerService) {
		super();
	}

	public task = Nap;

	onStart() {
		this.onInit();
		this.OnTriggeredSignal.Connect((taskEntity: TaskEntity) => {
			const player = Players.GetPlayerByUserId(taskEntity.player)!;
			Events.MakeDarken.fire(player, 1);
			task.wait(1);
			this.playerService.Nights.ChangeTime(60);
			BadgeService.AwardBadge(player.UserId, NapBadge);
		});
	}
}

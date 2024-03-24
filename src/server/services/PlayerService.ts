import { Components } from "@flamework/components";
import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Nights } from "server/classes/nights/nights";
import { TaskFactoryComponent } from "server/components/factories/TaskFactoryComponent";
import { BaseTask } from "server/components/tasks/abstract/BaseTaskComponent";
import { ThirstComponent } from "server/components/thirst/ThirstComponent";
import { store } from "server/store";
import { NightSignals, TaskSignals } from "shared/classes/containers/signal-container";

@Service({})
export class PlayerService implements OnStart {
	constructor(public components: Components) {}

	public Nights = new Nights();
	public WorkingPlayers: Player[] = [];
	public AllTasks: BaseTask[] = [];

	onStart() {
		Players.PlayerAdded.Connect((player) => {
			this.WorkingPlayers.push(player);
			store.addPlayer(player.UserId, { thirst: 100, amountCoke: 0 });
			this.components.addComponent<ThirstComponent>(player);
			this.components.addComponent<TaskFactoryComponent>(player);
		});
		this.initClasses();
		this.initTasks();
		TaskSignals.PlayerFailedTask.Connect((player) => {
			this.WorkingPlayers.remove(this.WorkingPlayers.indexOf(player));
		});
	}

	private initTasks() {
		this.AllTasks = this.components.getAllComponents() as BaseTask[];
	}

	private initClasses() {
		this.Nights.StartNight();
	}
}

import { Components } from "@flamework/components";
import { Controller, OnStart, OnInit } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { HighlightFactory } from "client/classes/HighlightFactory";
import { SoundFactory } from "client/classes/SoundFactory";
import { RaycastComponent } from "client/components/character/RaycastComponent";
import { TimeComponent } from "client/components/ui/playing-page/TimeComponent";
import { CompletedTaskComponent } from "client/components/ui/tasks-page/CompletedTaskComponent";
import { ConcealmentComponent } from "client/components/ui/tasks-page/ConcealmentComponent";
import { TaskListComponent } from "client/components/ui/tasks-page/TaskListComponent";
import { LocalPlayer } from "client/utils/player-utils";

@Controller({})
export class PlayerController implements OnStart {
	constructor(private components: Components) {}

	private playerGui = LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

	onStart() {
		this.initedClasses();
		this.initedComponents();
		this.initGui();
	}

	private initedComponents() {
		this.components.addComponent<RaycastComponent>(Workspace.CurrentCamera!);
	}

	private initedClasses() {
		new SoundFactory().Init();
		new HighlightFactory().Init();
	}

	private initGui() {
		const completedTask = this.playerGui.WaitForChild("CompletedTasks", 10) as CompletedTasksUI;
		const concealment = this.playerGui.WaitForChild("Concealment") as ConcealmentUI;
		const gameTime = this.playerGui.WaitForChild("GameTime") as GameTimeUI;
		const tasks = this.playerGui.WaitForChild("Tasks") as TasksUI;
		this.components.addComponent<CompletedTaskComponent>(completedTask);
		this.components.addComponent<ConcealmentComponent>(concealment);
		this.components.addComponent<TimeComponent>(gameTime);
		this.components.addComponent<TaskListComponent>(tasks);
	}
}

import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ProximtyTaskComponent } from "../abstract/ProximtyTaskComponent";
import { Book, Task } from "shared/config/task-config";
import { TaskEntity } from "shared/store/tasks/task-slice";
import { Players } from "@rbxts/services";
import { Events } from "server/network";

interface Attributes {}

@Component({
	tag: "Book",
})
export class BookComponent extends ProximtyTaskComponent<TaskModel> implements OnStart {
	public task = Book;

	onStart() {
		this.onInit();
		this.OnTriggeredSignal.Connect((taskEntity: TaskEntity) => {
			Events.MakeDarken(Players.GetPlayerByUserId(taskEntity.player)!, 2);
		});
	}
}

import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { store } from "server/store";
import { selectThirstById } from "shared/store/players/player-selector";
import { GetCharacter } from "shared/utils/player-utils";
import { cancelThread } from "shared/utils/thread-utils";

interface Attributes {}

@Component({})
export class ThirstComponent extends BaseComponent<Attributes, Player> implements OnStart {
	private thread!: thread;

	onStart() {}

	public Start() {
		this.thread = task.spawn(() => {
			while (task.wait(1)) {
				store.addThirst(this.instance.UserId, -1);
				const thirst = store.getState(selectThirstById(this.instance.UserId));
				thirst === 0 && this.takeHP(this.instance);
			}
		});
	}

	private takeHP(player: Player) {
		const character = GetCharacter(player);
		const currentHealth = math.max(0, character.Humanoid.Health - 20);
		character.Humanoid.MaxHealth = currentHealth;
		character.Humanoid.Health = currentHealth;
	}

	public Stop() {
		cancelThread(this.thread);
	}
}

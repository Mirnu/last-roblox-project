import { Events } from "server/network";
import { NightSignals } from "shared/classes/containers/signal-container";

export const timeSpeed = 1;

export class Nights {
	public Time = -3;

	public StartNight() {
		task.spawn(() => {
			while (this.Time < 360) {
				this.Time === 0 && NightSignals.GameStartedSignal.Fire();
				NightSignals.TimeUpdatedSignal.Fire(this.Time);
				Events.TimeUpdated.broadcast(this.Time);

				this.Time += 1;
				task.wait(1 / timeSpeed);
			}
		});
	}

	public ChangeTime(time: number) {
		this.Time += time;
		NightSignals.TimeUpdatedSignal.Fire(this.Time);
		Events.TimeUpdated.broadcast(this.Time);
	}
}

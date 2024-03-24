interface CompletedTasksUI extends ScreenGui {
	PlayerCompletedTask: TextLabel & {
		UIStroke: UIStroke;
	};
}

interface ConcealmentUI extends ScreenGui {
	Frame: Frame;
}

interface TasksUI extends ScreenGui {
	Frame: Frame;
}

interface GameTimeUI extends ScreenGui {
	TimeLabel: TextLabel & {
		UITextSizeConstraint: UITextSizeConstraint;
		UIStroke: UIStroke;
		UIAspectRatioConstraint: UIAspectRatioConstraint;
	};
}

interface TaskTemplate extends Frame {
	TaskTemplate: TextLabel;
	Time: TextLabel;
}

interface PlayerGui extends Instance {
	Tasks: TasksUI;
	CompletedTasks: CompletedTasksUI;
	Concealment: ConcealmentUI;
	GameTime: GameTimeUI;
}

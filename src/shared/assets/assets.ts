import { ReplicatedStorage } from "@rbxts/services";

const folder = ReplicatedStorage.WaitForChild("Assets") as ReplicatedStorage["Assets"];

export const assets = {
	tasks: folder.WaitForChild("tasks") && {
		bed: folder.tasks.WaitForChild("bed") && {
			MakedBed: folder.tasks.bed.WaitForChild("MakedBed"),
		},
		vase: folder.tasks.WaitForChild("vase") && {
			TableVase: folder.tasks.vase.WaitForChild("TableVase"),
		},
		PaperPlane: folder.tasks.WaitForChild("PaperPlane") && {
			PaperPlane: folder.tasks.PaperPlane.WaitForChild("PaperPlane"),
		},
		Cookie: folder.tasks.WaitForChild("Cookie") && {
			Cookie: folder.tasks.Cookie.WaitForChild("Cookie"),
		},
		Mail: folder.tasks.WaitForChild("Mail") && {
			Mail: folder.tasks.Mail.WaitForChild("Mail"),
		},
	},
	ui: folder.WaitForChild("ui") && {
		TaskTemplate: folder.ui.WaitForChild("TaskTemplate"),
	},
} as ReplicatedStorage["Assets"];

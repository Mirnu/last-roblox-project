interface ReplicatedStorage extends Instance {
	Assets: Folder & {
		tasks: Folder & {
			bed: Folder & {
				MakedBed: Model;
			};
			vase: Folder & {
				TableVase: Model;
			};
			PaperPlane: Folder & {
				PaperPlane: MeshPart;
			};
			Cookie: Folder & {
				Cookie: Tool;
			};
			Mail: Folder & {
				Mail: Tool;
			};
		};
		ui: Folder & {
			TaskTemplate: TaskTemplate;
		};
	};
}

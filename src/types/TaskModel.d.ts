interface HighlightModel extends Model {
	Highlight: Highlight;
}

interface WatchableModel extends HighlightModel {
	BillboardGui: BillboardGui & {
		Frame: Frame & {
			Label: TextLabel;
		};
	};
	Box: BasePart;
}

interface BoxModel extends HighlightModel {
	Box: BasePart;
}

interface TaskModel extends HighlightModel {
	Box: BasePart & {
		ProximityPrompt: ProximityPrompt;
	};
}

interface ParticleModel extends TaskModel {
	ParticlePart: BasePart & {
		ParticleEmitter: ParticleEmitter;
	};
}

interface CarModel extends TaskModel {
	Lights: MeshPart & {
		SpotLight: SpotLight;
	};
	Windows: MeshPart;
}

interface Candle extends TaskModel {
	Effects: UnionOperation;
}

interface Fan extends TaskModel {
	Blades: BasePart;
}

interface Window extends TaskModel {
	Working: BasePart;
}

interface Poster extends TaskModel {
	Poster: Part & {
		PosterPart: Part & {
			Chain: Weld;
			PlayerImage: Decal;
		};
		MissingPoster: Decal;
	};
}

interface BloxyColaBox extends Model {
	Floor2: Model;
	Floor1: Model;
	Highlight: Highlight;
	Box: BasePart & {
		ProximityPrompt: ProximityPrompt;
	};
}

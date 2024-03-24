export function GetCharacter(player: Player) {
	return (player.Character ?? player.CharacterAdded.Wait()[0]) as Character;
}

export function TryLuck(chance: number) {
	return math.random(1, 100) <= chance;
}

import Player from "./player";

test("player has a gameboard", () => {
    const player = new Player("real");
    expect(player.gameboard).toBeDefined();
});

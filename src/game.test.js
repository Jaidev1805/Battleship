import { Game } from "./game";

test("game initializes correctly", () => {
    const game = new Game();
    expect(game.player).toBeDefined();
    expect(game.computer).toBeDefined();
});

test("player attack switches turn", () => {
    const game = new Game();
    game.playerAttack(5,5);
    expect(game.currentTurn).toBe("computer");
});

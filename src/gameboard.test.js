import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("places ship on board", () => {
    const board = new Gameboard();
    const ship = new Ship(2);

    board.placeShip(ship, [[0,0], [0,1]]);

    expect(board.board["0,0"]).toBe(ship);
    expect(board.board["0,1"]).toBe(ship);
});

test("attack hits ship", () => {
    const board = new Gameboard();
    const ship = new Ship(1);

    board.placeShip(ship, [[1,1]]);
    board.receiveAttack(1,1);

    expect(ship.hits).toBe(1);
});

test("attack misses ship", () => {
    const board = new Gameboard();
    board.receiveAttack(2,2);

    expect(board.missedAttacks).toContainEqual([2,2]);
});

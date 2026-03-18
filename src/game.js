import Player from "./player";
import { Ship } from "./ship";

class Game {
    static SHIP_SIZES = [5, 4, 3, 3, 2];

    constructor() {
        this.player = new Player("real");
        this.computer = new Player("computer");
        this.currentTurn = "player";

        this.setupBoards();
    }

    setupBoards() {
        for (let size of Game.SHIP_SIZES) {
            this.placeShipRandomly(this.computer.gameboard, size);
        }
    }

    placeShipRandomly(gameboard, length) {
        let placed = false;

        while (!placed) {
            const horizontal = Math.random() < 0.5;

            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);

            const coords = [];

            if (horizontal) {
                if (y + length > 10) continue;
                for (let i = 0; i < length; i++) coords.push([x, y + i]);
            } else {
                if (x + length > 10) continue;
                for (let i = 0; i < length; i++) coords.push([x + i, y]);
            }

            // check overlap
            let overlap = false;
            for (let c of coords) {
                const key = `${c[0]},${c[1]}`;
                if (gameboard.board[key]) {
                    overlap = true;
                    break;
                }
            }

            if (overlap) continue;

            placed = gameboard.placeShip(new Ship(length), coords);
        }
    }

    reset() {
        this.player = new Player("real");
        this.computer = new Player("computer");
        this.currentTurn = "player";
        // place computer ships again
        this.setupBoards();
    }

    playerAttack(x, y) {
        if (this.currentTurn !== "player") return;

        const result = this.computer.gameboard.receiveAttack(x, y);

        if (this.computer.gameboard.allShipsSunk()) {
            return "PLAYER_WINS";
        }

        if (result === "miss") {
            this.currentTurn = "computer";
        } else if (result === "hit") {
            // keep player's turn until miss
            this.currentTurn = "player";
        }

        return result;
    }

    computerAttack() {
    if (this.currentTurn !== "computer") return;

    const result = this.computer.randomAttack(this.player.gameboard);

    if (this.player.gameboard.allShipsSunk()) {
        return "COMPUTER_WINS";
    }

    if (result === "miss") {
        this.currentTurn = "player";
    } else if (result === "hit") {
        this.currentTurn = "computer"; // keep computer's turn until miss
    }

    return result;
    }
}

export { Game };
export default Game;
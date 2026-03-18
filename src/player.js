import { Gameboard } from "./gameboard";

class Player {
    constructor(type = "real") {
        this.type = type;
        this.gameboard = new Gameboard();
        this.attacksMade = new Set();
    }

    randomAttack(enemyBoard) {
        if (this.type !== "computer") return;

        let x, y, key;

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            key = `${x},${y}`;
        } while (this.attacksMade.has(key));

        this.attacksMade.add(key);
        return enemyBoard.receiveAttack(x, y);
    }
}

export default Player;

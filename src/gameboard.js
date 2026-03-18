class Gameboard{
    constructor(){
        this.ships = [];
        this.missedAttacks = [];
        this.board = {};
        this.hitCoordinates = [];
    }

    placeShip(ship, coordinates) {
      if (!Array.isArray(coordinates) || coordinates.length !== ship.length) return false;

      for (let coord of coordinates) {
        const [x, y] = coord;
        if (x < 0 || x > 9 || y < 0 || y > 9) return false;
        const key = `${x},${y}`;
        if (this.board[key]) return false;
      }

      this.ships.push(ship);
      for (let coord of coordinates) {
        const key = `${coord[0]},${coord[1]}`;
        this.board[key] = ship;
      }

      return true;
    }

    receiveAttack(x, y) {
        const key = `${x},${y}`;

        if (this.missedAttacks.some(c => c[0] === x && c[1] === y) || this.hitCoordinates.some(c => c[0] === x && c[1] === y)) {
          return "repeat";
        }
    
        if (this.board[key]) {
          this.board[key].hit();
          this.hitCoordinates.push([x, y]);
          return "hit";
        } else {
          this.missedAttacks.push([x, y]);
          return "miss";
        }
    }       

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}

export { Gameboard };
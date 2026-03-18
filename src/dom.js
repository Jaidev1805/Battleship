function renderBoard(boardElement, gameboard, showShips = false, onCellClick = null) {
  boardElement.innerHTML = "";

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const key = `${x},${y}`;
      const isHit = gameboard.hitCoordinates && gameboard.hitCoordinates.some(c => c[0] === x && c[1] === y);
      const isMiss = gameboard.missedAttacks.some(c => c[0] === x && c[1] === y);
      const hasShip = showShips && gameboard.board[key];

      // Hit takes priority over ship
      if (isHit) {
        cell.classList.add("hit");
      } else if (isMiss) {
        cell.classList.add("miss");
      } else if (hasShip) {
        cell.classList.add("ship");
      }

      if (onCellClick) {
        cell.addEventListener("click", () => onCellClick(x, y));
      }

      boardElement.appendChild(cell);
    }
  }
}

export { renderBoard };
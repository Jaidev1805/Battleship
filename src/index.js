import "./styles.css";
import Game from "./game";
import { renderBoard } from "./dom";
import { Ship } from "./ship";

const game = new Game();

const playerBoardDiv = document.getElementById("player-board");
const computerBoardDiv = document.getElementById("computer-board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const rotateBtn = document.getElementById("rotate");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalCloseBtn = document.getElementById("modal-close");

// Placement state
const shipSizes = Game.SHIP_SIZES;
let placing = true;
let currentShipIndex = 0;
let orientation = "horizontal"; // or 'vertical'

function updateUI() {
    renderBoard(playerBoardDiv, game.player.gameboard, true, placing ? placePlayerShip : null);
    renderBoard(
        computerBoardDiv,
        game.computer.gameboard,
        false,
        placing ? null : handlePlayerAttack
    );
    updateStatus();
    console.log("Rendering boards...");
}

function updateStatus() {
    if (placing) {
        status.textContent = `Place ship length ${shipSizes[currentShipIndex]} (${orientation}) — press R (or) Rotate Button to rotate`;
    } else {
        if (game.currentTurn === "player") {
            status.textContent = `Your turn.`;
        } else {
            status.textContent = `Computer's turn...`;
        }
    }
}

function handlePlayerAttack(x, y) {
    const result = game.playerAttack(x, y);
    if (!result || result === "repeat") return;

    updateUI();

    if (result === "PLAYER_WINS") {
        showModal("You Win!", "Congratulations! You have sunk all the computer's ships!");
        return;
    }

    if (result === "miss") {
        runComputerTurn();
    }
}

function runComputerTurn() {
    setTimeout(() => {
        const compResult = game.computerAttack();
        updateUI();

        if (compResult === "COMPUTER_WINS") {
            showModal("Game Over", "The computer has sunk all your ships. Better luck next time!");
            return;
        }

        if (compResult === "hit") {
            runComputerTurn();
        }
    }, 500);
}

function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "flex";
}

function placePlayerShip(x, y) {
    if (!placing) return;

    const length = shipSizes[currentShipIndex];
    const coords = [];

    if (orientation === "horizontal") {
        if (y + length > 10) return; // out of bounds
        for (let i = 0; i < length; i++) coords.push([x, y + i]);
    } else {
        if (x + length > 10) return; // out of bounds
        for (let i = 0; i < length; i++) coords.push([x + i, y]);
    }

    const placed = game.player.gameboard.placeShip(new Ship(length), coords);
    if (!placed) return; // invalid placement (overlap)

    currentShipIndex++;
    if (currentShipIndex >= shipSizes.length) {
        placing = false;
        // start the game: ensure it's player's turn
        game.currentTurn = "player";
    }

    updateUI();
}

window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r" && placing) {
        orientation = orientation === "horizontal" ? "vertical" : "horizontal";
        updateStatus();
    }
});

rotateBtn.addEventListener("click", () => {
    if (!placing) return;
    orientation = orientation === "horizontal" ? "vertical" : "horizontal";
    updateStatus();
});

// Modal close handler
modalCloseBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

updateUI();

restartBtn.addEventListener("click", () => {
    game.reset();
    placing = true;
    currentShipIndex = 0;
    orientation = "horizontal";
    updateUI();
});

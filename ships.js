const board = document.getElementById("board");
const cells = document.querySelectorAll(".numbers > td > div");
const message = document.getElementById("message");
const messageAdditional = document.getElementById("message-additional");
const messageSunken = document.getElementById("message-sunken");
const shipCounts = [4, 3, 2, 1];
const shipLengths = [1, 2, 3, 4];
const shipData = [];

let shots = 0;
let hits = 0;

function isValidCell(cellIndex, existingShips, shipLength, direction) {
  if (cellIndex < 0 || cellIndex >= 100) {
    return false;
  }

  if (existingShips.some((ship) => ship.includes(cellIndex))) {
    return false;
  }

  const adjacentCells = Array.from(
    { length: shipLength },
    (_, i) => cellIndex + i * direction
  );
  if (
    existingShips.some((ship) =>
      ship.some((cell) => adjacentCells.includes(cell))
    )
  ) {
    return false;
  }

  return true;
}

function generateShips() {
  shipData.length = 0;
  for (let i = 0; i < shipCounts.length; i++) {
    const shipArray = [];
    const shipCount = shipCounts[i];
    const shipLength = shipLengths[i];

    for (let j = 0; j < shipCount; j++) {
      const ship = [];
      let startCell, direction;

      if (Math.random() < 0.5) {
        startCell = Math.floor(Math.random() * (100 - shipLength * 10));
        direction = 10;
      } else {
        startCell = Math.floor(Math.random() * (100 - shipLength));
        direction = 1;
      }

      for (let k = 0; k < shipLength; k++) {
        const cellIndex = startCell + k * direction;
        ship.push(cellIndex);
      }

      if (
        shipData.some((existingShip) =>
          existingShip.some((cell) => ship.includes(cell))
        )
      ) {
        j--;
      } else {
        shipArray.push(ship);
        shipData.push(...shipArray);
      }
    }
  }
}

function handleShot(cellIndex) {
  shots++;
  const cell = cells[cellIndex];
  cell.removeEventListener("click", handleShot);

  let hit = false;
  for (const ship of shipData) {
    if (ship.includes(cellIndex)) {
      hit = true;
      hits++;
      ship.splice(ship.indexOf(cellIndex), 1);

      if (ship.length === 0) {
        message.textContent = "Hit!";
        setTimeout(() => {
          message.textContent = "Shoot the ships!";
        }, 2000);

        messageSunken.textContent = "You sunk a ship!";
        setTimeout(() => {
          messageSunken.textContent = "";
        }, 1400);

        document.body.style.pointerEvents = "none";
        setTimeout(() => {
          document.body.style.pointerEvents = "all";
        }, 500);
      } else {
        message.textContent = "Hit!";
      }
      cell.classList.add("hit");
      break;
    }
  }

  if (!hit) {
    message.textContent = "Miss!";
    cell.classList.add("miss");
  }
  messageAdditional.innerHTML = `Shots: ${shots} <br> Sunken: ${hits}/20`;

  if (hits === 20) {
    message.innerHTML = `Victory! <br> Congratulations! <br>Amount of shots: ${shots}`;
    board.style.pointerEvents = "none";
    window.scrollTo(0, 0);
    window.alert("Victory! Congratulations!");
    cells.forEach((cell) => cell.removeEventListener("click", handleShot));
  }
}

function initGame() {
  message.textContent = "Shoot the ships!";
  shots = 0;
  hits = 0;
  shipData.length = 0;
  generateShips();
  cells.forEach((cell, index) => {
    cell.classList.remove("hit", "miss");
    cell.addEventListener("click", () => handleShot(index));
  });
}

window.addEventListener("load", initGame);

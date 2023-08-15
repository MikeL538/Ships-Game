const board = document.getElementById("board");
const cells = document.querySelectorAll(".numbers > td > div");
const message = document.getElementById("message");
const messageAdditional = document.getElementById("message-additional");
const messageSunken = document.getElementById("message-sunken");
const oneShipCount = 4; // Liczba statków
const twoShipCount = 3;
const threeShipCount = 2;
const fourShipCount = 1;
const oneShipLength = 1; // Długość statków
const twoShipLength = 2;
const threeShipLength = 3;
const fourShipLength = 4;
let oneShips = []; // Tablica przechowująca położenie statków
let twoShips = [];
let threeShips = [];
let fourShips = [];
let ships = [];
let shots = 0; // Licznik strzałów
let hits = 0; // Licznik trafionych pól

// Funkcja sprawdzająca umiejscowienie statków i zostawienie 1 kratki wolnej
function isValidCell(cellIndex, existingShips, shipLength, direction) {
  // Czy komórka jest na planszy
  if (cellIndex < 0 || cellIndex >= 100) {
    return false;
  }

  // Sprawdzenie czy komórka jest okupowana
  for (const existingShip of existingShips) {
    if (existingShip.includes(cellIndex)) {
      return false;
    }
  }

  // Sprawdzenie kierunku
  const adjacentCells = [];
  for (let i = 0; i < shipLength; i++) {
    adjacentCells.push(cellIndex + i * direction);
  }
  for (const existingShip of existingShips) {
    for (const cell of adjacentCells) {
      if (existingShip.includes(cell)) {
        return false;
      }
    }
  }

  return true;
}

// Losowe rozmieszczenie statków na planszy
function generateOneShips() {
  oneShips = [];
  for (let i = 0; i < oneShipCount; i++) {
    const ship = [];
    let startCell;
    let direction;

    // Losowy wybór kierunku (pionowy lub poziomy)
    if (Math.random() < 0.5) {
      // Pionowy
      startCell = Math.floor(Math.random() * (100 - oneShipLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - oneShipLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < oneShipLength; j++) {
      ship.push(startCell + j * direction);
    }

    // Sprawdzanie kolizji z istniejącymi statkami
    let overlap = false;
    for (const existingShip of ships) {
      for (const cell of ship) {
        if (existingShip.includes(cell)) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }

    // Jeśli jest kolizja, powtórzenie losowania
    if (overlap) {
      i--;
    } else {
      oneShips.push(ship);
    }
    ships.push(...oneShips);
  }
}

function generateTwoShips() {
  twoShips = [];
  for (let i = 0; i < twoShipCount; i++) {
    const ship = [];
    let startCell;
    let direction;

    // Losowy wybór kierunku (pionowy lub poziomy)
    if (Math.random() < 0.5) {
      // Pionowy
      startCell = Math.floor(Math.random() * (100 - twoShipLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - twoShipLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < twoShipLength; j++) {
      ship.push(startCell + j * direction);
    }

    // Sprawdzanie kolizji z istniejącymi statkami
    let overlap = false;
    for (const existingShip of ships) {
      for (const cell of ship) {
        if (existingShip.includes(cell)) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }

    // Jeśli jest kolizja, powtórzenie losowania
    if (overlap) {
      i--;
    } else {
      twoShips.push(ship);
    }
    ships.push(...twoShips);
  }
}

function generateThreeShips() {
  threeShips = [];
  for (let i = 0; i < threeShipCount; i++) {
    const ship = [];
    let startCell;
    let direction;

    // Losowy wybór kierunku (pionowy lub poziomy)
    if (Math.random() < 0.5) {
      // Pionowy
      startCell = Math.floor(Math.random() * (100 - threeShipLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - threeShipLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < threeShipLength; j++) {
      ship.push(startCell + j * direction);
    }

    // Sprawdzanie kolizji z istniejącymi statkami
    let overlap = false;
    for (const existingShip of ships) {
      for (const cell of ship) {
        if (existingShip.includes(cell)) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }

    // Jeśli jest kolizja, powtórzenie losowania
    if (overlap) {
      i--;
    } else {
      threeShips.push(ship);
    }
    ships.push(...threeShips);
  }
}

function generateFourShips() {
  fourShips = [];
  for (let i = 0; i < fourShipCount; i++) {
    const ship = [];
    let startCell;
    let direction;

    // Losowy wybór kierunku (pionowy lub poziomy)
    if (Math.random() < 0.5) {
      // Pionowy
      startCell = Math.floor(Math.random() * (100 - fourShipLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - fourShipLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < fourShipLength; j++) {
      ship.push(startCell + j * direction);
    }

    // Sprawdzanie kolizji z istniejącymi statkami
    let overlap = false;
    for (const existingShip of ships) {
      for (const cell of ship) {
        if (existingShip.includes(cell)) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }

    // Jeśli jest kolizja, powtórzenie losowania
    if (overlap) {
      i--;
    } else {
      fourShips.push(ship);
    }
    ships.push(...fourShips);
  }
}

function generateShips() {
  generateOneShips();
  generateTwoShips();
  generateThreeShips();
  generateFourShips();
}

// Obsługa strzału
function handleShot(cellIndex) {
  shots++;
  const cell = cells[cellIndex];
  cell.removeEventListener("click", handleShot);

  // Sprawdzanie trafienia
  let hit = false;
  for (const ship of ships) {
    if (ship.includes(cellIndex)) {
      hit = true;
      hits += 1;
      ship.splice(ship.indexOf(cellIndex), 1); // Usunięcie trafionego pola z statku
      if (ship.length === 0) {
        // Statek zatopiony
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
    // Wszystkie statki zatopione, koniec gry
    message.innerHTML = `Victory! <br> Congratulations! <br>Amount of shots: ${shots}`;
    board.style.pointerEvents = "none";
    window.scrollTo(0, 0);
    window.alert("Victory! Congratulations!");
    cells.forEach((cell) => cell.removeEventListener("click", handleShot));
  }
}

// Inicjalizacja gry
function initGame() {
  message.textContent = "Shoot the ships!";

  shots = 0;
  hits = 0;
  ships = []; // Clear the ships array before generating new ships
  generateShips();
  cells.forEach((cell, index) => {
    cell.classList.remove("hit", "miss");
    cell.addEventListener("click", () => handleShot(index));
  });
}

// Rozpoczęcie gry po załadowaniu strony
window.addEventListener("load", initGame);

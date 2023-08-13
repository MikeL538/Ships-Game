const board = document.getElementById("board");
const cells = document.querySelectorAll(".numbers > td > div");
const message = document.getElementById("message");
const messageAdditional = document.getElementById("message-additional");
const oneShipCount = 4; // Liczba statków 1 kratka
const twoShipCount = 3; // Liczba statków 2 kratki
const threeShipCount = 2; // Liczba statków 3 kratki
const fourShipCount = 1; // Liczba statków 4 kratki
const oneShipLength = 1; // Długość statku 1 kratka
const twoShipLength = 2; // Długość statku 2 kratki
const threeShipLength = 3; // Długość statku 3 kratki
const fourShipLength = 4; // Długość statku 4 kratki
let oneShips = []; // Tablica przechowująca położenie statków
let twoShips = [];
let threeShips = [];
let fourShips = [];
let ships = [];
let shots = 0; // Licznik strzałów
let hits = 0; // Licznik trafionych pól

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
        message.textContent = "You sunk a ship!";
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

// Rozpoczęcie gry po załadowaniu strony
window.addEventListener("load", initGame);

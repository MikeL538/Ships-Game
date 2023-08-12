// Zdefiniowanie planszy
const board = document.getElementById("board");
const cells = document.querySelectorAll(".numbers > td > div");
const message = document.getElementById("message");
const shipCount = 5; // Liczba statków
const shipLength = 3; // Długość każdego statku
let ships = []; // Tablica przechowująca położenie statków
let shots = 0; // Licznik strzałów
let hits = 0; // Licznik trafionych pól

// Losowe rozmieszczenie statków na planszy
function generateShips() {
  ships = [];
  for (let i = 0; i < shipCount; i++) {
    const ship = [];
    let startCell;
    let direction;

    // Losowy wybór kierunku (pionowy lub poziomy)
    if (Math.random() < 0.5) {
      // Pionowy
      startCell = Math.floor(Math.random() * (100 - shipLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - shipLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < shipLength; j++) {
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
      ships.push(ship);
    }
  }
}

// Inicjalizacja gry
function initGame() {
  message.textContent = "Shoot the ships!";

  shots = 0;
  hits = 0;
  generateShips();
  cells.forEach((cell, index) => {
    cell.classList.remove("hit", "miss");
    cell.addEventListener("click", () => handleShot(index));
  });
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
      ship.splice(ship.indexOf(cellIndex), 1); // Usunięcie trafionego pola z statku
      if (ship.length === 0) {
        // Statek zatopiony
        hits += shipLength;
        if (hits === shipCount * shipLength) {
          // Wszystkie statki zatopione, koniec gry
          message.textContent = "Victory!";

          cells.forEach((cell) =>
            cell.removeEventListener("click", handleShot)
          );
        } else {
          message.textContent = "You sunk a ship!";
        }
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
}

// Rozpoczęcie gry po załadowaniu strony
window.addEventListener("load", initGame);

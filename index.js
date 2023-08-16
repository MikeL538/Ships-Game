const board = document.getElementById("board");
const cells = document.querySelectorAll(".numbers > td > div");
const message = document.getElementById("message");
const messageAdditional = document.getElementById("message-additional");
const messageSunken = document.getElementById("message-sunken"); // Ship sunken
const oneShipCount = 4; // Liczba statków
const twoShipsCount = 3;
const threeShipsCount = 2;
const fourShipsCount = 1;
const oneShipsLength = 1; // Długość statków
const twoShipsLength = 2;
const threeShipsLength = 3;
const fourShipsLength = 4;
let oneShips = []; // Tablica przechowująca położenie statków
let twoShips = [];
let threeShips = [];
let fourShips = [];
let allShips = [];

let oneShipsHit = 0; // Liczba trafień statków
let twoShipsHit = 0;
let threeShipsHit = 0;
let fourShipsHit = 0;

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
      startCell = Math.floor(Math.random() * (100 - oneShipsLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - oneShipsLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < oneShipsLength; j++) {
      ship.push(startCell + j * direction);
    }

    // Sprawdzanie kolizji z istniejącymi statkami
    let overlap = false;
    for (const existingShip of allShips) {
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
      oneShipsHit += 1;
    }
    allShips.push(...oneShips);
  }
}

function generateTwoShips() {
  twoShips = [];
  for (let i = 0; i < twoShipsCount; i++) {
    const ship = [];
    let startCell;
    let direction;

    // Losowy wybór kierunku (pionowy lub poziomy)
    if (Math.random() < 0.5) {
      // Pionowy
      startCell = Math.floor(Math.random() * (100 - twoShipsLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - twoShipsLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < twoShipsLength; j++) {
      ship.push(startCell + j * direction);
    }

    // Sprawdzanie kolizji z istniejącymi statkami
    let overlap = false;
    for (const existingShip of allShips) {
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
      twoShipsHit += 1;
      twoShipsHitParse = twoShipsHit;
    }
    allShips.push(...twoShips);
  }
}

function generateThreeShips() {
  threeShips = [];
  for (let i = 0; i < threeShipsCount; i++) {
    const ship = [];
    let startCell;
    let direction;

    // Losowy wybór kierunku (pionowy lub poziomy)
    if (Math.random() < 0.5) {
      // Pionowy
      startCell = Math.floor(Math.random() * (100 - threeShipsLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - threeShipsLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < threeShipsLength; j++) {
      ship.push(startCell + j * direction);
    }

    // Sprawdzanie kolizji z istniejącymi statkami
    let overlap = false;
    for (const existingShip of allShips) {
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
      threeShipsHit += 1;
      threeShipsHitParse = threeShipsHit;
    }
    allShips.push(...threeShips);
  }
}

function generateFourShips() {
  fourShips = [];
  for (let i = 0; i < fourShipsCount; i++) {
    const ship = [];
    let startCell;
    let direction;

    // Losowy wybór kierunku (pionowy lub poziomy)
    if (Math.random() < 0.5) {
      // Pionowy
      startCell = Math.floor(Math.random() * (100 - fourShipsLength * 10));
      direction = 10;
    } else {
      // Poziomy
      startCell = Math.floor(Math.random() * (100 - fourShipsLength));
      direction = 1;
    }

    // Dodawanie pól statku na planszę
    for (let j = 0; j < fourShipsLength; j++) {
      ship.push(startCell + j * direction);
    }

    // Sprawdzanie kolizji z istniejącymi statkami
    let overlap = false;
    for (const existingShip of allShips) {
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
      fourShipsHit += 1;
      fourShipsHitParse = fourShipsHit;
    }
    allShips.push(...fourShips);
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
  for (const ship of allShips) {
    if (ship.includes(cellIndex)) {
      hit = true;
      hits += 1;

      // Licznik zatopionych statków
      if (oneShips.includes(ship)) {
        oneShipsHit -= 1;
        console.log("1ship " + oneShipsHit);
      }

      if (twoShips.includes(ship)) {
        twoShipsHit -= 0.49;
        console.log("2ship " + twoShipsHit);
      }

      if (threeShips.includes(ship)) {
        console.log((threeShipsHit -= 0.25));

        if (threeShipsHit === 0.5) {
          threeShipsHit -= 0.5;
        }
        console.log("3ship " + threeShipsHit);
      }

      if (fourShips.includes(ship)) {
        fourShipsHit -= 0.13;
        console.log("4ship " + fourShipsHit);
      }

      ship.splice(ship.indexOf(cellIndex), 1); // Usunięcie trafionego pola z statku

      if (ship.length === 0) {
        // Statek zatopiony
        message.textContent = "Hit!";

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

  // Aktualizacja tabeli pozostałych statków
  messageAdditional.innerHTML = `Shots: ${shots} <br> 
  Sunken: ${hits}/20 <br>  <br> 

  Remaining Ships: <br>
  One square ships: ${oneShipsHit}   <br />
  Two squares ships: ${Math.round(twoShipsHit)}<br />
  Three squares ships: ${Math.round(threeShipsHit)} <br />
  Four squares ship: ${Math.round(fourShipsHit)}`;

  if (hits === 20) {
    // Wszystkie statki zatopione, koniec gry
    message.innerHTML = `Victory! <br> Congratulations! <br> <br>Amount of shots: ${shots}`;
    message.style.top = "50%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.zIndex = "11";
    message.style.color = "rgb(205, 252, 94)";
    message.style.fontSize = "48px";
    message.style.textAlign = "center";
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
  allShips = []; // Clear the ships array before generating new ships
  generateShips();
  cells.forEach((cell, index) => {
    cell.classList.remove("hit", "miss");
    cell.addEventListener("click", () => handleShot(index));
  });
  messageAdditional.innerHTML = `Shots: ${shots} <br> 
  Sunken: ${hits}/20 <br> <br> 

  Remaining Ships: <br>
  One square ships: ${oneShipsHit}   <br />
  Two squares ships: ${twoShipsHit}<br />
  Three squares ships: ${threeShipsHit} <br />
  Four squares ship: ${fourShipsHit}`;
}

// Rozpoczęcie gry po załadowaniu strony
window.addEventListener("load", initGame);

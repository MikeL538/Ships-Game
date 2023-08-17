const mainMenu = document.querySelector(".main-menu");
const newGameButton = document.querySelector(".new-game");
const resetGameButton = document.querySelector(".reset-game");
const newGameButtonVictory = document.querySelector(".new-game--victory");
/////////////////////////////////////////
const board = document.getElementById("board");
const table = document.querySelector("#table");
const cells = document.querySelectorAll(".numbers td div");
const msgContainer = document.querySelector(".message-container");
const msgMain = document.querySelector(".message-container__main"); // Hit/Miss/Victory
const msgAdditional = document.querySelector(".message-container__additional"); // Pozostałe statki
const msgSunken = document.querySelector(".message-container__sunken-pop-up"); // Statek zatopiony info
/////////////////////////////////////////
const oneShipCount = 4; // Liczba statków
const twoShipsCount = 3;
const threeShipsCount = 2;
const fourShipsCount = 1;
const oneShipsLength = 1; // Długość statków
const twoShipsLength = 2;
const threeShipsLength = 3;
const fourShipsLength = 4;
/////////////////////////////////////////
let oneShips = []; // Tablica przechowująca położenie statków
let twoShips = [];
let threeShips = [];
let fourShips = [];
let allShips = [];
/////////////////////////////////////////
let oneShipsHit = 0; // Liczba trafień statków
let twoShipsHit = 0;
let threeShipsHit = 0;
let fourShipsHit = 0;
/////////////////////////////////////////
let shots = 0; // Licznik ogólnych strzałów
let hits = 0; // Licznik trafionych pól statków

// Losowe rozmieszczenie statków na planszy
function generateAllShips() {
  /////////////////////////////
  //Tworzenie statku 1 kratka//
  /////////////////////////////
  oneShips = [];
  for (let i = 0; i < oneShipCount; i++) {
    let ship = [];
    let startCell = null;
    let direction = null;

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
        if (
          existingShip.includes(cell) ||
          cells[cell].classList.contains("ship")
        ) {
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

      for (const cell of ship) {
        // Komórki poniżej i powyżej
        if (cell + 10 < 100) {
          cells[cell + 10].classList.add("ship");
        }
        if (cell - 10 >= 0) {
          cells[cell - 10].classList.add("ship");
        }
        // Komórki po lewej i prawej
        if (cell % 10 !== 0) {
          cells[cell - 1].classList.add("ship");
        }
        if ((cell + 1) % 10 !== 0) {
          cells[cell + 1].classList.add("ship");
        }
      }
    }

    allShips.push(...oneShips);
  }

  /////////////////////////////
  //Tworzenie statku 2 kratki//
  /////////////////////////////
  twoShips = [];
  for (let i = 0; i < twoShipsCount; i++) {
    ship = [];
    startCell = null;
    direction = null;

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
        if (
          existingShip.includes(cell) ||
          cells[cell].classList.contains("ship")
        ) {
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

      for (const cell of ship) {
        // Komórki poniżej i powyżej
        if (cell + 10 < 100) {
          cells[cell + 10].classList.add("ship");
        }
        if (cell - 10 >= 0) {
          cells[cell - 10].classList.add("ship");
        }
        // Komórki po lewej i prawej
        if (cell % 10 !== 0) {
          cells[cell - 1].classList.add("ship");
        }
        if ((cell + 1) % 10 !== 0) {
          cells[cell + 1].classList.add("ship");
        }
      }
    }
    allShips.push(...twoShips);
  }

  /////////////////////////////
  //Tworzenie statku 3 kratki//
  /////////////////////////////

  threeShips = [];
  for (let i = 0; i < threeShipsCount; i++) {
    ship = [];
    startCell = null;
    direction = null;

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
        if (
          existingShip.includes(cell) ||
          cells[cell].classList.contains("ship")
        ) {
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

      for (const cell of ship) {
        // Komórki poniżej i powyżej
        if (cell + 10 < 100) {
          cells[cell + 10].classList.add("ship");
        }
        if (cell - 10 >= 0) {
          cells[cell - 10].classList.add("ship");
        }
        // Komórki po lewej i prawej
        if (cell % 10 !== 0) {
          cells[cell - 1].classList.add("ship");
        }
        if ((cell + 1) % 10 !== 0) {
          cells[cell + 1].classList.add("ship");
        }
      }
    }
    allShips.push(...threeShips);
  }

  /////////////////////////////
  //Tworzenie statku 4 kratki//
  /////////////////////////////

  fourShips = [];
  for (let i = 0; i < fourShipsCount; i++) {
    const ship = [];
    startCell = null;
    direction = null;

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
        if (
          existingShip.includes(cell) ||
          cells[cell].classList.contains("ship")
        ) {
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

      for (const cell of ship) {
        // Komórki poniżej i powyżej
        if (cell + 10 < 100) {
          cells[cell + 10].classList.add("ship");
        }
        if (cell - 10 >= 0) {
          cells[cell - 10].classList.add("ship");
        }
        // Komórki po lewej i prawej
        if (cell % 10 !== 0) {
          cells[cell - 1].classList.add("ship");
        }
        if ((cell + 1) % 10 !== 0) {
          cells[cell + 1].classList.add("ship");
        }
      }
    }
    allShips.push(...fourShips);
  }
}

// Obsługa strzału
function handleShot(cellIndex) {
  shots++;
  const cell = cells[cellIndex];

  // Sprawdzanie trafienia
  let hit = false;
  for (const ship of allShips) {
    if (ship.includes(cellIndex)) {
      hit = true;
      hits += 1;

      // Licznik zatopionych statków
      if (oneShips.includes(ship)) {
        oneShipsHit -= 1;
      }

      if (twoShips.includes(ship)) {
        twoShipsHit -= 0.49;
      }

      if (threeShips.includes(ship)) {
        threeShipsHit -= 0.25;
        if (threeShipsHit === 0.5) {
          threeShipsHit -= 0.5;
        }
      }

      if (fourShips.includes(ship)) {
        fourShipsHit -= 0.13;
      }

      ship.splice(ship.indexOf(cellIndex), 1); // Usunięcie trafionego pola z statku

      if (ship.length === 0) {
        // Statek zatopiony
        msgMain.textContent = "Hit!";

        msgSunken.textContent = "You sunk a ship!";
        setTimeout(() => {
          msgSunken.textContent = "";
        }, 700);

        table.style.pointerEvents = "none";
        setTimeout(() => {
          table.style.pointerEvents = "all";
        }, 500);
      } else {
        msgMain.textContent = "Hit!";
      }
      cell.classList.add("hit");
      break;
    }
  }

  if (!hit) {
    msgMain.textContent = "Miss!";
    cell.classList.add("miss");
  }

  // Aktualizacja tabeli pozostałych statków
  msgAdditional.innerHTML = `Shots: ${shots}<br /> 
  Sunken: ${hits}/20<br /><br /> 

  Remaining Ships: <br>
  One square ships: ${oneShipsHit}<br />
  Two squares ships: ${Math.round(twoShipsHit)}<br />
  Three squares ships: ${Math.round(threeShipsHit)}<br />
  Four squares ship: ${Math.round(fourShipsHit)}`;

  if (hits === 20) {
    // Wszystkie statki zatopione, koniec gry
    table.style.pointerEvents = "none";
    msgMain.innerHTML = `Victory!<br /> 
    Congratulations!<br /><br />
    Amount of shots: ${shots}<br />`;

    newGameButtonVictory.classList.add("show");
    msgMain.classList.add("message-container--victory");
    newGameButtonVictory.classList.add("message-container--victory");
    window.scrollTo(0, 0);
    cells.forEach((cell) => cell.removeEventListener("click", handleShot));
  }
}

function handleShotStart() {
  cells.forEach((cell, index) => {
    cell.classList.remove("hit", "miss", "ship");
    cell.addEventListener("click", () => handleShot(index));
  });
}

// Inicjalizacja gry
function initGame() {
  msgMain.textContent = "Shoot the ships!";
  oneShips = []; // Tablica przechowująca położenie statków
  twoShips = [];
  threeShips = [];
  fourShips = [];
  allShips = [];

  oneShipsHit = 0; // Liczba trafień statków
  twoShipsHit = 0;
  threeShipsHit = 0;
  fourShipsHit = 0;

  shots = 0; // Licznik strzałów
  hits = 0; // Licznik trafionych pól

  msgMain.classList.remove("message-container--victory");
  newGameButtonVictory.classList.remove("show");

  cells.forEach((cell) => {
    cell.classList.remove("hit", "miss", "ship");
  });

  generateAllShips();

  msgAdditional.innerHTML = `Shots: ${shots}<br /> 
  Sunken: ${hits}/20<br /><br /> 

  Remaining Ships:<br />
  One square ships: ${oneShipsHit}<br />
  Two squares ships: ${twoShipsHit}<br />
  Three squares ships: ${threeShipsHit}<br />
  Four squares ship: ${fourShipsHit}`;

  table.style.pointerEvents = "all";
}

newGameButton.addEventListener("click", () => {
  if (mainMenu.classList.contains("main-menu--hide")) {
    mainMenu.style.display = "flex";
  } else
    setTimeout(() => {
      mainMenu.style.display = "none";
    }, 4000);
  mainMenu.classList.toggle("main-menu--hide");
  handleShotStart();
  initGame();
});

newGameButtonVictory.addEventListener("click", () => {
  initGame();
});

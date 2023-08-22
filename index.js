// Menu block
const mainMenuBlock = document.querySelector(".main-menu");
const mainMenuOptionsBlock = document.querySelector(".main-menu__options-menu");
//Menu/Victory Buttons
const buttonNewGame = document.getElementById("main-menu__new-game");
const buttonContinueGame = document.getElementById("main-menu__continue");
const buttonRestartGame = document.querySelector("#main-menu__restart");
const buttonOptions = document.querySelector("#main-menu__options");
const buttonVictoryNewGame = document.querySelector(
  ".message-container__victory-button"
);
const buttonBackToMainMenu = document.querySelector(
  ".message-container__main-menu"
);
// Options
const buttonWaves = document.querySelector("#main-menu__options-menu__waves");
const numbersCoordWaveCells = document.querySelectorAll(".coordinates");
const alphabethsCoordWaveCells = document.querySelectorAll(".coordinates");
const boardWaveCells = document.querySelectorAll(".numbers");
const buttonOptionsClose = document.querySelector(
  "#main-menu__options-menu__close-button"
);
const hitVolume = document.querySelector(".hit-volume");
const missVolume = document.querySelector(".miss-volume");

/////////////////////////////////////////
const board = document.getElementById("board");
const table = document.getElementById("table");
const cells = document.querySelectorAll(".numbers td div");
const msgContainer = document.querySelector(".message-container");
const msgMain = document.querySelector(".message-container__main"); // Hit/Miss/Victory
const msgAdditional = document.querySelector(".message-container__additional"); // Pozostałe statki
const msgTimer = document.querySelector(".message-container__timer");
const msgSunken = document.querySelector(".message-container__sunken-pop-up"); // Statek zatopiony info
/////////////////////////////////////////
// Liczba statków
const oneShipCount = 4;
const twoShipsCount = 3;
const threeShipsCount = 2;
const fourShipsCount = 1;
// Długość statków
const oneShipsLength = 1;
const twoShipsLength = 2;
const threeShipsLength = 3;
const fourShipsLength = 4;
/////////////////////////////////////////
// Tablica przechowująca położenie statków
let oneShips = [];
let twoShips = [];
let threeShips = [];
let fourShips = [];
let allShips = [];
/////////////////////////////////////////
// Liczba trafień statków
let oneShipsHit = 0;
let twoShipsHit = 0;
let threeShipsHit = 0;
let fourShipsHit = 0;
/////////////////////////////////////////
let shots = 0; // Licznik ogólnych strzałów
let hits = 0; // Licznik trafionych pól statków
let timeSeconds = 0; // Mierzenie czasu rozgrywki sekundy
// Mierzenie czasu rozgrywki minuty
let timeMinutes = 0;
let timerInterval;
//Dźwięki
let hitSoundVolume = 1;
let missSoundVolume = 1;
let hitVolumePercentage = document.getElementById("hit-volume-percenage");
let missVolumePercentage = document.getElementById("miss-volume-percenage");
/////////////////////////////////////////

window.onload = function onPageLoad() {
  table.style.pointerEvents = "none";
  buttonContinueGame.style.display = "none";
  buttonRestartGame.style.display = "none";
  buttonVictoryNewGame.style.display = "none";
};

buttonNewGame.addEventListener("click", () => {
  buttonNewGame.style.pointerEvents = "none";
  buttonBackToMainMenu.classList.remove("hide-element");

  mainMenuBlock.classList.toggle("hide-element");

  firstStart();
  initGame();
});

buttonBackToMainMenu.addEventListener("click", () => {
  table.style.pointerEvents = "none";
  buttonBackToMainMenu.style.pointerEvents = "none";
  clearInterval(timerInterval);

  mainMenuBlock.classList.toggle("hide-element");
});

buttonContinueGame.addEventListener("click", () => {
  buttonBackToMainMenu.style.pointerEvents = "all";
  table.style.pointerEvents = "all";
  startTimer();

  mainMenuBlock.classList.toggle("hide-element");
});

buttonRestartGame.addEventListener("click", () => {
  buttonBackToMainMenu.style.pointerEvents = "all";
  initGame();

  mainMenuBlock.classList.toggle("hide-element");
});

buttonOptions.addEventListener("click", () => {
  mainMenuOptionsBlock.classList.toggle("hide-element-options");
});

buttonOptionsClose.addEventListener("click", () => {
  mainMenuOptionsBlock.classList.toggle("hide-element-options");
});

buttonWaves.addEventListener("click", () => {
  boardWaveCells.forEach((cell) => {
    if (cell.classList.contains("coordinates")) {
      return;
    }
    cell.classList.toggle("numbers-waves");
  });
  numbersCoordWaveCells.forEach((cell) => {
    cell.classList.toggle("coordinates-waves");
    cell.classList.toggle("coordinates-waves");
    if (cell.classList.contains("coordinates-waves")) {
      buttonWaves.innerHTML = "Off";
    } else {
      buttonWaves.innerHTML = "On";
    }
  });
  alphabethsCoordWaveCells.forEach((cell) => {
    cell.classList.toggle("coordinates-waves");
  });
});

buttonVictoryNewGame.addEventListener("click", () => {
  buttonVictoryNewGame.style.display = "none";
  buttonBackToMainMenu.style.pointerEvents = "all";
  initGame();
});

hitVolume.addEventListener("input", () => {
  hitSoundVolume = parseFloat(hitVolume.value); // Konwertuj na liczbę zmiennoprzecinkową
  hitVolumePercentage.innerHTML = `${parseInt(hitSoundVolume * 100)}%`;
});

missVolume.addEventListener("input", () => {
  missSoundVolume = parseFloat(missVolume.value); // Konwertuj na liczbę zmiennoprzecinkową
  missVolumePercentage.innerHTML = `${parseInt(missSoundVolume * 100)}%`;
});

// Inicjalizacja gry
function initGame() {
  timeSeconds = 0;
  timeMinutes = 0;

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

  msgMain.classList.remove("message-container__victory");
  buttonVictoryNewGame.classList.remove("show");

  cells.forEach((cell) => {
    cell.classList.remove("hit", "miss", "locked-cell", "test-ship");
  });

  generateAllShips();

  msgAdditional.innerHTML = `Shots: ${shots}<br /> 
  Sunken: ${hits}/20<br /><br /> 

  Remaining Ships:<br />
  One square ships: ${oneShipsHit}<br />
  Two squares ships: ${twoShipsHit}<br />
  Three squares ships: ${threeShipsHit}<br />
  Four squares ship: ${fourShipsHit}`;

  msgTimer.innerHTML = "Time: 00:00";
  table.style.pointerEvents = "all";

  startTimer();
}

function firstStart() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleShot(index));
    if (
      cell.classList.contains(
        "locked-cell-forever" || "locked-cell-forever--hidden"
      )
    ) {
      // Dodaj nawiasy klamrowe tu
      cell.removeEventListener("click", () => handleShot(index));
      cell.style.pointerEvents = "none";
    }
  });
  setTimeout(() => {
    buttonNewGame.remove();
    buttonContinueGame.style.display = "block";
    buttonRestartGame.style.display = "block";
  }, 400);
}

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
          cells[cell].classList.contains("locked-cell") ||
          cells[cell].classList.contains("locked-cell-forever")
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
        cells[cell].classList.add("test-ship");
        // Komórki poniżej i powyżej
        if (cell + 10 < 100) {
          cells[cell + 10].classList.add("locked-cell");
        }
        if (cell - 10 >= 0) {
          cells[cell - 10].classList.add("locked-cell");
        }
        // // Komórki po lewej i prawej
        if (cell % 10 !== 0) {
          cells[cell - 1].classList.add("locked-cell");
        }
        if ((cell + 1) % 10 !== 0) {
          cells[cell + 1].classList.add("locked-cell");
        }
        // // // Ukos lewo
        // if (cell + 10 < 100) {
        //   cells[cell + 9].classList.add("locked-cell");
        // }
        // if (cell - 10 >= 0) {
        //   cells[cell - 11].classList.add("locked-cell");
        // }
        // // Ukos prawo
        // if (cell - 10 >= 0) {
        //   cells[cell - 9].classList.add("locked-cell");
        // }
        // if (cell + 10 < 100) {
        //   cells[cell + 11].classList.add("locked-cell");
        // }
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
          cells[cell].classList.contains("locked-cell") ||
          cells[cell].classList.contains("locked-cell-forever")
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
        cells[cell].classList.add("test-ship");
        if (cell + 10 < 100) {
          cells[cell + 10].classList.add("locked-cell");
        }
        if (cell - 10 >= 0) {
          cells[cell - 10].classList.add("locked-cell");
        }
        // Komórki po lewej i prawej
        if (cell % 10 !== 0) {
          cells[cell - 1].classList.add("locked-cell");
        }
        if ((cell + 1) % 10 !== 0) {
          cells[cell + 1].classList.add("locked-cell");
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
          cells[cell].classList.contains("locked-cell") ||
          cells[cell].classList.contains("locked-cell-forever")
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
        cells[cell].classList.add("test-ship");
        if (cell + 10 < 100) {
          cells[cell + 10].classList.add("locked-cell");
        }
        if (cell - 10 >= 0) {
          cells[cell - 10].classList.add("locked-cell");
        }
        // Komórki po lewej i prawej
        if (cell % 10 !== 0) {
          cells[cell - 1].classList.add("locked-cell");
        }
        if ((cell + 1) % 10 !== 0) {
          cells[cell + 1].classList.add("locked-cell");
        }
      }
    }
    allShips.push(...threeShips);
  }
  ///////////////////////////
  // Tworzenie statku 4 kratki//
  ///////////////////////////
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
          cells[cell].classList.contains("locked-cell") ||
          cells[cell].classList.contains("locked-cell-forever")
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
        cells[cell].classList.add("test-ship");
        if (cell + 10 < 100) {
          cells[cell + 10].classList.add("locked-cell");
        }
        if (cell - 10 >= 0) {
          cells[cell - 10].classList.add("locked-cell");
        }
        // Komórki po lewej i prawej
        if (cell % 10 !== 0) {
          cells[cell - 1].classList.add("locked-cell");
        }
        if ((cell + 1) % 10 !== 0) {
          cells[cell + 1].classList.add("locked-cell");
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
        const sinking = new Audio("./sounds/sinking.mp3");
        setTimeout(() => {
          sinking.play();
        }, 200);
        msgSunken.textContent = "You sunk a ship!";
        setTimeout(() => {
          msgSunken.textContent = "";
        }, 900);

        table.style.pointerEvents = "none";
        setTimeout(() => {
          table.style.pointerEvents = "all";
        }, 600);
      } else {
        msgMain.textContent = "Hit!";
      }

      const hitSound = new Audio("./sounds/hit.mp3");
      hitSound.volume = hitSoundVolume; // Ustaw głośność
      hitSound.play();

      cell.classList.add("hit");
      break;
    }
  }

  if (!hit) {
    const missSound = new Audio("./sounds/miss.mp3");
    missSound.volume = missSoundVolume; // Ustaw głośność
    missSound.play();

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
    buttonBackToMainMenu.style.pointerEvents = "none";
    table.style.pointerEvents = "none";
    msgMain.innerHTML = `Victory!<br /> 
    Congratulations!<br /><br />
    Amount of shots: ${shots}<br /><br />
    Ships sunken in:<br /> ${timeMinutes} minutes and ${timeSeconds} seconds`;
    clearInterval(timerInterval);
    buttonVictoryNewGame.classList.add("show");
    msgMain.classList.add("message-container__victory");
    buttonVictoryNewGame.style.display = "block";
    window.scrollTo(0, 0);
    cells.forEach((cell) => cell.removeEventListener("click", handleShot));
  }
}

// Mierzenie czasu gry
function timerMessage() {
  const formattedSeconds = timeSeconds.toString().padStart(2, "0");
  const formattedMinutes = timeMinutes.toString().padStart(2, "0");
  msgTimer.innerHTML = `<br /><br />Time: ${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeSeconds++;

    if (timeSeconds === 60) {
      timeSeconds = 0;
      timeMinutes++;
    }

    timerMessage(); // Wywołanie funkcji timerMessage() co sekundę
  }, 1000);
}

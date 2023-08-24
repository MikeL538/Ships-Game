// Menu block
const mainMenuBlock = document.querySelector(".main-menu");
const mainMenuOptionsBlock = document.querySelector(".main-menu-options");
//Menu/Victory Buttons
const buttonNewGame = document.getElementById("main-menu__new-game");
const buttonContinueGame = document.getElementById("main-menu__continue");
const buttonRestartGame = document.querySelector("#main-menu__restart");
const buttonOptions = document.querySelector("#main-menu__options");
const buttonInstructions = document.getElementById("main-menu__instructions");
const buttonVictoryNewGame = document.querySelector(
  ".message-container__victory-button"
);
const buttonBackToMainMenu = document.querySelector(
  ".message-container__main-menu"
);
// Options
const buttonWaves = document.querySelector(".main-menu-options__div__waves");
const buttonTheme = document.querySelector(".main-menu-options__div__theme");
const body = document.querySelector("body");
const computedStyle = getComputedStyle(body);
const alphabethsCoordWaveCells = document.querySelectorAll(".coordinates");
const boardWaveCells = document.querySelectorAll(".numbers");
const hitVolume = document.querySelector(".hit-volume");
const missVolume = document.querySelector(".miss-volume");
const buttonOptionsClose = document.querySelector(
  "#main-menu__options-close-button"
);
// Instructions
const instructionsBlock = document.querySelector(".main-menu-instructions");
const instructionsInner = document.querySelector(
  ".main-menu-instructions__inner"
);
const buttonBackInstructions = document.querySelector(
  ".main-menu-instructions__buttons__back-button"
);
const buttonCloseInstructions = document.querySelector(
  ".main-menu-instructions__buttons__close-button"
);
const buttonNextInstructions = document.querySelector(
  ".main-menu-instructions__buttons__next-button"
);
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
// Dźwięki
let hitVolumePercentage = document.getElementById("hit-volume-percentage");
let missVolumePercentage = document.getElementById("miss-volume-percentage");
let hitSoundVolume = parseFloat(localStorage.getItem("hitSoundVolume")) || 0.5;
let missSoundVolume =
  parseFloat(localStorage.getItem("missSoundVolume")) || 0.5;
// Instrukcje
let instructionsPage = 0;
/////////////////////////////////////////

window.onload = function onPageLoad() {
  table.style.pointerEvents = "none";
  buttonContinueGame.style.display = "none";
  buttonRestartGame.style.display = "none";
  buttonVictoryNewGame.style.display = "none";
  updateSoundVolume();
};

/////////////////////////////////////////
// Przyciski //
buttonNewGame.addEventListener("click", () => {
  buttonNewGame.style.pointerEvents = "none";
  buttonBackToMainMenu.classList.remove("hide-element");

  mainMenuBlock.classList.toggle("hide-element-menu");

  const hitSound = new Audio("./sounds/hit.mp3");
  hitSound.volume = hitSoundVolume; // Ustaw głośność
  hitSound.play();

  firstStart();
  initGame();
});

buttonBackToMainMenu.addEventListener("click", () => {
  table.style.pointerEvents = "none";
  buttonBackToMainMenu.style.pointerEvents = "none";
  clearInterval(timerInterval);

  mainMenuBlock.classList.toggle("hide-element-menu");
});

buttonContinueGame.addEventListener("click", () => {
  buttonBackToMainMenu.style.pointerEvents = "all";
  table.style.pointerEvents = "all";
  startTimer();

  const hitSound = new Audio("./sounds/hit.mp3");
  hitSound.volume = hitSoundVolume; // Ustaw głośność
  hitSound.play();

  mainMenuBlock.classList.toggle("hide-element-menu");
});

buttonRestartGame.addEventListener("click", () => {
  buttonBackToMainMenu.style.pointerEvents = "all";
  initGame();

  const missSound = new Audio("./sounds/miss.mp3");
  missSound.volume = missSoundVolume; // Ustaw głośność
  missSound.play();

  mainMenuBlock.classList.toggle("hide-element-menu");
});

buttonOptions.addEventListener("click", () => {
  mainMenuOptionsBlock.classList.toggle("hide-element");
  missVolumePercentage.innerHTML = `${parseInt(missSoundVolume * 100)}%`;
  missVolume.value = missSoundVolume;

  hitVolumePercentage.innerHTML = `${parseInt(hitSoundVolume * 100)}%`;
  hitVolume.value = hitSoundVolume;
});

buttonOptionsClose.addEventListener("click", () => {
  mainMenuOptionsBlock.classList.toggle("hide-element");
});

buttonInstructions.addEventListener("click", () => {
  instructionsBlock.classList.toggle("hide-element");
  instructionsPage = 0;

  switch (instructionsPage) {
    case 0:
      instructionsInner.innerHTML =
        "<p><br />Welcome to the Battleships game! In this exciting challenge, you'll encounter four different types of ships: four single-cell ships, three two-cell ships, two three-cell ships, and one formidable four-cell ship. Your mission is to strategically sink all of these ships. <br /><br /> Click a cell on the board to shoot - it's either a hit or a miss. When you sink a ship, you'll get a pop-up notification. Keep an eye on the remaining ships next to the board.</p>";
      buttonNextInstructions.classList.remove("hide-element");

      buttonBackInstructions.classList.add("hide-element");
      break;
  }
});

buttonBackInstructions.addEventListener("click", handlebuttonBackInstructions);

function handlebuttonBackInstructions() {
  if (instructionsPage > 0) {
    instructionsPage -= 1;
  }
  switch (instructionsPage) {
    case 0:
      instructionsInner.innerHTML =
        "<p><br />Welcome to the Battleships game! In this exciting challenge, you'll encounter four different types of ships: four single-cell ships, three two-cell ships, two three-cell ships, and one formidable four-cell ship. Your mission is to strategically sink all of these ships. <br /><br /> Click a cell on the board to shoot - it's either a hit or a miss. When you sink a ship, you'll get a pop-up notification. Keep an eye on the remaining ships next to the board.</p>";
      buttonBackInstructions.classList.add("hide-element");
      buttonNextInstructions.classList.remove("hide-element");
      break;

    case 1:
      instructionsInner.innerHTML =
        "<p>In this game, longer ships may extend horizontally and wrap around the edges of the board, similar to how the Earth appears spherical. This means that when a ship is longer than the available space in a row, the remaining part of the ship will continue from the opposite side of the board.</p> <img src='./images/ships-instructions.jpg' alt='' width='280' height='150px'>";
      buttonBackInstructions.classList.remove("hide-element");
      buttonNextInstructions.classList.remove("hide-element");
      break;

    case 2:
      instructionsInner.innerHTML =
        "<div><p>Ships cannot appear in cells directly adjacent to the sides of other ships (either on the left or right) or in cells above or below them. However, ships are allowed to spawn in corner cells.</p><img src='./images/ships-instructions2.jpg' width='150px' height='170px'></div><div><p>When you sink a whole ship, a pop-up confirmation triggers and the remaining ships count updates.</p><img src='./images/ships-instructions3.jpg' width='150px' height='125px'></div>";
      buttonNextInstructions.classList.add("hide-element");
      break;
  }
}

buttonNextInstructions.addEventListener("click", handlebuttonNextInstructions);

function handlebuttonNextInstructions() {
  if (instructionsPage < 2) {
    instructionsPage += 1;
  }
  switch (instructionsPage) {
    case 0:
      instructionsInner.innerHTML =
        "<p><br />Welcome to the Battleships game! In this exciting challenge, you'll encounter four different types of ships: four single-cell ships, three two-cell ships, two three-cell ships, and one formidable four-cell ship. Your mission is to strategically sink all of these ships. <br /><br /> Click a cell on the board to shoot - it's either a hit or a miss. When you sink a ship, you'll get a pop-up notification. Keep an eye on the remaining ships next to the board.</p>";
      buttonBackInstructions.classList.add("hide-element");
      buttonNextInstructions.classList.remove("hide-element");
      break;

    case 1:
      instructionsInner.innerHTML =
        "<p>In this game, longer ships may extend horizontally and wrap around the edges of the board, similar to how the Earth appears spherical. This means that when a ship is longer than the available space in a row, the remaining part of the ship will continue from the opposite side of the board.</p> <img src='./images/ships-instructions.jpg' alt='' width='280' height='150px'>";
      buttonBackInstructions.classList.remove("hide-element");
      break;

    case 2:
      instructionsInner.innerHTML =
        "<div><p>Ships cannot appear in cells directly adjacent to the sides of other ships (either on the left or right) or in cells above or below them. However, ships are allowed to spawn in corner cells.</p><img src='./images/ships-instructions2.jpg' width='150px' height='170px'></div><div><p>When you sink a whole ship, a pop-up confirmation triggers and the remaining ships count updates.</p><img src='./images/ships-instructions3.jpg' width='150px' height='125px'></div>";
      buttonNextInstructions.classList.add("hide-element");
      break;
  }
}

buttonCloseInstructions.addEventListener("click", () => {
  instructionsBlock.classList.toggle("hide-element");
});

buttonWaves.addEventListener("click", handleWavesButtonClick);

// Obsługa kliknięcia przycisku
buttonTheme.addEventListener("click", () => {
  if (computedStyle.backgroundColor === "rgb(0, 0, 0)") {
    body.style.backgroundColor = "#fff";
    body.style.color = "#000";
    buttonTheme.innerHTML = "Dark";
    saveThemeState("light"); // Zapisz stan w localStorage
  } else {
    body.style.backgroundColor = "#000";
    body.style.color = "#fff";
    buttonTheme.innerHTML = "Light";
    saveThemeState("dark"); // Zapisz stan w localStorage
  }
});

buttonVictoryNewGame.addEventListener("click", () => {
  buttonVictoryNewGame.style.display = "none";
  buttonBackToMainMenu.style.pointerEvents = "all";

  const hitSound = new Audio("./sounds/hit.mp3");
  hitSound.volume = hitSoundVolume; // Ustaw głośność
  hitSound.play();

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

/////////////////////////////////////////
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

/////////////////////////////////////////
// Zapisywanie fal //

function saveWavesState(buttonWavesState) {
  localStorage.setItem("wavesState", buttonWavesState ? "On" : "Off");
}

function updateWavesButton() {
  const savedWavesState = localStorage.getItem("wavesState");
  buttonWaves.innerHTML = savedWavesState === "Off" ? "On" : "Off";
}

function handleWavesButtonClick() {
  let isWavesOn = false; //  Zmienna do śledzenia stanu przycisku

  alphabethsCoordWaveCells.forEach((alphCell) => {
    if (alphCell.classList.contains("coordinates-waves")) {
      // Wyłączanie fal dla zielonych
      alphCell.classList.remove("coordinates-waves");
      // Wyłączanie fal dla niebieskich
      boardWaveCells.forEach((numCells) => {
        numCells.classList.remove("numbers-waves");
      });
    } else {
      // Włączanie fal dla zielonych
      alphCell.classList.add("coordinates-waves");
      // Włączanie fal dla niebieskich
      boardWaveCells.forEach((numCells) => {
        numCells.classList.add("numbers-waves");
      });
      isWavesOn = true; // Ustaw stan na "On"
    }
  });

  saveWavesState(isWavesOn); // Zapisz stan w localStorage
  updateWavesButton(); // Zaktualizuj przycisk
}

updateWavesButton();

const savedWavesState = localStorage.getItem("wavesState");
if (savedWavesState === "Off") {
  handleWavesButtonClick();
}

// Zapisywanie Theme
// Funkcja do zapisywania stanu przycisku w localStorage
function saveThemeState(themeState) {
  localStorage.setItem("themeState", themeState);
}

// Funkcja do wczytywania stanu przycisku z localStorage
function loadThemeState() {
  return localStorage.getItem("themeState") || "light"; // Domyślnie ustaw "dark"
}

// Inicjalizacja stanu przycisku na podstawie localStorage
const initialThemeState = loadThemeState();
if (initialThemeState === "light") {
  body.style.backgroundColor = "#fff";
  body.style.color = "#000";
  buttonTheme.innerHTML = "Dark";
} else {
  body.style.backgroundColor = "#000";
  body.style.color = "#fff";
  buttonTheme.innerHTML = "Light";
}

// Zapisywanie dźwięków //
function saveVolumeSettings() {
  localStorage.setItem("hitSoundVolume", hitSoundVolume);
  localStorage.setItem("missSoundVolume", missSoundVolume);
}

// Funkcja do zapisywania ustawień przy zmianie głośności //
function updateSoundVolume() {
  hitSoundVolume = parseFloat(hitVolume.value);
  hitVolumePercentage.innerHTML = `${parseInt(hitSoundVolume * 100)}%`;

  missSoundVolume = parseFloat(missVolume.value);
  missVolumePercentage.innerHTML = `${parseInt(missSoundVolume * 100)}%`;
  saveVolumeSettings();
}

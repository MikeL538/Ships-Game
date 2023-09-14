// Board
const board = document.getElementById("board");
const body = document.querySelector("body"); // Body for Themes
const table = document.getElementById("table");
const computedStyle = getComputedStyle(body); // Recogniztion for Theme
const cells = document.querySelectorAll(".numbers td div");

// Ships amount and lengths
const shipCount = [4, 3, 2, 1];
const shipsLength = [1, 2, 3, 4];

// Arrays keeping ships locations
let oneShips = [];
let twoShips = [];
let threeShips = [];
let fourShips = [];
let allShips = [];

// Ships hits counter
let oneShipsHit = 0;
let twoShipsHit = 0;
let threeShipsHit = 0;
let fourShipsHit = 0;

let shots = 0; // All shots
let hits = 0; // All hits

// Timer
let timeSeconds = 0;
let timeMinutes = 0;
let timerInterval;

// Main Menu
const mainMenuBlock = document.querySelector(".main-menu");
const buttonNewGame = document.getElementById("main-menu__new-game");
const buttonContinueGame = document.getElementById("main-menu__continue");
const buttonEasyRestartGame = document.getElementById("main-menu__restart");
const buttonDifficulty = document.getElementById("main-menu__difficulty");
const buttonOptions = document.getElementById("main-menu__options");
const buttonRanking = document.getElementById("main-menu__ranking");
const buttonInstructions = document.getElementById("main-menu__instructions");

// Main Menu Difficulty
const difficultyBlock = document.querySelector(".main-menu-difficulty");
const buttonDifficultyClose = document.querySelector(
  ".main-menu-difficulty__close-button"
);
// Easy
const buttonDifficultyEasy = document.querySelector(
  ".main-menu-difficulty__easy-button"
);
const infoDifficultyEasy = document.querySelector(
  ".main-menu-difficulty__info-easy"
);
// Normal
const buttonDifficultyNormal = document.querySelector(
  ".main-menu-difficulty__normal-button"
);
const infoDifficultyNormal = document.querySelector(
  ".main-menu-difficulty__info-normal"
);
// Hardcore
const buttonDifficultyHardcore = document.querySelector(
  ".main-menu-difficulty__hardcore-button"
);
const infoDifficultyHardcore = document.querySelector(
  ".main-menu-difficulty__info-hardcore"
);

// Main Menu Options
const mainMenuOptionsBlock = document.querySelector(".main-menu-options");
const buttonWaves = document.querySelector(".main-menu-options__div__waves");
const buttonTheme = document.querySelector(".main-menu-options__div__theme");
const alphabethsCoordWaveCells = document.querySelectorAll(".coordinates");
const boardWaveCells = document.querySelectorAll(".numbers");
const hitVolume = document.querySelector(".hit-volume");
const missVolume = document.querySelector(".miss-volume");
const buttonOptionsClose = document.querySelector(
  "#main-menu__options-close-button"
);
let hitVolumePercentage = document.getElementById("hit-volume-percentage");
let missVolumePercentage = document.getElementById("miss-volume-percentage");
let hitSoundVolume = parseFloat(localStorage.getItem("hitSoundVolume")) || 0.5;
let missSoundVolume =
  parseFloat(localStorage.getItem("missSoundVolume")) || 0.5;

// Main Menu Ranking
const rankingBlock = document.querySelector(".main-menu-ranking");
const buttonRankingClose = document.querySelector(
  ".main-menu-ranking__close-button"
);
const rankingEasyBlock = document.querySelector(".main-menu-ranking__easy");
const buttonRankingEasy = document.querySelector(
  ".main-menu-ranking__easy-button"
);
const buttonRankingEasyClose = document.querySelector(
  ".main-menu-ranking__easy__close-button"
);
const rankingNormalBlock = document.querySelector(".main-menu-ranking__normal");
const buttonRankingNormal = document.querySelector(
  ".main-menu-ranking__normal-button"
);
const buttonRankingNormalClose = document.querySelector(
  ".main-menu-ranking__normal__close-button"
);

let easyRanking = {
  nick: [],
  shots: [],
};
let normalRanking = {
  nick: [],
  shots: [],
};
let PlayerNickInput = document.querySelector(
  ".main-menu-options__div__nick-input"
);
let newPlayer = "";

// Main Menu Instructions
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
let instructionsPage = 0;

// Messages Container
const buttonBackToMainMenu = document.querySelector(
  ".message-container__main-menu"
);
const buttonForceReload = document.querySelector(
  ".message-container__force-reload"
);
const msgContainer = document.querySelector(".message-container");
const msgMain = document.querySelector(".message-container__main"); // Hit/Miss/Victory
const msgAdditional = document.querySelector(".message-container__additional"); // Remaining Ships
const msgTimer = document.querySelector(".message-container__timer");
const msgSunken = document.querySelector(".message-container__sunken-pop-up"); // Pop-up sunken ship

// Victory
const buttonVictoryEasyNewGame = document.querySelector(
  ".message-container__victory-button"
);
const buttonVictoryRanking = document.querySelector(
  ".message-container__victory-ranking"
);

// Local storage
const savedWavesState = localStorage.getItem("wavesState");
const initialThemeState = loadThemeState();
const selectedDifficulty = loadDifficulty();

// Local storage load
window.onload = function onPageLoad() {
  table.style.pointerEvents = "none";
  buttonContinueGame.style.display = "none";
  buttonEasyRestartGame.style.display = "none";
  updateSoundVolume();

  loadRanking();
  updateEasyRanking();
  updateNormalRanking();
  updateWavesButton();
  loadNick();
  loadDifficulty();
};

// Main Menu Buttons
buttonNewGame.addEventListener("click", () => {
  buttonNewGame.style.pointerEvents = "none";
  buttonBackToMainMenu.classList.remove("hide-element");
  buttonBackToMainMenu.style.pointerEvents = "none";

  mainMenuBlock.classList.toggle("hide-element-menu");

  const hitSound = new Audio("./sounds/hit.mp3");
  hitSound.volume = hitSoundVolume; // Setting hit volume
  hitSound.play();

  firstStart();
  initGame();
});

buttonContinueGame.addEventListener("click", () => {
  buttonBackToMainMenu.style.pointerEvents = "all";
  table.style.pointerEvents = "all";
  startTimer();

  const hitSound = new Audio("./sounds/hit.mp3");
  hitSound.volume = hitSoundVolume; // Setting hit volume
  hitSound.play();

  mainMenuBlock.classList.toggle("hide-element-menu");
});

buttonEasyRestartGame.addEventListener("click", () => {
  buttonBackToMainMenu.style.pointerEvents = "none";
  initGame();

  const missSound = new Audio("./sounds/miss.mp3");
  missSound.volume = missSoundVolume; // Setting miss volume
  missSound.play();

  mainMenuBlock.classList.toggle("hide-element-menu");
});

buttonDifficulty.addEventListener("click", () => {
  difficultyBlock.classList.remove("hide-element");
});

buttonOptions.addEventListener("click", () => {
  mainMenuOptionsBlock.classList.toggle("hide-element");

  missVolumePercentage.innerHTML = `${parseInt(missSoundVolume * 100)}%`;
  missVolume.value = missSoundVolume;

  hitVolumePercentage.innerHTML = `${parseInt(hitSoundVolume * 100)}%`;
  hitVolume.value = hitSoundVolume;
});

buttonRanking.addEventListener("click", () => {
  rankingBlock.classList.remove("hide-element");
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

// Difficulty functions
// Button easy choose
buttonDifficultyEasy.addEventListener("click", () => {
  buttonDifficultyEasy.classList.add("main-menu-difficulty-buttons--picked");
  buttonDifficultyNormal.classList.remove(
    "main-menu-difficulty-buttons--picked"
  );
  buttonDifficultyHardcore.classList.remove(
    "main-menu-difficulty-buttons--picked"
  );

  saveDifficulty("easy");

  if (buttonNewGame.classList.contains("new-game-used")) {
    initGame();
    difficultyBlock.classList.add("hide-element");
    mainMenuBlock.classList.add("hide-element-menu");
  }
});

// Hover easy
buttonDifficultyEasy.addEventListener("mouseenter", () => {
  infoDifficultyEasy.classList.remove("hide-element");
});

buttonDifficultyEasy.addEventListener("mouseleave", () => {
  infoDifficultyEasy.classList.add("hide-element");
});

// Button normal choose
buttonDifficultyNormal.addEventListener("click", () => {
  buttonDifficultyNormal.classList.add("main-menu-difficulty-buttons--picked");
  buttonDifficultyEasy.classList.remove("main-menu-difficulty-buttons--picked");
  buttonDifficultyHardcore.classList.remove(
    "main-menu-difficulty-buttons--picked"
  );

  saveDifficulty("normal");

  if (buttonNewGame.classList.contains("new-game-used")) {
    initGame();
    difficultyBlock.classList.add("hide-element");
    mainMenuBlock.classList.add("hide-element-menu");
  }
});

// Hover normal
buttonDifficultyNormal.addEventListener("mouseenter", () => {
  infoDifficultyNormal.classList.remove("hide-element");
});

buttonDifficultyNormal.addEventListener("mouseleave", () => {
  infoDifficultyNormal.classList.add("hide-element");
});

// Button hardcore choose
buttonDifficultyHardcore.addEventListener("click", () => {
  buttonDifficultyHardcore.classList.add(
    "main-menu-difficulty-buttons--picked"
  );
  buttonDifficultyEasy.classList.remove("main-menu-difficulty-buttons--picked");
  buttonDifficultyNormal.classList.remove(
    "main-menu-difficulty-buttons--picked"
  );

  saveDifficulty("hardcore");

  if (buttonNewGame.classList.contains("new-game-used")) {
    initGame();
    difficultyBlock.classList.add("hide-element");
    mainMenuBlock.classList.add("hide-element-menu");
  }
});

// Hover hardcore
buttonDifficultyHardcore.addEventListener("mouseenter", () => {
  infoDifficultyHardcore.classList.remove("hide-element");
});

buttonDifficultyHardcore.addEventListener("mouseleave", () => {
  infoDifficultyHardcore.classList.add("hide-element");
});

// Close button
buttonDifficultyClose.addEventListener("click", () => {
  difficultyBlock.classList.add("hide-element");
});

// Main Menu Options - buttons and functions

buttonWaves.addEventListener("click", handleWavesButtonClick);
function handleWavesButtonClick() {
  let isWavesOn = false; //  Track of the button

  alphabethsCoordWaveCells.forEach((alphCell) => {
    if (alphCell.classList.contains("coordinates-waves")) {
      // Green waves off
      alphCell.classList.remove("coordinates-waves");
      // Blue waves off
      boardWaveCells.forEach((numCells) => {
        numCells.classList.remove("numbers-waves");
      });
    } else {
      // Green waves on
      alphCell.classList.add("coordinates-waves");
      // Blue waves on
      boardWaveCells.forEach((numCells) => {
        numCells.classList.add("numbers-waves");
      });
      isWavesOn = true; // Waves "On"
    }
  });

  saveWavesState(isWavesOn); // Save button-state in local storage
  updateWavesButton(); // Update button
}

buttonTheme.addEventListener("click", () => {
  if (computedStyle.backgroundColor === "rgb(0, 0, 0)") {
    body.style.backgroundColor = "#fff";
    body.style.color = "#000";
    buttonTheme.innerHTML = "Dark";
    saveThemeState("light"); // Save in local storage
  } else {
    body.style.backgroundColor = "#000";
    body.style.color = "#fff";
    buttonTheme.innerHTML = "Light";
    saveThemeState("dark"); // Save in local storage
  }
});

hitVolume.addEventListener("input", () => {
  hitSoundVolume = parseFloat(hitVolume.value); // Parsing to float number
  hitVolumePercentage.innerHTML = `${parseInt(hitSoundVolume * 100)}%`;
});

missVolume.addEventListener("input", () => {
  missSoundVolume = parseFloat(missVolume.value); // Parsing to float number
  missVolumePercentage.innerHTML = `${parseInt(missSoundVolume * 100)}%`;
});

buttonOptionsClose.addEventListener("click", () => {
  if (PlayerNickInput.value.length === 0) {
    newPlayer = "Player";
  } else {
    newPlayer = PlayerNickInput.value;
    saveNick();
  }

  mainMenuOptionsBlock.classList.toggle("hide-element");
});

// Main Menu Ranking - buttons and functions
buttonRankingClose.addEventListener("click", () => {
  rankingBlock.classList.add("hide-element");
});

buttonRankingEasy.addEventListener("click", () => {
  rankingEasyBlock.classList.remove("hide-element");
});

buttonRankingEasyClose.addEventListener("click", () => {
  rankingEasyBlock.classList.add("hide-element");
});

buttonRankingNormal.addEventListener("click", () => {
  rankingNormalBlock.classList.remove("hide-element");
});

buttonRankingNormalClose.addEventListener("click", () => {
  rankingNormalBlock.classList.add("hide-element");
});

function easyRankingAddPlayer(nazwaGracza, shots) {
  // Add player to the ranking
  easyRanking.nick.push(nazwaGracza);
  easyRanking.shots.push(shots);

  // Sort ranking with shots
  const rankingLength = easyRanking.nick.length;
  for (let i = 0; i < rankingLength - 1; i++) {
    for (let j = 0; j < rankingLength - i - 1; j++) {
      if (easyRanking.shots[j] > easyRanking.shots[j + 1]) {
        // Players placing
        const tempNick = easyRanking.nick[j];
        easyRanking.nick[j] = easyRanking.nick[j + 1];
        easyRanking.nick[j + 1] = tempNick;

        const tempScore = easyRanking.shots[j];
        easyRanking.shots[j] = easyRanking.shots[j + 1];
        easyRanking.shots[j + 1] = tempScore;
      }
    }
  }

  // Deleting player 11th
  if (rankingLength > 10) {
    easyRanking.nick.pop();
    easyRanking.shots.pop();
  }
  saveRanking();
  updateEasyRanking();
}

function updateEasyRanking() {
  const rankingEasyList = document.querySelector(
    ".main-menu-ranking__easy__list"
  );
  rankingEasyList.innerHTML = ""; // Clear list

  for (let i = 0; i < easyRanking.nick.length; i++) {
    const listItem = document.createElement("li");

    listItem.textContent = `${easyRanking.nick[i]} - ${easyRanking.shots[i]}`;
    listItem.classList.add("main-menu-ranking__easy__list-item");
    rankingEasyList.appendChild(listItem);
  }
}

function normalRankingAddPlayer(nazwaGracza, shots) {
  // Add player to the ranking
  normalRanking.nick.push(nazwaGracza);
  normalRanking.shots.push(shots);

  // Sort ranking with shots
  const rankingLength = normalRanking.nick.length;
  for (let i = 0; i < rankingLength - 1; i++) {
    for (let j = 0; j < rankingLength - i - 1; j++) {
      if (normalRanking.shots[j] > normalRanking.shots[j + 1]) {
        // Players placing
        const tempNick = normalRanking.nick[j];
        normalRanking.nick[j] = normalRanking.nick[j + 1];
        normalRanking.nick[j + 1] = tempNick;

        const tempScore = normalRanking.shots[j];
        normalRanking.shots[j] = normalRanking.shots[j + 1];
        normalRanking.shots[j + 1] = tempScore;
      }
    }
  }

  // Deletgin 11th player
  if (rankingLength > 10) {
    normalRanking.nick.pop();
    normalRanking.shots.pop();
  }
  saveRanking();
  updateNormalRanking();
}

function updateNormalRanking() {
  const rankingNormalList = document.querySelector(
    ".main-menu-ranking__normal__list"
  );
  rankingNormalList.innerHTML = ""; // Clear list

  for (let i = 0; i < normalRanking.nick.length; i++) {
    const listItem = document.createElement("li");

    listItem.textContent = `${normalRanking.nick[i]} - ${normalRanking.shots[i]}`;
    listItem.classList.add("main-menu-ranking__normal__list-item");
    rankingNormalList.appendChild(listItem);
  }
}

// Main Menu Instructions - buttons and functions
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
        "<div><p>In normal and hardcore modes ships cannot appear in cells directly adjacent to the sides of other ships (left and right) or in cells above or below them. However, ships are allowed to spawn in corner cells.</p><img src='./images/ships-instructions2.jpg' width='150px' height='160px'></div><div><p>When you sink a whole ship, a pop-up confirmation triggers and the remaining ships count updates.</p><img src='./images/ships-instructions3.jpg' width='150px' height='125px'></div>";
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
        "<div><p>In normal and hardcore modes ships cannot appear in cells directly adjacent to the sides of other ships (left and right) or in cells above or below them. However, ships are allowed to spawn in corner cells.</p><img src='./images/ships-instructions2.jpg' width='150px' height='160px'></div><div><p>When you sink a whole ship, a pop-up confirmation triggers and the remaining ships count updates.</p><img src='./images/ships-instructions3.jpg' width='150px' height='125px'></div>";
      buttonNextInstructions.classList.add("hide-element");
      break;
  }
}

buttonCloseInstructions.addEventListener("click", () => {
  instructionsBlock.classList.toggle("hide-element");
});

// Victory
buttonVictoryEasyNewGame.addEventListener("click", () => {
  buttonVictoryRanking.classList.add("hide-element");
  buttonVictoryEasyNewGame.classList.add("hide-element");

  const hitSound = new Audio("./sounds/hit.mp3");
  hitSound.volume = hitSoundVolume; // Set hit volume
  hitSound.play();

  initGame();
});

buttonVictoryRanking.addEventListener("click", () => {
  rankingBlock.classList.remove("hide-element");
});

// Game
function firstStart() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleShot(index));
  });
  setTimeout(() => {
    buttonNewGame.classList.add("new-game-used");
    buttonContinueGame.style.display = "block";
    buttonEasyRestartGame.style.display = "block";
  }, 400);
}

function initGame() {
  table.style.pointerEvents = "none";
  timeSeconds = 0;
  timeMinutes = 0;

  msgMain.textContent = "Shoot the ships!";
  // Arrays keeping ships locations
  oneShips = [];
  twoShips = [];
  threeShips = [];
  fourShips = [];
  allShips = [];
  // Ships hit counter
  oneShipsHit = 0;
  twoShipsHit = 0;
  threeShipsHit = 0;
  fourShipsHit = 0;

  shots = 0; // Shots counter
  hits = 0; // Hits counter

  msgMain.classList.remove("message-container__victory");
  msgMain.classList.remove("message-container__lost");

  cells.forEach((cell) => {
    cell.classList.remove("hit", "miss", "locked-cell", "unravel", "test-ship");
  });

  generateAllShips();
}

// Ships generation
async function generateAllShips() {
  msgAdditional.innerHTML = "Generating ships...";
  table.style.pointerEvents = "none";
  try {
    clearInterval(timerInterval);
    await generateOneShips();
    await generateTwoShips();
    await generateThreeShips();
    await generateFourShips();
    await generateAllShipsMessages();
    setTimeout(() => {
      startTimer();
    }, 500);
  } catch (error) {
    buttonForceReload.classList.remove("hide-element");
    initGame();
  }
}

async function generateOneShips() {
  oneShips = [];

  for (let i = 0; i < shipCount[0]; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1));
    let ship = [];
    let startCell = null;

    // Ships placing
    startCell = Math.floor(Math.random() * (100 - shipsLength[1]));

    // Putting ship on the board
    ship.push(startCell);

    // Overlapping check
    let overlap = false;
    for (const existingShip of allShips) {
      for (const cell of ship) {
        if (
          existingShip.includes(cell) ||
          cells[cell].classList.contains("locked-cell")
        ) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }
    // If overlapping, put again
    try {
      if (overlap) {
        i--;
      } else {
        oneShips.push(ship);
        oneShipsHit += 1;

        for (const cell of ship) {
          cells[cell].classList.add("test-ship");
          // Cells above and under
          if (cell + 10 < 100) {
            cells[cell + 10].classList.add("locked-cell");
          }
          if (cell - 10 >= 0) {
            cells[cell - 10].classList.add("locked-cell");
          }
          // Cells on the left and right
          if (cell % 10 !== 0) {
            cells[cell - 1].classList.add("locked-cell");
          }
          if ((cell + 1) % 10 !== 0) {
            cells[cell + 1].classList.add("locked-cell");
          }

          if (
            buttonDifficultyEasy.classList.contains(
              "main-menu-difficulty-buttons--picked"
            )
          ) {
            // Cells diagonal left
            if (cell + 10 < 100) {
              cells[cell + 9].classList.add("locked-cell");
            }
            if (cell - 10 >= 0) {
              cells[cell - 11].classList.add("locked-cell");
            }
            // Cells diagonal right
            if (cell - 10 >= 0) {
              cells[cell - 9].classList.add("locked-cell");
            }
            if (cell + 10 < 100) {
              cells[cell + 11].classList.add("locked-cell");
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
    allShips.push(...oneShips);
  }
}

async function generateTwoShips() {
  twoShips = [];
  for (let i = 0; i < shipCount[1]; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1));
    let ship = [];
    let startCell = null;
    let direction = null;
    // Random direction selection (vertical or horizontal)
    if (Math.random() < 0.5) {
      // Vertical
      startCell = Math.floor(Math.random() * (100 - shipsLength[1] * 10));
      direction = 10;
    } else {
      // Horizontal
      startCell = Math.floor(Math.random() * (100 - shipsLength[1]));
      direction = 1;
    }
    // Putting ships on the board
    for (let j = 0; j < shipsLength[1]; j++) {
      ship.push(startCell + j * direction);
    }
    // Overlapping check
    let overlap = false;
    for (const existingShip of allShips) {
      for (const cell of ship) {
        if (
          existingShip.includes(cell) ||
          cells[cell].classList.contains("locked-cell")
        ) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }
    // If overlapping, put again
    try {
      if (overlap) {
        i--;
      } else {
        twoShips.push(ship);
        twoShipsHit += 1;

        for (const cell of ship) {
          cells[cell].classList.add("test-ship");
          // Cells above and under
          if (cell + 10 < 100) {
            cells[cell + 10].classList.add("locked-cell");
          }
          if (cell - 10 >= 0) {
            cells[cell - 10].classList.add("locked-cell");
          }
          // Cells on the left and right
          if (cell % 10 !== 0) {
            cells[cell - 1].classList.add("locked-cell");
          }
          if ((cell + 1) % 10 !== 0) {
            cells[cell + 1].classList.add("locked-cell");
          }
          if (
            buttonDifficultyEasy.classList.contains(
              "main-menu-difficulty-buttons--picked"
            )
          ) {
            // Cells diagonal left
            if (cell + 10 < 100) {
              cells[cell + 9].classList.add("locked-cell");
            }
            if (cell - 10 >= 0) {
              cells[cell - 11].classList.add("locked-cell");
            }
            // Cells diagonal right
            if (cell - 10 >= 0) {
              cells[cell - 9].classList.add("locked-cell");
            }
            if (cell + 10 < 100) {
              cells[cell + 11].classList.add("locked-cell");
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
    allShips.push(...twoShips);
  }
}

async function generateThreeShips() {
  threeShips = [];
  for (let i = 0; i < shipCount[2]; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1));
    let ship = [];
    let startCell = null;
    let direction = null;
    // Random direction selection (vertical or horizontal)
    if (Math.random() < 0.5) {
      // Vertical
      startCell = Math.floor(Math.random() * (100 - shipsLength[2] * 10));
      direction = 10;
    } else {
      // Horizontal
      startCell = Math.floor(Math.random() * (100 - shipsLength[2]));
      direction = 1;
    }
    // Putting ships on the board
    for (let j = 0; j < shipsLength[2]; j++) {
      ship.push(startCell + j * direction);
    }
    // Overlapping check
    let overlap = false;
    for (const existingShip of allShips) {
      for (const cell of ship) {
        if (
          existingShip.includes(cell) ||
          cells[cell].classList.contains("locked-cell")
        ) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }
    // If overlapping, put again
    try {
      if (overlap) {
        i--;
      } else {
        threeShips.push(ship);
        threeShipsHit += 1;

        for (const cell of ship) {
          cells[cell].classList.add("test-ship");
          // Cells above and under
          if (cell + 10 < 100) {
            cells[cell + 10].classList.add("locked-cell");
          }
          if (cell - 10 >= 0) {
            cells[cell - 10].classList.add("locked-cell");
          }
          // Cells on the left and right
          if (cell % 10 !== 0) {
            cells[cell - 1].classList.add("locked-cell");
          }
          if ((cell + 1) % 10 !== 0) {
            cells[cell + 1].classList.add("locked-cell");
          }
          if (
            buttonDifficultyEasy.classList.contains(
              "main-menu-difficulty-buttons--picked"
            )
          ) {
            // Cells diagonal left
            if (cell + 10 < 100) {
              cells[cell + 9].classList.add("locked-cell");
            }
            if (cell - 10 >= 0) {
              cells[cell - 11].classList.add("locked-cell");
            }
            // Cells diagonal right
            if (cell - 10 >= 0) {
              cells[cell - 9].classList.add("locked-cell");
            }
            if (cell + 10 < 100) {
              cells[cell + 11].classList.add("locked-cell");
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
    allShips.push(...threeShips);
  }
}

async function generateFourShips() {
  fourShips = [];
  for (let i = 0; i < shipCount[3]; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1));
    let ship = [];
    let startCell = null;
    let direction = null;
    // Random direction selection (vertical or horizontal)
    if (Math.random() < 0.5) {
      // Vertical
      startCell = Math.floor(Math.random() * (100 - shipsLength[3] * 10));
      direction = 10;
    } else {
      // Horizontal
      startCell = Math.floor(Math.random() * (100 - shipsLength[3]));
      direction = 1;
    }
    // Putting ships on the board
    for (let j = 0; j < shipsLength[3]; j++) {
      ship.push(startCell + j * direction);
    }
    // Overlapping check
    let overlap = false;
    for (const existingShip of allShips) {
      for (const cell of ship) {
        if (
          existingShip.includes(cell) ||
          cells[cell].classList.contains("locked-cell")
        ) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }
    // If overlapping, put again
    try {
      if (overlap) {
        i--;
      } else {
        fourShips.push(ship);
        fourShipsHit += 1;

        for (const cell of ship) {
          cells[cell].classList.add("test-ship");
          // Cells above and under
          if (cell + 10 < 100) {
            cells[cell + 10].classList.add("locked-cell");
          }
          if (cell - 10 >= 0) {
            cells[cell - 10].classList.add("locked-cell");
          }
          // Cells on the left and right
          if (cell % 10 !== 0) {
            cells[cell - 1].classList.add("locked-cell");
          }
          if ((cell + 1) % 10 !== 0) {
            cells[cell + 1].classList.add("locked-cell");
          }
          if (
            buttonDifficultyEasy.classList.contains(
              "main-menu-difficulty-buttons--picked"
            )
          ) {
            // Cells diagonal left
            if (cell + 10 < 100) {
              cells[cell + 9].classList.add("locked-cell");
            }
            if (cell - 10 >= 0) {
              cells[cell - 11].classList.add("locked-cell");
            }
            // Cells diagonal right
            if (cell - 10 >= 0) {
              cells[cell - 9].classList.add("locked-cell");
            }
            if (cell + 10 < 100) {
              cells[cell + 11].classList.add("locked-cell");
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
    allShips.push(...fourShips);
  }
  buttonForceReload.classList.add("hide-element");
}

async function generateAllShipsMessages() {
  await new Promise((resolve) => setTimeout(resolve, 1));

  msgAdditional.innerHTML = `Shots: ${shots}<br /> 
    Sunken: ${hits}/20<br /><br /> 
  
    Remaining Ships: <br>
    One square ships: ${oneShipsHit}<br />
    Two squares ships: ${Math.round(twoShipsHit)}<br />
    Three squares ships: ${Math.round(threeShipsHit)}<br />
    Four squares ship: ${Math.round(fourShipsHit)}`;

  if (
    buttonDifficultyHardcore.classList.contains(
      "main-menu-difficulty-buttons--picked"
    )
  ) {
    msgAdditional.innerHTML = `Shots: ${shots}/55<br /> 
      Sunken: ${hits}/20<br /><br /> 
    
      Remaining Ships: <br>
      One square ships: ${oneShipsHit}<br />
      Two squares ships: ${Math.round(twoShipsHit)}<br />
      Three squares ships: ${Math.round(threeShipsHit)}<br />
      Four squares ship: ${Math.round(fourShipsHit)}`;
  }

  table.style.pointerEvents = "all";
  buttonBackToMainMenu.style.pointerEvents = "all";
}

function handleShot(cellIndex) {
  shots++;
  const cell = cells[cellIndex];

  // Checking if hit
  let hit = false;
  for (const ship of allShips) {
    if (ship.includes(cellIndex)) {
      hit = true;
      hits += 1;

      // Sunken ships counter
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

      // sunkeng ship removal
      ship.splice(ship.indexOf(cellIndex), 1);

      if (ship.length === 0) {
        // Ship sunken
        msgMain.textContent = "Hit!";
        const sinking = new Audio("./sounds/sinking.mp3");
        setTimeout(() => {
          sinking.play();
        }, 100);
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

      const hitSound = new Audio("./sounds/hit.mp3");
      hitSound.volume = hitSoundVolume; // Set hit volume
      hitSound.play();

      cell.classList.add("hit");
      break;
    }
  }

  if (!hit) {
    const missSound = new Audio("./sounds/miss.mp3");
    missSound.volume = missSoundVolume; // Set miss volume
    missSound.play();

    msgMain.textContent = "Miss!";
    cell.classList.add("miss");
  }

  // Remaining ships info update
  msgAdditional.innerHTML = `Shots: ${shots}<br /> 
    Sunken: ${hits}/20<br /><br /> 
  
    Remaining Ships: <br>
    One square ships: ${oneShipsHit}<br />
    Two squares ships: ${Math.round(twoShipsHit)}<br />
    Three squares ships: ${Math.round(threeShipsHit)}<br />
    Four squares ship: ${Math.round(fourShipsHit)}`;

  if (
    buttonDifficultyHardcore.classList.contains(
      "main-menu-difficulty-buttons--picked"
    )
  ) {
    msgAdditional.innerHTML = `Shots: ${shots}/55<br /> 
      Sunken: ${hits}/20<br /><br /> 
    
      Remaining Ships: <br>
      One square ships: ${oneShipsHit}<br />
      Two squares ships: ${Math.round(twoShipsHit)}<br />
      Three squares ships: ${Math.round(threeShipsHit)}<br />
      Four squares ship: ${Math.round(fourShipsHit)}`;
  }

  if (hits === 20) {
    // All ships sunken
    buttonBackToMainMenu.style.pointerEvents = "none";

    msgMain.innerHTML = `Victory!<br /> 
      Congratulations!<br /><br />
      Amount of shots: ${shots}<br /><br />
      Ships sunken in:<br /> ${timeMinutes} minutes and ${timeSeconds} seconds`;
    clearInterval(timerInterval);
    msgMain.classList.add("message-container__victory");
    buttonVictoryEasyNewGame.classList.remove("hide-element");
    buttonVictoryRanking.classList.remove("hide-element");

    if (
      buttonDifficultyEasy.classList.contains(
        "main-menu-difficulty-buttons--picked"
      )
    ) {
      easyRankingAddPlayer(newPlayer, shots);
    } else {
      normalRankingAddPlayer(newPlayer, shots);
    }
    table.style.pointerEvents = "none";
  }

  if (
    buttonDifficultyHardcore.classList.contains(
      "main-menu-difficulty-buttons--picked"
    ) &&
    hits !== 20 &&
    shots === 55
  ) {
    buttonBackToMainMenu.style.pointerEvents = "none";

    for (const ship of allShips) {
      for (const cello of ship) {
        cells[cello].classList.add("unravel");
      }
    }

    msgMain.innerHTML = `Defeat!<br /> <br /> 
      Amount of shots: ${shots}`;
    clearInterval(timerInterval);
    msgMain.classList.add("message-container__lost");

    table.style.pointerEvents = "none";
    buttonVictoryEasyNewGame.classList.remove("hide-element");
    buttonVictoryRanking.classList.remove("hide-element");
  }
}

buttonBackToMainMenu.addEventListener("click", () => {
  table.style.pointerEvents = "none";
  buttonBackToMainMenu.style.pointerEvents = "none";
  clearInterval(timerInterval);

  mainMenuBlock.classList.remove("hide-element-menu");
});

async function forceReload() {
  await new Promise((resolve) => setTimeout(resolve, 1));
  initGame();
}

buttonForceReload.addEventListener("click", () => {
  forceReload();
  buttonForceReload.classList.add("hide-element");
});

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

    timerMessage(); // Making timer update every second
  }, 1000);
}

///////Local storage for options//////
// Waves
function updateWavesButton() {
  const savedWavesState = localStorage.getItem("wavesState");
  buttonWaves.innerHTML = savedWavesState === "Off" ? "On" : "Off";
}
function saveWavesState(buttonWavesState) {
  localStorage.setItem("wavesState", buttonWavesState ? "On" : "Off");
}

if (savedWavesState === "Off") {
  handleWavesButtonClick();
}

// Theme
function loadThemeState() {
  return localStorage.getItem("themeState") || "dark"; // Domyślnie ustaw "dark"
}
function saveThemeState(themeState) {
  localStorage.setItem("themeState", themeState);
}
if (initialThemeState === "dark") {
  body.style.backgroundColor = "#000";
  body.style.color = "#fff";
  buttonTheme.innerHTML = "Light";
} else {
  body.style.backgroundColor = "#fff";
  body.style.color = "#000";
  buttonTheme.innerHTML = "Dark";
}

// Sound //
function saveVolumeSettings() {
  localStorage.setItem("hitSoundVolume", hitSoundVolume);
  localStorage.setItem("missSoundVolume", missSoundVolume);
}

// Saving volume //
function updateSoundVolume() {
  hitSoundVolume = parseFloat(hitVolume.value);
  hitVolumePercentage.innerHTML = `${parseInt(hitSoundVolume * 100)}%`;

  missSoundVolume = parseFloat(missVolume.value);
  missVolumePercentage.innerHTML = `${parseInt(missSoundVolume * 100)}%`;
  saveVolumeSettings();
}

// Ranking
function loadRanking() {
  const savedEasyRanking = localStorage.getItem("easyRanking");
  const savedNormalRanking = localStorage.getItem("normalRanking");

  if (savedEasyRanking) {
    easyRanking = JSON.parse(savedEasyRanking);
  } else {
    // Default ranking for easy if no saved
    easyRanking.nick = [
      "Bob",
      "Frodo",
      "Bux",
      "Simba",
      "Saruman",
      "Geralt",
      "Lola",
      "Pete",
      "Glock",
      "Sauron",
    ];
    easyRanking.shots = [38, 41, 42, 44, 45, 47, 48, 49, 50, 51];
  }

  if (savedNormalRanking) {
    normalRanking = JSON.parse(savedNormalRanking);
  } else {
    // Default ranking for normal if no saved
    normalRanking.nick = [
      "Davy",
      "Blackbeard",
      "Jack",
      "Hermione",
      "Gandalf",
      "Walter",
      "Jessy",
      "Pam",
      "Scott",
      "Dwight",
    ];
    normalRanking.shots = [45, 47, 51, 55, 59, 61, 64, 69, 74, 75];
  }
}

function saveRanking() {
  localStorage.setItem("easyRanking", JSON.stringify(easyRanking));
  localStorage.setItem("normalRanking", JSON.stringify(normalRanking));
}

// Nick
function saveNick() {
  localStorage.setItem("nick", PlayerNickInput.value);
}

function loadNick() {
  newPlayer = localStorage.getItem("nick") || "Player";
  PlayerNickInput.value = newPlayer;
}

// Difficulty
function saveDifficulty(difficulty) {
  localStorage.setItem("selectedDifficulty", difficulty);
}

function loadDifficulty() {
  const difficultyStorage = localStorage.getItem("selectedDifficulty");

  if (difficultyStorage === "easy") {
    buttonDifficultyEasy.click();
  } else if (difficultyStorage === "normal") {
    buttonDifficultyNormal.click();
  } else if (difficultyStorage === "hardcore") {
    buttonDifficultyHardcore.click();
  }
}

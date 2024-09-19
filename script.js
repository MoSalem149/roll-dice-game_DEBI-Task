"use strict";

// Selecting elements
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const score0El = document.querySelector("#score-0");
const score1El = document.getElementById("score-1");
const current0El = document.getElementById("current-0");
const current1El = document.getElementById("current-1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const nameInputMessageEl = document.getElementById("name-input-message");
const welcomeMessageEl = document.getElementById("welcome-message");
const btnSetNames = document.querySelector(".btn-set-names");
const victoryMessageEl = document.getElementById("victory-message");
const winnerNameEl = document.getElementById("winner-name");
const nameChangeMessageEl = document.getElementById("name-change-message");

// Selecting audio elements
const audioRoll = document.getElementById("audio-roll");
const audioHold = document.getElementById("audio-hold");
const audioButton = document.getElementById("audio-button");
const audioWin = document.getElementById("audio-win");

let scores, currentScore, activePlayer, playing;
let player1Name = "Player 1";
let player2Name = "Player 2";

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  btnRoll.classList.add("hidden");
  btnHold.classList.add("hidden");
  victoryMessageEl.classList.add("hidden");
  nameChangeMessageEl.classList.add("hidden");
  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");
};

// Set player names and show the welcome message
btnSetNames.addEventListener("click", function () {
  player1Name = document.getElementById("player1-name").value.trim();
  player2Name = document.getElementById("player2-name").value.trim();

  // Check if either name is empty
  if (player1Name === "" || player2Name === "") {
    alert(
      "Both player names must be entered. Please provide names for both players."
    );
    return;
  }

  // Update displayed names
  document.getElementById("name-0").textContent = player1Name;
  document.getElementById("name-1").textContent = player2Name;

  // Hide the name input message and show the welcome message
  nameInputMessageEl.classList.add("hidden");
  welcomeMessageEl.classList.remove("hidden");

  // Play button click sound
  audioButton.currentTime = 0;
  audioButton.play();
});

// Start the game
const startGame = function () {
  init(); // Initialize the game first
  welcomeMessageEl.classList.add("hidden");
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
  diceEl.classList.remove("hidden");
};

// Start game button functionality
document.querySelector(".btn-start").addEventListener("click", function () {
  startGame();

  // Play button click sound
  audioButton.currentTime = 0;
  audioButton.play();
});

// Switch player function
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `./assets/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }

    // Play roll dice sound
    audioRoll.currentTime = 0;
    audioRoll.play();
  }
});

// Holding dice functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      // Hide Roll and Hold buttons
      btnRoll.classList.add("hidden");
      btnHold.classList.add("hidden");

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");

      // Display victory message with the correct player name
      winnerNameEl.textContent = `${
        activePlayer === 0 ? player1Name : player2Name
      } Wins!`;
      victoryMessageEl.classList.remove("hidden");

      // Play win sound
      audioWin.currentTime = 0;
      audioWin.play();
    } else {
      switchPlayer();
    }

    // Play hold sound
    audioHold.currentTime = 0;
    audioHold.play();
  }
});

// New game button functionality
btnNew.addEventListener("click", function () {
  victoryMessageEl.classList.add("hidden");
  nameChangeMessageEl.classList.remove("hidden");

  // Play button click sound
  audioButton.currentTime = 0;
  audioButton.play();
});

// Handle keeping or changing names
document
  .querySelector(".btn-keep-names")
  .addEventListener("click", function () {
    nameChangeMessageEl.classList.add("hidden");
    welcomeMessageEl.classList.remove("hidden"); // Show the welcome message

    // Play button click sound
    audioButton.currentTime = 0;
    audioButton.play();

    // Reset the current state (don't start the game automatically)
    init();
  });

document
  .querySelector(".btn-change-names")
  .addEventListener("click", function () {
    nameChangeMessageEl.classList.add("hidden");
    nameInputMessageEl.classList.remove("hidden");

    // Play button click sound
    audioButton.currentTime = 0;
    audioButton.play();
  });

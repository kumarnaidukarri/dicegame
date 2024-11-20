"use strict";
let player1Obj = {
  totalScore: 0,
  currentScore: 0,
  containerEl: document.querySelector(".pc-1"),
  totalScoreEl: document.querySelector(".pc-1 .totalscore"),
  currentScoreEl: document.querySelector(".pc-1 .current-score"),
  name: "Player 1",
};
let player2Obj = {
  totalScore: 0,
  currentScore: 0,
  containerEl: document.querySelector(".pc-2"),
  totalScoreEl: document.querySelector(".pc-2 .totalscore"),
  currentScoreEl: document.querySelector(".pc-2 .current-score"),
  name: "Player 2",
};
const newgameBtn = document.querySelector(".btn--newgame");
const diceImageEl = document.querySelector(".dice-img");
diceImageEl.style.opacity = "0.02"; /* default diceImage is invisible */
const rolldiceBtn = document.querySelector(".btn--rolldice");
const holdBtn = document.querySelector(".btn--hold");
const diceImagesScrArr = [
  "./images/dice-1.png",
  "./images/dice-2.png",
  "./images/dice-3.png",
  "./images/dice-4.png",
  "./images/dice-5.png",
  "./images/dice-6.png",
]; // to update DiceImage source
let currentPlayer = player1Obj; //player1 is starter
// Event Listeners
newgameBtn.addEventListener("click", resetGame);
rolldiceBtn.addEventListener("click", rollTheDice);

// Functions
function rollTheDice() {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  diceImageEl.style.display = "inline-block"; //showDiceimage
  diceImageEl.src = diceImagesScrArr[randomNumber - 1];
  diceImageEl.style.opacity = "1"; //make visible the dice
  diceImageEl.classList.add("dice-img--animate");
  setTimeout(() => {
    diceImageEl.classList.remove("dice-img--animate");
  }, 700); // dice-animation-done, reset for nextround effect.

  // GAME LOGIC
  if (isWon(player1Obj, player2Obj)) {
    const winnerObj = isWon(player1Obj, player2Obj);
    console.log(`${winnerObj.name} has Won the Match`);
    rollAnchor.href = "#Winpopup-container";
    holdAnchor.href = "#Winpopup-container";
    wonHeadingEl.textContent = `Congratulations! ${winnerObj.name}, You Won the Match.`;
    return;
  } else if (randomNumber === 1) {
    currentPlayer.currentScore = 0; //reseting currentRoundScore in Obj
    currentPlayer.currentScoreEl.textContent = "0"; //reseting currentRoundScore in Htmlcontent
    setTimeout(() => {
      switchPlayer(); //switch the player
    }, 700);
  } else {
    currentPlayer.currentScore += randomNumber;
    currentPlayer.currentScoreEl.textContent = currentPlayer.currentScore + "";
  }
}
function switchPlayer() {
  currentPlayer = player1Obj.containerEl.classList.contains("player--active")
    ? player2Obj
    : player1Obj; //returns non-activePlayer
  player1Obj.containerEl.classList.toggle("player--active");
  player2Obj.containerEl.classList.toggle("player--active");
  diceImageEl.style.opacity = "0.02"; //make invisible the dice
}
holdBtn.addEventListener("click", () => {
  // SaveCurrentScore and SwitchPlayer
  currentPlayer.totalScore += currentPlayer.currentScore; //updating currentPlayer score in Object.
  currentPlayer.totalScoreEl.textContent = currentPlayer.totalScore + ""; //updating currentPlayer score in Htmlcontent
  currentPlayer.currentScore = 0; //reseting currentRoundScore in Obj
  currentPlayer.currentScoreEl.textContent = "0"; //reseting currentRoundScore in Htmlcontent
  switchPlayer(); //Switch the Player

  if (isWon(player1Obj, player2Obj)) {
    const winnerObj = isWon(player1Obj, player2Obj);
    console.log(`${winnerObj.name} has Won the Match`);
    rollAnchor.href = "#Winpopup-container";
    holdAnchor.href = "#Winpopup-container";
    wonHeadingEl.textContent = `Congratulations! ${winnerObj.name}, You Won the Match.`;
    return;
  }
});
function resetGame() {
  console.log(`Resetting the Game Sucessfully Completed...`);
  player1Obj.totalScore = 0;
  player1Obj.currentScore = 0;
  player1Obj.totalScoreEl.textContent = "0";
  player1Obj.currentScoreEl.textContent = "0";

  player2Obj.totalScore = 0;
  player2Obj.currentScore = 0;
  player2Obj.totalScoreEl.textContent = "0";
  player2Obj.currentScoreEl.textContent = "0";

  player1Obj.containerEl.classList.add("player--active"); // player1 should be 1st roll dicer.
  player2Obj.containerEl.classList.remove("player--active");
  diceImageEl.style.display = "none"; //hideDiceimage
  currentPlayer = player1Obj; //reset to player1
}

// //////////////////////////////
// Won section showing ---
let isWon = function (player1Obj, player2Obj) {
  if (player1Obj.totalScore >= 50) {
    return player1Obj;
  } else if (player2Obj.totalScore >= 50) {
    return player2Obj;
  } else {
    return false;
  }
};
const rollAnchor = document.querySelector(".roll-anchor");
const holdAnchor = document.querySelector(".hold-anchor");
const wonHeadingEl = document.querySelector(".won-heading");
const startnewEl = document.querySelector(".btn--startnewgame");
startnewEl.onclick = function () {
  console.log("anchors ressetted");
  rollAnchor.href = "#";
  holdAnchor.href = "#";
  wonHeadingEl.textContent = "";
  resetGame();
};

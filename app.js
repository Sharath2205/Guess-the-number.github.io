const welcomeScreenEl = document.getElementById("welcome-screen");
const gameAreaEl = document.getElementById("game-area");
const newGameEl = document.getElementById("new-game");

const input = document.getElementById("input");
const result = document.getElementById("result");
const prevGuessesEl = document.getElementById("guesses");
const attemptsTookEl = document.querySelector(".prev-attempts");
const attemptsTookSpanEl = document.getElementById("attempts");

const startAudio = new Audio("./assets/Audio files/Start.wav");
const gameOverAudio = new Audio("./assets/Audio files/Lost.wav");
const wonAudio = new Audio("./assets/Audio files/Won.wav");
const enterAudio = new Audio("./assets/Audio files/Enter.wav");

let prevGuesses = [];
let attempts, number;
let attemptsTook = 0;
let max = 100,
  min = 1;

// ------------------ Difficulties
const easy = () => {
  attempts = 10;
  gettingStarted();
};

const hard = () => {
  attempts = 5;
  gettingStarted();
};

// ---------------------  Setting up game

const gettingStarted = () => {
  welcomeScreenEl.style.display = "none";
  gameAreaEl.style.display = "block";
  newGameEl.style.display = "none";
  attemptsTookEl.style.display = "none";
  startAudio.play();
  number = Math.ceil(Math.random() * 100);
  console.log(number);
  input.focus();
};

// --------------------- Logic

const compare = () => {
  enterAudio.play();
  let userNumber = Number(input.value);
  if (userNumber > 100) {
    alert("Enter value lesser than or equal than 100");
  } else if (userNumber < 1) {
    alert("Enter value greater than or equal to 1");
  } else {
    attemptsTook++;
    prevGuesses.push(` ${userNumber}`);
    prevGuessesEl.innerHTML = prevGuesses;
    if (attemptsTook < attempts) {
      if (userNumber == number) {
        won();
      } else if (userNumber < number) {
        result.innerText = "try higher";
      } else {
        result.innerText = "try lower";
      }
      // console.log(prevGuessesEl);
    } else {
      newGameEl.style.display = "block";
      result.innerHTML = `You lost. <br />The number was ${number}`;
      gameOverAudio.play();
      input.setAttribute("disabled", true);
    }
    input.value = "";
  }
};

// helper functions

function won() {
  wonAudio.play();
  newGameEl.style.display = "inline";
  result.innerText = "Yay";
  result.style.color = "#de993e";
  input.setAttribute("disabled", true);
  attemptsTookEl.style.display = "block";
  console.log(attemptsTook);
  attemptsTookSpanEl.innerText = attemptsTook;
}

// -------------------- New Game

const newGame = () => {
  window.location.reload();
};

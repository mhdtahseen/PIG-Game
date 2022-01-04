'use strict';

//Variables

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

// Functions

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const endGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.querySelector(`.player--winner`).classList.remove('player--winner');
  activePlayer = 0;
  playing = true;
};

// Element Selections
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// INITIAL SETTINGS - BEFORE BEGINNING
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// DICE ROLL FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    //console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //Add dice to current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // Change Later
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] < 100) {
      switchPlayer();
    } else {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      // endGame();
    }
  }
});

btnNew.addEventListener('click', endGame);

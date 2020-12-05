var scores, roundScore, activePlayer, gamePlaying;


twoSix = [];
init();

// roll dice
document.querySelector(".btn--roll").addEventListener("click", function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    twoSix.push(dice);
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "imgs/dice-" + dice + ".png";
  
    console.log(twoSix);

    if (dice !== 1) { 
      if (twoSix[twoSix.length-1] === 6 && twoSix[twoSix.length-2] === 6) {
        roundScore = 0;
        scores[activePlayer] = 0;
      }
      else {
        roundScore += dice;
      }
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }
    else {
      roundScore = 0;
      nextPlayer();
    }
  }
});

// hold
document.querySelector(".btn--hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    roundScore = 0;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    nextPlayer();

    //win condition
    temp = Math.max.apply(Math, scores);
    if (temp >= 10) {
      document.querySelector("#name-" + scores.indexOf(temp)).innerHTML = "<b>WINNER!</b>"; 
      document.querySelector(".dice").style.display = 'none';
      document.querySelector(".player--0").classList.remove("player--active");
      document.querySelector(".player--1").classList.remove("player--active");
      document.querySelector(".player--0").classList.remove("player--winner");
      document.querySelector(".player--1").classList.remove("player--winner");
      gamePlaying = false;
    }
  }
});

// new game
document.querySelector(".btn--new").addEventListener("click", init); 

function init() {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player--0").classList.add("player--active");

  document.querySelector(".dice").style.display = 'block';

  document.getElementById("current-0").textContent = '0';
  document.getElementById("current-1").textContent = '0';
  document.getElementById("score-0").textContent = '0';
  document.getElementById("score-1").textContent = '0';
}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
}

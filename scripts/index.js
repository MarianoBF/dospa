let Human = new Player("Humano", true);
let AI = new Player("PC", false);
let match = new Match();
let deck = new Deck
deck.startMatch()

//Referencias
const pcContainer = document.getElementById("pcContainer");
const humanContainer = document.getElementById(
  "humanContainer"
);
const start = document.getElementById("start");
// const deal = document.getElementById("deal");
// const change = document.getElementById("change");
// const score = document.getElementById("score");
const close = document.getElementById("close");
const rules = document.getElementById("rules");
// const save_load = document.getElementById("save_load");
const gameStatus = document.getElementById("status");
const humanMatchCounter = document.getElementById("humanMatchCounter");
const pcMatchCounter = document.getElementById("pcMatchCounter");
const tiedMatchCounter = document.getElementById("tiedMatchCounter");
const pot = document.getElementById("potContainer");

const cardsBack = [
  {
    image: "./images/back.png",
  },
  {
    image: "./images/back.png",
  },
  {
    image: "./images/back.png",
  },
  {
    image: "./images/back.png",
  },
  {
    image: "./images/back.png",
  },
];

//Event listeners
rules.addEventListener("click", showRules);
start.addEventListener("click", () => match.startRound());
pot.addEventListener("click", () => Human.getFromDeck(1));


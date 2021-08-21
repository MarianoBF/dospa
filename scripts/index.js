let Human = new Player("Humano", true);
let AI = new Player("PC", false);
let match = new Match();
let helpMode = false;

//Referencias
const discardContainer = document.getElementById("discardContainer")
const discardImage = document.getElementById("discardImage")
const pcContainer = document.getElementById("pcContainer");
const humanContainer = document.getElementById(
  "humanContainer"
);
const start = document.getElementById("start");
const close = document.getElementById("close");
const rules = document.getElementById("rules");
const gameStatus = document.getElementById("status");
const humanMatchCounter = document.getElementById("humanMatchCounter");
const pcMatchCounter = document.getElementById("pcMatchCounter");
const tiedMatchCounter = document.getElementById("tiedMatchCounter");
const pot = document.getElementById("potContainer");
const discard = document.getElementById("discardContainer");
const helpModeSelector = document.getElementById("helpModeSelector");

const cardsBack = "./images/back.png";

//Event listeners
rules.addEventListener("click", showRules);
start.addEventListener("click", () => match.startRound());
pot.addEventListener("click", () => match.getFromPot());
helpModeSelector.addEventListener("change", () => { helpMode = !helpMode });


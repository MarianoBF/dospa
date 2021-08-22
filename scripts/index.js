let Human = new HumanPlayer("Humano");
let PC = new PCPlayer("PC");
let match = new Match();
let helpMode = true;

//Referencias
const discardContainer = document.getElementById("discardContainer");
const discardImage = document.getElementById("discardImage");
const pcContainer = document.getElementById("pcContainer");
const humanContainer = document.getElementById("humanContainer");
const start = document.getElementById("start");
const close = document.getElementById("close");
const rules = document.getElementById("rules");
const gameStatus = document.getElementById("status");
const gameError = document.getElementById("warning");
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
pot.addEventListener("click", () => match.playGetFromPot());
helpModeSelector.addEventListener("change", () => {
  helpMode = !helpMode;
});

let Human = new HumanPlayer("Humano");
let PC = new PCPlayer("PC");
let match = new Match();
let helpMode = true;

const debug = false;

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
const pot = document.getElementById("potContainer");
const discard = document.getElementById("discardContainer");
const helpModeSelector = document.getElementById("helpModeSelector");
const dospa = document.getElementById("dospa");

const cardsBack = "./images/back.png";

//Event listeners
dospa.addEventListener("click", () => Human.dospa());
rules.addEventListener("click", showRules);
start.addEventListener("click", () => match.startRound());
pot.addEventListener("click", () => match.playGetFromPot());
helpModeSelector.addEventListener("change", () => {
  helpMode = !helpMode;
});

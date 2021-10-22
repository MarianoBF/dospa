class HumanPlayer extends Player {
  constructor(name) {
    super(name);
  }

  showHumanCards() {
    humanContainer.innerHTML = "";
    drawCards(this.hand, humanContainer, "human");
  }

  getFromPot(card) {
    // if (debug) console.log("card", card);
    Human.updateHand(card);
    Human.showHumanCards();
  }

  nonValid2Move() {
    gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agregan tres cartas más las rondas acumuladas como penalización.";
      match.playGetFromPot(3 + match.pickUpCounter);
      match.pickUpMode = false;
      match.pickUpCounter = 0
      setTimeout(() => {
        gameError.innerText = "";
      }, 2000);
  }
}

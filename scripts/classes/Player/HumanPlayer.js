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

  dospa() {
    const top = match.getTopOfDiscardPile();
    const coincidence = this.hand.findIndex((item) => item.code === top.code);
    if (debug) console.log("dospa?", top, coincidence, this.hand);

    if (coincidence === -1) {
      gameError.innerText = "¡Pifiaste! No hay dospa, levantás tres cartas.";
      match.playGetFromPot(3);
      setTimeout(() => {
        gameError.innerText = "";
      }, 2000);
    } else {
      PC.PCGetsFromPot(3)
      if (debug) console.log("hand", this.hand, coincidence)
      this.hand.splice(coincidence, 1);
      Human.showHumanCards();
      if (debug) console.log("hand", this.hand)
      gameStatus.innerText = "¡Bien jugado el dospa! Sigue el juego..."

    } 
  }
}

class HumanPlayer extends Player {
  constructor(name) {
    super(name);
  }

  showHumanCards() {
    humanContainer.innerHTML = "";
    drawCards(this.hand, humanContainer, "human");
  }

  getFromPot(card) {
    // console.log("card", card);
    Human.updateHand(card);
    Human.showHumanCards();
  }

  nonValidMove() {
    gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agrega una carta como penalización.";
      match.playGetFromPot();
      setTimeout(() => {
        gameError.style.display = "none";
      }, 2000);
  }
}

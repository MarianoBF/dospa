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

  nonValid2Move() {
    gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agrega una carta como penalización.";
      match.playGetFromPot();
      match.pickUpMode = false;
      setTimeout(() => {
        gameError.innerText = "";
      }, 2000);
  }
}

class HumanPlayer extends Player {

  constructor() {
    super();
  }

  showHumanCards() {
    humanContainer.innerHTML = "";
    drawCards(this.hand, humanContainer, "human");
  }

}
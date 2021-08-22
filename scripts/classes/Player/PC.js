class PCPlayer extends Player {
  constructor(name) {
    super(name);
  }

  PCPlay() {
    console.log("my turn");
    const ref = match.getTopOfDiscardPile();
    const card = this.hand.find((handCard) => checkCard(handCard, ref));
    if (card) {
      let index = this.hand.findIndex(
        (handCard) => handCard.code === card.code
      );
      this.hand.splice(index, 1);
      match.sendToDiscard(card);
      pcContainer.removeChild(pcContainer.lastElementChild);
      if (this.hand.length === 0) {
        match.endMatchWin("PC");
      }
    } else {
      this.PCGetsFromPot();
    }
    if (helpMode) {
      gameStatus.innerText = "Turno Humano";
    } else {
      gameStatus.innerText = "¡Sigue!";
    }
  }

  PCGetsFromPot() {
    let card = match.getFromPot();
    PC.updateHand(card);
    PC.showBackOfCards();
  }

  showBackOfCards() {
    pcContainer.innerHTML = "";
    let reverseCards = Array(this.hand.length).fill({ image: cardsBack });
    drawCards(reverseCards, pcContainer, "pc");
  }

  showPCCards() {
    pcContainer.innerHTML = "";
    drawCards(this.hand, pcContainer, "pc");
  }
}

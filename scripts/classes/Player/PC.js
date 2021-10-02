class PCPlayer extends Player {
  constructor(name) {
    super(name);
  }

  PCPlay() {
    console.log("my turn");
    const ref = match.getTopOfDiscardPile();
    const card = this.hand.find((handCard) => checkCard(handCard, ref));
    if (card) {
      console.log("pc plays", card.code)
      let another = (card.code[0] === '0' || card.code[0] === 'J')
      let index = this.hand.findIndex(
        (handCard) => handCard.code === card.code
      );
      this.hand.splice(index, 1);
      match.sendToDiscard(card);
      pcContainer.removeChild(pcContainer.lastElementChild);
      if (this.hand.length === 0) {
        match.endMatchWin("PC");
      } else if (another) {
          console.log("PC va de nuevo")
          this.PCPlay();
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
    console.log("pc picked up", card)
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

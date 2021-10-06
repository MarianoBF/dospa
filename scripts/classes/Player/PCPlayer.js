class PCPlayer extends Player {
  constructor(name) {
    super(name);
  }

  PCPlay() {
    console.log("my turn, my hand is", this.hand);
    const top = match.getTopOfDiscardPile();
    const coincidence = this.hand.findIndex((item) => item.code === top.code);
    const card = this.hand.find((handCard) => checkCard(handCard, top));

    if (match.pickUpMode) {
      if (coincidence) {
        let index = this.hand.findIndex(
          (handCard) => {
            handCard.code === card.code;
            console.log("handCard", handCard, card)
          }
        );
        this.hand.splice(index, 1);
        match.sendToDiscard(card);
        pcContainer.removeChild(pcContainer.lastElementChild);
      } else {
        console.log("no cards for pickup mode");
        this.PCGetsFromPot();
      }
      if (this.hand.length === 0) {
        match.endMatchWin("PC");
        return;
      }
      if (helpMode) {
        gameStatus.innerText = "Turno Humano, pero con un 2!";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
    } else {
      const dospaChance = Math.random();
      // console.log("pc dospa?", top, coincidence, dospaChance)
      if (coincidence !== -1 && dospaChance > 0.25) {
        console.log("pc dospa with", top.code);
        gameError.innerText = "Te clavó un dospa la máquina!";
        setTimeout(() => {
          gameError.style.innerText = "";
        }, 2000);
        this.hand.splice(coincidence, 1);
        this.showBackOfCards();
      }

      if (card) {
        console.log("pc plays", card.code);
        let another = card.code[0] === "0" || card.code[0] === "J";
        let index = this.hand.findIndex(
          (handCard) => handCard.code === card.code
        );
        this.hand.splice(index, 1);
        match.sendToDiscard(card);
        pcContainer.removeChild(pcContainer.lastElementChild);
        if (this.hand.length === 0) {
          match.endMatchWin("PC");
          return;
        } else if (another) {
          console.log("PC va de nuevo");
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
    if (card.code[0]===2) {
      match.pickUpMode = true;
    }
  }

  PCGetsFromPot() {
    let card = match.getFromPot(1);
    PC.updateHand(card);
    PC.showBackOfCards();
    console.log("pc picked up", card, "hand", this.hand);
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

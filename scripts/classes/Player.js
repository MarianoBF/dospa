class Player {
  name;
  hand;
  score;
  roundScore;
  isHuman;
  roundsWon;
  roundsTied;
  matchesWon;
  matchesTied;

  constructor(name, isHuman) {
    this.name = name;
    this.score = 0;
    this.isHuman = isHuman;
    this.roundsWon = 0;
    this.roundsTied = 0;
    this.matchesWon = 0;
    this.matchesTied = 0;
  }

  populateHand(cards) {
    this.hand = [...cards];
  }

  updateHand(cards) {
    this.hand = [...this.hand, ...cards];
    if (this.hand.length > 12) {
      match.endMatchLose(this.name);
    }
  }

  showHumanCards() {
    humanContainer.innerHTML = "";
    drawCards(this.hand, humanContainer, "human");
  }

  sendToDiscard(card) {
    const ref = match.getTopOfDiscardPile();
    const result = checkCard(card, ref);
    if (result) {
      let index = this.hand.findIndex((handCard) => handCard.code === card);
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      match.sendToDiscard(card);
      if (this.hand.length === 0) {
        match.endMatchWin("Humano");
      }
      if (helpMode) {
        gameStatus.innerText = "Turno PC";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
    } else {
      gameStatus.innerText = "¡Jugada no válida!";
    }
  }

  AIPlay() {
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
      match.PCGetsFromPot();
    }
    if (helpMode) {
      gameStatus.innerText = "Turno Humano";
    } else {
      gameStatus.innerText = "¡Sigue!";
    }
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

  cleanUp() {
    this.hand = [];
  }

  getName() {
    return this.name;
  }
}

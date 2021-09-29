class Player {
  name;
  hand;
  matchesWon;
  matchesTied;

  constructor(name) {
    this.name = name;
    this.hand = [];
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
      gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agrega una carta como penalización.";
      match.playGetFromPot();
      setTimeout(() => {
        gameError.style.display = "none";
      }, 2000);
    }
  }

  sendToDiscardAndRepeat(card) {
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
        gameStatus.innerText = "Tirá de vuelta";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
    } else {
      gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agrega una carta como penalización.";
      match.playGetFromPot();
      setTimeout(() => {
        gameError.style.display = "none";
      }, 2000);
    }
  }

  showBackOfCards() {
    pcContainer.innerHTML = "";
    let reverseCards = Array(this.hand.length).fill({ image: cardsBack });
    drawCards(reverseCards, pcContainer, "pc");
  }

  cleanUp() {
    this.hand = [];
  }
}

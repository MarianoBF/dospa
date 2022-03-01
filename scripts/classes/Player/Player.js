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
    if (this.hand.length > 20) {
      match.endMatchLose(this.name);
    }
  }

  sendToDiscard(card) {
    const ref = match.getTopOfDiscardPile();
    const result = checkCard(card, ref);
    if (result) {
      let index = this.hand.findIndex(
        (handCard) => handCard.code === card.code
      );
      if (debug) console.log("card", card.code);
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      match.sendToDiscard(card);
      if (this.hand.length === 0) {
        match.endMatchWin("Humano");
        return;
      }
      if (helpMode) {
        gameStatus.innerText = "Turno PC";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
    } else {
      gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agregan dos cartas como penalización.";
      match.playGetFromPot(2);
      setTimeout(() => {
        gameError.innerText = "";
      }, 2000);
    }
  }

  send2ToDiscard(card) {
    const ref = match.getTopOfDiscardPile();
    const result = checkCard(card, ref);
    if (result) {
      let index = this.hand.findIndex(
        (handCard) => handCard.code === card.code
      );
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      match.sendToDiscard(card);
      match.pickUpMode = true;
      match.pickUpCounter++;
      if (debug) console.log("pucounter", match.pickUpCounter);
      if (this.hand.length === 0) {
        match.endMatchWin("Humano");
        return;
      }
      if (helpMode) {
        gameStatus.innerText = "Turno PC con ronda de 2";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
    } else {
      gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agregan dos cartas como penalización.";
      match.playGetFromPot(2);
      setTimeout(() => {
        gameError.innerText = "";
      }, 2000);
    }
  }

  sendToDiscardAndRepeat(card) {
    const ref = match.getTopOfDiscardPile();
    const result = checkCard(card, ref);
    if (result) {
      let index = this.hand.findIndex(
        (handCard) => handCard.code === card.code
      );
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      match.sendToDiscard(card);
      if (this.hand.length === 0) {
        match.endMatchWin("Humano");
        return;
      }
      if (helpMode) {
        gameStatus.innerText = "Tirá de vuelta (o levantá si no tenés)";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
    } else {
      gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agregan dos cartas como penalización.";
      match.playGetFromPot(2);
      setTimeout(() => {
        gameError.innerText = "";
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

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
      let index = this.hand.findIndex((handCard) => handCard.code === card.code);
      console.log("card", card.code)
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      match.sendToDiscard(card);
      if (this.hand.length === 0) {
        match.endMatchWin("Humano");
        return
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
        gameError.innerText = "";
      }, 2000);
    }
  }

  send2ToDiscard(card) {
    const ref = match.getTopOfDiscardPile();
    const result = checkCard(card, ref);
    if (result) {
      let index = this.hand.findIndex((handCard) => handCard.code === card.code);
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      match.sendToDiscard(card);
      match.pickUpMode = true;
      if (this.hand.length === 0) {
        match.endMatchWin("Humano");
        return
      }
      if (helpMode) {
        gameStatus.innerText = "Turno PC con ronda de 2";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
    } else {
      gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agrega una carta como penalización.";
      match.playGetFromPot();
      setTimeout(() => {
        gameError.innerText = "";
      }, 2000);
    }
  }

  sendToDiscardAndRepeat(card) {
    const ref = match.getTopOfDiscardPile();
    const result = checkCard(card, ref);
    if (result) {
      let index = this.hand.findIndex((handCard) => handCard.code === card.code);
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      match.sendToDiscard(card);
      if (this.hand.length === 0) {
        match.endMatchWin("Humano");
        return 
      }
      if (helpMode) {
        gameStatus.innerText = "Tirá de vuelta (o levantá si no tenés)";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
    } else {
      gameError.style.display = "initial";
      gameError.innerText =
        "¡Jugada no válida! Se te agrega una carta como penalización.";
      match.playGetFromPot();
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

  dospa() {
    const top = match.getTopOfDiscardPile();
    const coincidence = this.hand.findIndex((item) => item.code === top.code);
    console.log("dospa?", top, coincidence, this.hand);

    if (coincidence === -1) {
      gameError.innerText = "¡Pifiaste! No hay dospa, levantás tres cartas.";
      match.playGetFromPot();
      setTimeout(() => {
        gameError.innerText = "";
      }, 2000);
    } else {
      console.log("hand", this.hand, coincidence)
      this.hand.splice(coincidence, 1);
      Human.showHumanCards();
      console.log("hand", this.hand)
      gameStatus.innerText = "¡Bien jugado el dospa! Sigue el juego..."

    } 
  }
}

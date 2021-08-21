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

  // TODO change to GET INITIAL CARDS?
  getCards() {
    auxGetCards(5).then(hand => {
      this.hand = hand;
    });
  }

  populateHand(cards) {
    this.hand = [...cards]
  }

  getFromDeck(cards = 1) {
    auxGetCards(cards).then(newCards => {
      this.hand = [...this.hand, ...newCards];
      if (this.hand.length > 12) {
        match.endMatchLose(this.name);
      }
    });
  }

  updateCards(number) {
    auxGetCards(number).then(newCards => {
      this.hand = this.hand.sort((a, b) => 0.5 - Math.random())
      this.hand.splice(0,number)
      this.hand = [...this.hand, ...newCards];
      this.showHumanCards(); 
    });
  }

  showHumanCards() {
    humanContainer.innerHTML = "";
    drawCards(this.hand, humanContainer, "human");
  }

  sendToDiscard(card) {
    const ref = deck.getTopOfDiscardPile()
    const result = checkCard(card, ref)
      if (result) {
      auxSendToPile(card.code);
      let index = this.hand.findIndex(handCard=>handCard.code === card);
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      deck.sendToDiscard(card)
      gameStatus.innerText = "¡Sigue!";
      if (this.hand.length === 0) {
        match.endMatchWin("Humano");
      }
      if (helpMode) { 
      gameStatus.innerText = "Turno PC";
        } 
      else {
        gameStatus.innerText = "¡Jugada no válida!";
      }
  }}

  AIPlay(){
    console.log("my turn");
    const ref = deck.getTopOfDiscardPile();
    const card = this.hand.find(handCard => checkCard(handCard, ref));
    if (card) {
      auxSendToPile(card.code);
      let index = this.hand.findIndex(handCard=>handCard.code === card.code);
      this.hand.splice(index, 1);
      deck.sendToDiscard(card);
      gameStatus.innerText = "¡Sigue!";
      pcContainer.removeChild(pcContainer.lastElementChild);
      if (this.hand.length === 0) {
        match.endMatchWin("PC");
      }
    } else {
      this.getFromDeck(1);
    }
    if (helpMode) { 
      gameStatus.innerText = "Turno Humano";
    }
  }

  showBackOfCards() {
    pcContainer.innerHTML = "";
    let reverseCards = Array(this.hand.length).fill({image: cardsBack})
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

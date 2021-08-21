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

  getFromDeck(cards = 1) {
    auxGetCards(cards).then(newCards => {
      this.hand = [...this.hand, ...newCards];
      this.showHumanCards();     
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
    // debugger;
    const ref = deck.getTopOfDiscardPile()
    const result = checkCard(card, ref)
      if (result) {
      auxSendToPile(card.code);
      let index = this.hand.findIndex(handCard=>handCard.code === card);
      this.hand.splice(index, 1);
      document.getElementById(card.code).remove();
      console.log(this.hand)
      deck.sendToDiscard(card)
      gameStatus.innerText = "¡Sigue!";
      if (this.hand.length === 0) {
        match.endMatch("Human");
      }}
      else {
        gameStatus.innerText = "¡Jugada no válida!";
      }
  }

  PCDiscards(card){

  }

  showBackOfCards() {
    drawCards(cardsBack, pcContainer, "pc");
  }

  showPCCards() {
    drawCards(this.hand, pcContainer, "pc");
  }

  cleanUp() {
    this.hand = [];
    this.roundScore = 0;
  }

  getRoundPoints() {
    return this.roundScore;
  }

  getName() {
    return this.name;
  }
}

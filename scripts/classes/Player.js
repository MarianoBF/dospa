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

  getCards() {
    auxGetCards(5).then(hand => {
      this.hand = hand;
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
    drawCards(this.hand, humanContainer, "human");
  }

  sendToPot(card) {
    auxSendToPile(card);
    let index = this.hand.findIndex(handCard=>handCard.code === card);
    this.hand.splice(index, 1);
    document.getElementById(card).remove();
    console.log(this.hand)
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

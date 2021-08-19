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
    drawCards(this.hand, humanContainer);
  }

  calcPoints() {
    this.roundScore = addScore(this.hand);
    this.score += this.roundScore;
  }

  showBackOfCards() {
    drawCards(cardsBack, pcContainer);
  }

  showPCCards() {
    drawCards(this.hand, pcContainer);
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

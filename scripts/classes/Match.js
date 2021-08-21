class Match {
  id;
  roundsPlayed;
  errors;
  deck;
  cards;
  pot;
  discard;

  constructor() {
    this.id = new Date();
    this.roundsPlayed = 0;
    this.errors = 0;
    this.cards = [];
    this.pot = [];
    this.discard = [];
    this.deck = {};
  }

  startRound() {
    getDecks().then(res => this.deck = res);
    setTimeout(() => {
      console.log(this.deck)
      this.cards = this.deck.cards
      console.log(this.cards)
      pot.style.display = "initial";
      discard.style.display = "initial";
      pcContainer.innerHTML = "";
      humanContainer.innerHTML = "";
      start.disabled = true;
      Human.populateHand(this.cards.splice(0,5))
      AI.populateHand(this.cards.splice(0,5))
      console.log("remaning cards", this.cards)
      // Human.getCards();
      // AI.getCards();
  
      Human.showHumanCards();
      // AI.showBackOfCards();
      AI.showPCCards();
      gameStatus.innerText = "Cartas en la mesa, ¡juegue!";
      auxGetCards(1).then(card => {
        deck.sendToDiscard(card[0]);
      })
    },2500)
}

  getFromPot() {
    Human.getFromDeck(1);
    Human.showHumanCards();
    // AI.showBackOfCards();
    AI.showPCCards();
    AI.AIPlay();
  }

  play(carta) {
    Human.sendToDiscard(carta)
    AI.AIPlay();
    AI.showPCCards();
  }

  endMatchWin(player) {
    alert('Ganó ' + player);
    this.cleanup();
  }

  endMatchLose(player) {
    alert('Perdió ' + player);
    this.cleanup();
  }

  cleanup() {
    pcContainer.innerHTML = "";
    humanContainer.innerHTML = "";
    start.disabled = false;
    Human.cleanUp();
    AI.cleanUp();
  }
}

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
    start.disabled = true;
    getDecks().then(res => this.deck = res);
    setTimeout(() => {
      this.cards = this.deck.cards
      pot.style.display = "initial";
      discard.style.display = "initial";
      pcContainer.innerHTML = "";
      humanContainer.innerHTML = "";
      Human.populateHand(this.cards.splice(0,5))
      AI.populateHand(this.cards.splice(0,5))
      Human.showHumanCards();
      // AI.showBackOfCards();
      AI.showPCCards();
      gameStatus.innerText = "Cartas en la mesa, ¡juegue!";
      this.sendToDiscard(this.cards.pop());
      
    },2500)
  }

  sendToDiscard(card) {
    this.discard.push(card)
    discardImage.src = card.image;
  }

  getTopOfDiscardPile() {
    return this.discard[this.discard.length - 1];        
  }

  getFromPot() {
    Human.updateHand([this.cards.pop()])
    Human.showHumanCards();
    // AI.showBackOfCards();
    AI.AIPlay();
    AI.showPCCards();
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
    gameStatus.innerText = "Terminó el partido, ¿querés jugar otro?";
    pcContainer.innerHTML = "";
    humanContainer.innerHTML = "";
    pot.style.display = "none";
    discard.style.display = "none";
    Human.cleanUp();
    AI.cleanUp();
    start.disabled = false;
  }
}

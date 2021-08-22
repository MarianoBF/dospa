class Match {
  id;
  gameWon;
  errors;
  deck;
  cards;
  pot;
  discard;

  constructor() {
    this.id = new Date();
    this.gameWon = false;
    this.errors = 0;
    this.cards = [];
    this.pot = [];
    this.discard = [];
    this.deck = {};
  }

  startRound() {
    start.disabled = true;
    getDecks().then((res) => (this.deck = res));
    setTimeout(() => {
      this.cards = this.deck.cards;
      pot.style.display = "initial";
      discard.style.display = "initial";
      pcContainer.innerHTML = "";
      humanContainer.innerHTML = "";
      Human.populateHand(this.cards.splice(0, 5));
      PC.populateHand(this.cards.splice(0, 5));
      Human.showHumanCards();
      PC.showBackOfCards();
      gameStatus.innerText = "Cartas en la mesa, jugá!";
      this.sendToDiscard(this.cards.pop());
    }, 2500);
  }

  sendToDiscard(card) {
    this.discard.push(card);
    discardImage.src = card.image;
  }

  getTopOfDiscardPile() {
    return this.discard[this.discard.length - 1];
  }

  PCGetsFromPot() {
    PC.updateHand([this.cards.pop()]);
    PC.showBackOfCards();
  }
  
  getFromPot() {
    Human.updateHand([this.cards.pop()]);
    Human.showHumanCards();
    if (!this.gameWon) {
      let wait = 3000*Math.random()
      setTimeout(() => {
        PC.PCplay();
        PC.showPCCards();
        }, wait)
    }
  }

  play(carta) {
    Human.sendToDiscard(carta);
    if (!this.gameWon) {
    let wait = 3000*Math.random()
      setTimeout(() => {
      PC.PCPlay();
      PC.showPCCards();
      }, wait)
    }
  }

  endMatchWin(player) {
    alert("Ganó " + player);
    this.cleanup();
  }

  endMatchLose(player) {
    alert("Perdió " + player);
    this.cleanup();
  }

  cleanup() {
    gameStatus.innerText = "Terminó el partido, ¿querés jugar otro?";
    pcContainer.innerHTML = "";
    humanContainer.innerHTML = "";
    pot.style.display = "none";
    discard.style.display = "none";
    Human.cleanUp();
    PC.cleanUp();
    //TODO: set scores
    start.disabled = false;
  }
}

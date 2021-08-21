class Match {
  id;
  roundsPlayed;
  errors;

  constructor() {
    this.id = new Date();
    this.roundsPlayed = 0;
    this.errors = 0;
  }

  startRound() {
    pot.style.display = "initial";
    discard.style.display = "initial";
    pcContainer.innerHTML = "";
    humanContainer.innerHTML = "";
    start.disabled = true;
    Human.getCards();
    AI.getCards();
    setTimeout(() => {
      Human.showHumanCards();
      // AI.showBackOfCards();
      AI.showPCCards();
      gameStatus.innerText = "Cartas en la mesa, ¡juegue!";
      auxGetCards(1).then(card => {
        deck.sendToDiscard(card[0]);
      })
    },1500)
}

  getFromPot() {
    Human.getFromDeck(1);
    Human.showHumanCards();
    AI.showBackOfCards();
    AI.showPCCards();
  }

  play(carta) {
    Human.sendToDiscard(carta)
    AI.AIPlay();
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

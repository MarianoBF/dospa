class Match {
  id;
  gameWon;
  errors;
  deck;
  cards;
  discard;
  pickUpMode;
  endedPickUp;

  constructor() {
    this.id = new Date();
    this.gameWon = false;
    this.errors = 0;
    this.cards = [];
    this.discard = [];
    this.deck = {};
    this.pickUpMode = false;
    this.endedPickUp = false;
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

      // ***********For Dospacheck*****************
      // const testDospa = this.cards.splice(0, 2)
      // const HumanTestDospa = [...testDospa, ...this.cards.splice(0, 5)]
      // const PCTestDospa = [...testDospa, ...this.cards.splice(0, 5)]
      // if (debug) console.log(testDospa)
      // Human.populateHand(HumanTestDospa);
      // PC.populateHand(PCTestDospa);

      // ***********For PickUpCheck*****************
      const testPickup = this.cards.filter(item=>item.code[0]==='2')
      const HumanTestPickup = [...testPickup.splice(0,2), ...this.cards.splice(0, 5)]
      const PCTestPickup = [...testPickup.splice(0,1), ...this.cards.splice(0, 6)]
      if (debug) console.log(testPickup)
      Human.populateHand(HumanTestPickup);
      PC.populateHand(PCTestPickup);

      // Human.populateHand(this.cards.splice(0, 7));
      // PC.populateHand(this.cards.splice(0, 7));
      Human.showHumanCards();
      PC.showBackOfCards();
      gameStatus.innerText = "Cartas en la mesa, ¡jugá!";
      this.sendToDiscard(this.cards.pop());
      dospa.disabled = false;
      // if (debug) console.log("cards", this.cards);
    }, 2500);
    gameStatus.innerText = "Trayendo el mazo...";
  }

  sendToDiscard(card) {
    this.discard.push(card);
    discardImage.src = card.image;
    if (debug) console.log("discard", this.discard);
  }

  getTopOfDiscardPile() {
    return this.discard[this.discard.length - 1];
  }

  getFromPot(numberToGet=1) {
    // if (debug) console.log("cards", this.cards);
    return [this.cards.splice(0,numberToGet)];
  }

  playGetFromPot() {
    if (!this.gameWon === true) {

    // if (debug) console.log("cards", this.cards);
      Human.getFromPot([this.cards.pop()])
      if (helpMode) {
        gameStatus.innerText = "Turno PC";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
      if (!this.gameWon) {
        let wait = 1000 + 3000 * Math.random();
        setTimeout(() => {
          PC.showBackOfCards();
          PC.PCPlay();
        }, wait);
      }
    }
  }

  play(carta) {
    if (!this.gameWon === true) {
      if (debug) console.log("human played", carta.code);
      let another = carta.code[0] === "0" || carta.code[0] === "J";
      let pickUp = carta.code[0] === "2";
      if (this.pickUpMode && !pickUp) {
        Human.nonValid2Move();
      } else {
        if (another) {
          Human.sendToDiscardAndRepeat(carta);
          if (debug) console.log("humano va de nuevo");
        } else if (pickUp) {
          Human.send2ToDiscard(carta);
        } else {
          Human.sendToDiscard(carta);
        }
      }
      if (!this.gameWon && !another) {
        let wait = 500 + 3000 * Math.random();
        setTimeout(() => {
          PC.PCPlay();
          // PC.showPCCards();
        }, wait);
      }
    }
  }

  endMatchWin(player) {
    if (player === 'Humano') {
      Human.matchesWon++
    } else {
      PC.matchesWon++
    }
    this.gameWon = true;
    alert("Ganó " + player);
    setTimeout(() => this.cleanup("Gano " + player + ", partido terminado."), 2000);
  }

  endMatchLose(player) {
    if (player === 'Humano') {
      PC.matchesWon++
    } else {
      Human.matchesWon++
    }
    this.gameWon = true;
    alert("Perdió " + player);
    setTimeout(() => this.cleanup("Perdió " + player + ", partido terminado."), 2000);
  }

  cleanup(message) {
    PC.showPCCards();
    gameStatus.innerText = message;
    // pcContainer.innerHTML = "";
    // humanContainer.innerHTML = "";
    pot.style.display = "none";
    discard.style.display = "none";
    Human.cleanUp();
    PC.cleanUp();
    //TODO: set scores
    start.disabled = false;
    dospa.disabled = true;
  }
}

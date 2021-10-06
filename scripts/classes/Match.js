class Match {
  id;
  gameWon;
  errors;
  deck;
  cards;
  discard;

  constructor() {
    this.id = new Date();
    this.gameWon = false;
    this.errors = 0;
    this.cards = [];
    this.discard = [];
    this.deck = {};
    this.pickUpMode = false;
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
      // console.log(testDospa)
      // Human.populateHand(HumanTestDospa);
      // PC.populateHand(PCTestDospa);

      // ***********For PickUpCheck*****************
      const testPickup = this.cards.filter(item=>item.code[0]==='2')
      const HumanTestPickup = [...testPickup.splice(0,2), ...this.cards.splice(0, 5)]
      const PCTestPickup = [...testPickup.splice(0,2), ...this.cards.splice(0, 5)]
      console.log(testPickup)
      Human.populateHand(HumanTestPickup);
      PC.populateHand(PCTestPickup);

      // Human.populateHand(this.cards.splice(0, 7));
      // PC.populateHand(this.cards.splice(0, 7));
      Human.showHumanCards();
      PC.showBackOfCards();
      gameStatus.innerText = "Cartas en la mesa, ¡jugá!";
      this.sendToDiscard(this.cards.pop());
      dospa.disabled = false;
      // console.log("cards", this.cards);
    }, 2500);
    gameStatus.innerText = "Trayendo el mazo...";
  }

  sendToDiscard(card) {
    this.discard.push(card);
    discardImage.src = card.image;
    // console.log("discard", this.discard);
  }

  getTopOfDiscardPile() {
    return this.discard[this.discard.length - 1];
  }

  getFromPot(numberToGet=1) {
    // console.log("cards", this.cards);
    return [this.cards.splice(0,numberToGet)];
  }

  playGetFromPot() {
    // console.log("cards", this.cards);
    Human.getFromPot([this.cards.pop()]);
    if (helpMode) {
      gameStatus.innerText = "Turno PC";
    } else {
      gameStatus.innerText = "¡Sigue!";
    }
    if (!this.gameWon) {
      let wait = 1000 + 3000 * Math.random();
      setTimeout(() => {
        PC.PCPlay();
        PC.showBackOfCards();
      }, wait);
    }
  }

  play(carta) {
    console.log("human played", carta.code);
    let another = carta.code[0] === "0" || carta.code[0] === "J";
    let pickUp = carta.code[0] === "2";
    if (this.pickUpMode && !pickUp) {
       Human.nonValidMove();
    } else {
      if (another) {
        Human.sendToDiscardAndRepeat(carta);
        console.log("humano va de nuevo");
      } else if (pickUp) {
        Human.send2ToDiscard(carta);
      } else {
        Human.sendToDiscard(carta);
      }
    }
    if (!this.gameWon && !another) {
      let wait = 1000 + 3000 * Math.random();
      setTimeout(() => {
        PC.PCPlay();
        // PC.showPCCards();
      }, wait);
    }
  }

  endMatchWin(player) {
    this.gameWon = true;
    alert("Ganó " + player);
    gameStatus.innerText = "Gano " + player + ", partido terminado.";
    PC.showPCCards();
    setTimeout(() => this.cleanup(), 5000);
  }

  endMatchLose(player) {
    this.gameWon = true;
    PC.showPCCards();
    alert("Perdió " + player);
    gameStatus.innerText = "Perdió " + player + ", partido terminado.";
    setTimeout(() => this.cleanup(), 5000);
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
    dospa.disabled = true;
  }
}

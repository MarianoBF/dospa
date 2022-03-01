class Match {
  id;
  gameWon;
  errors;
  deck;
  cards;
  discard;
  // pickUpMode es cuando arranca la ronda de ir levantando 2**n cartas
  pickUpMode;
  pickUpCounter;
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
    this.pickUpCounter = 0;
  }

  startRound() {
    Human.cleanUp();
    PC.cleanUp();
    helpModeSelector.disabled = true;
    start.disabled = true;
    start.classList.add("hidden-small");
    rulesHelpContainer.classList.add("hidden-small");

    getDecks().then((res) => (this.deck = res));
    setTimeout(() => {
      this.gameWon = false;
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
      // const testPickup = this.cards.filter(item=>item.code[0]==='2')
      // const HumanTestPickup = [...testPickup.splice(0,2), ...this.cards.splice(0, 5)]
      // const PCTestPickup = [...testPickup.splice(0,1), ...this.cards.splice(0, 6)]
      // if (debug) console.log(testPickup)
      // Human.populateHand(HumanTestPickup);
      // PC.populateHand(PCTestPickup);

      // ************FAST WIN ************************
      // Human.populateHand([this.cards.find(item=>item.code[0]==='4')]);

      Human.populateHand(this.cards.splice(0, 7));
      PC.populateHand(this.cards.splice(0, 7));
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

  getFromPot(numberToGet = 1) {
    // if (debug) console.log("cards", this.cards);
    return [this.cards.splice(0, numberToGet)];
  }

  playGetFromPot(numberToGet = 1) {
    if (!this.gameWon === true) {
      if (this.pickUpMode) {
        gameError.innerText = "Levantás 2 por cada ronda de 2 acumulada.";
        numberToGet = (this.pickUpCounter - 1) * 2;
        match.pickUpMode = false;
        match.pickUpCounter = 0;
        setTimeout(() => {
          gameError.innerText = "";
        }, 2000);
      }
      const cards = this.cards.splice(0, numberToGet);
      if (debug) console.log("getFromPot", cards);
      for (const card of cards) {
        const cardToAdd = [];
        cardToAdd.push(card);
        Human.getFromPot(cardToAdd);
      }
      // if (debug) console.log("cards", this.cards);
      if (helpMode) {
        gameStatus.innerText = "Turno PC";
      } else {
        gameStatus.innerText = "¡Sigue!";
      }
      if (this.pickUpMode) {
        if (helpMode) {
          gameStatus.innerText = "Levantaste por el dos, ahora es turno PC";
        } else {
          gameStatus.innerText = "¡Sigue!";
        }
      }
      let wait = 1000 + 3000 * Math.random();
      setTimeout(() => {
        if (!this.gameWon) {
          if (debug) console.log("pc waiting for you");
          PC.showBackOfCards();
          PC.PCPlay();
        }
      }, wait);
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
      if (!another) {
        let wait = 500 + 3000 * Math.random();
        setTimeout(() => {
          if (!this.gameWon) {
            if (debug) console.log("pc waiting for you");
            PC.PCPlay();
            // PC.showPCCards();
          }
        }, wait);
      }
    }
  }

  endMatchWin(player) {
    if (player === "Humano") {
      Human.matchesWon++;
    } else {
      PC.matchesWon++;
    }
    this.gameWon = true;
    modalFinalMessage.innerText = "Ganó " + player;
    modalFinal.classList.add("openModal");
    modalFinalClose.addEventListener("click", () => {
      modalFinal.classList.remove("openModal");
    });
    setTimeout(
      () => this.cleanup("Gano " + player + ", partido terminado."),
      2000
    );
  }

  endMatchLose(player) {
    if (player === "Humano") {
      PC.matchesWon++;
    } else {
      Human.matchesWon++;
    }
    this.gameWon = true;
    modalFinalMessage.innerText = "Perdió " + player;
    modalFinal.classList.add("openModal");
    modalFinalClose.addEventListener("click", () => {
      modalFinal.classList.remove("openModal");
    });
    setTimeout(
      () => this.cleanup("Perdió " + player + ", partido terminado."),
      2000
    );
  }

  cleanup(message) {
    humanMatchCounter.value = Human.matchesWon;
    pcMatchCounter.value = PC.matchesWon;
    PC.showPCCards();
    gameStatus.innerText = message;
    // pcContainer.innerHTML = "";
    // humanContainer.innerHTML = "";
    pot.style.display = "none";
    discard.style.display = "none";
    start.disabled = false;
    dospa.disabled = true;
    helpModeSelector.disabled = false;
    start.classList.remove("hidden-small");
    rulesHelpContainer.classList.remove("hidden-small");
  }
}

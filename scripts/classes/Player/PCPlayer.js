class PCPlayer extends Player {
  constructor(name) {
    super(name);
  }

  PCPlay() {
    if (match.gameWon === false) {
      if (debug) console.log("my turn, my hand is", this.hand);
      const top = match.getTopOfDiscardPile();
      const coincidence = this.hand.findIndex((item) => item.code === top.code);
      const pickUpAlternative = this.hand.findIndex(
        (item) => item.code[0] === top.code[0]
      );
      let card;
      if (debug)
        console.log("pickup?", match.pickUpMode, "alt?", pickUpAlternative);
      if (match.pickUpMode) {
        if (pickUpAlternative !== -1) {
          card = this.hand.find((item) => item.code[0] === top.code[0]);
          let index = pickUpAlternative;
          this.hand.splice(index, 1);
          match.sendToDiscard(card);
          match.pickUpCounter++;
          if (debug) console.log("pucounter increased", match.pickUpCounter);
          pcContainer.removeChild(pcContainer.lastElementChild);
        } else {
          if (debug) console.log("no cards for pickup mode");
          this.PCGetsFromPot((match.pickUpCounter) * 2);
          match.pickUpMode = false;
          match.pickUpCounter = 0;
          if (helpMode) {
            gameStatus.innerText =
              "La PC no tenía un 2 y tuvo que levantar! \n Turno humano";
            return;
          }
        }
        if (this.hand.length === 0) {
          match.endMatchWin("PC");
          return;
        }
        if (helpMode) {
          gameStatus.innerText = "Turno Humano, pero con un 2!";
        } else {
          gameStatus.innerText = "¡Sigue!";
        }
      } else {
        const dospaChance = Math.random();
        if (debug)
          console.log("pc dospa?", "index: ", coincidence, dospaChance);
        if (coincidence !== -1 && dospaChance > 0.25) {
          if (debug) console.log("pc dospa with", top.code);
          gameError.innerText = "Te clavó un dospa la máquina!";
          setTimeout(() => {
            gameError.innerText = "";
          }, 2000);
          match.playGetFromPot(2);
          this.hand.splice(coincidence, 1);
          this.showBackOfCards();
          setTimeout(() => {
            if (debug) console.log("pc waiting for you");
          }, 2000);
        }

        card = this.hand.find((handCard) => checkCard(handCard, top));

        if (debug)
          console.log(
            "first card is 2?",
            match.getTopOfDiscardPile().code[0] === "2",
            "currentCard",
            card ? card.code : "no card",
            "isPickup mode active?",
            match.pickUpMode
          );

        if (
          !card &&
          !match.pickUpMode &&
          match.getTopOfDiscardPile().code[0] === "2"
        ) {
          card = this.hand.pop()[0];
        }

        if (card) {
          if (debug) console.log("pc plays", card.code);
          let another = card.code[0] === "0" || card.code[0] === "J";
          let index = this.hand.findIndex(
            (handCard) => handCard.code === card.code
          );
          this.hand.splice(index, 1);
          match.sendToDiscard(card);
          pcContainer.removeChild(pcContainer.lastElementChild);
          if (this.hand.length === 0) {
            match.endMatchWin("PC");
            return;
          } else if (another) {
            if (debug) console.log("PC va de nuevo");
            setTimeout(() => {
              if (debug) console.log("pc waiting for you");
            }, 1500);
            this.PCPlay();
          }
        } else {
          this.PCGetsFromPot();
          return;
        }
        if (helpMode) {
          gameStatus.innerText = "Turno Humano";
        } else {
          gameStatus.innerText = "¡Sigue!";
        }
      }
      if (debug) console.log("checkPickUP", card.code[0]);
      if (!match.pickUpMode && +card.code[0] === 2) {
        match.pickUpMode = true;
        match.pickUpCounter++;
        if (debug) console.log("pucounter increased 2", match.pickUpCounter);
        if (helpMode) {
          gameStatus.innerText = "Turno Humano pero con 2";
        } else {
          gameStatus.innerText = "¡Sigue!";
        }
      }
    }
  }

  PCGetsFromPot(quantity = 1) {
    let card = match.getFromPot(quantity)[0];
    PC.updateHand(card);
    PC.showBackOfCards();
    if (debug) console.log("pc picked up", card, "hand", this.hand);
    if (helpMode) {
      gameStatus.innerText = "Turno Humano";
    } else {
      gameStatus.innerText = "¡Sigue!";
    }
  }

  showBackOfCards() {
    pcContainer.innerHTML = "";
    let reverseCards = Array(this.hand.length).fill({ image: cardsBack });
    drawCards(reverseCards, pcContainer, "pc");
  }

  showPCCards() {
    pcContainer.innerHTML = "";
    drawCards(this.hand, pcContainer, "pc");
  }
}

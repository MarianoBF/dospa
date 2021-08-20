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
    pcContainer.innerHTML = "";
    humanContainer.innerHTML = "";
    start.disabled = true;
    Human.getCards();
    AI.getCards();
    setTimeout(() => {
      Human.showHumanCards();
      AI.showBackOfCards();
      gameStatus.innerText = "Cartas en la mesa";
    },2500)

  }

  changecards() {
    gameStatus.innerText = "Cambiando cartas";
    let numberCardsToChange;
    while (
      isNaN(numberCardsToChange) ||
      numberCardsToChange < 0 ||
      numberCardsToChange > 5
    ) {
      numberCardsToChange = prompt(
        "¿Querés cambiar cartas? Indicá la cantidad o 0 si te quedás con las que tenés."
      );
    }
    if (numberCardsToChange !== 0) {
      Human.updateCards(numberCardsToChange);
      humanContainer.innerHTML = "";
    }
    change.disabled = true;
    score.disabled = false;
  }

  endRound() {
    gameStatus.innerText = "Preparando siguiente mano...";
    Human.cleanUp();
    AI.cleanUp();
    close.disabled = true;
    this.roundsPlayed++;
    save_load.disabled = true;
  }

  endMatch() {
    save_load.disabled = true;
    pcContainer.innerHTML = "";
    AI.showPCCards();
    gameStatus.innerText += "Partido finalizado";

    let winner;

    if (Human.roundsWon > AI.roundsWon) {
      winner = {
        name: Human.name,
        rounds: Human.roundsWon,
      };
      Human.matchesWon++;
    } else if (AI.roundsWon > Human.roundsWon) {
      winner = {
        name: AI.name,
        rounds: AI.roundsWon,
      };
      AI.matchesWon++;
    } else {
      winner = "Empate";
      Human.matchesTied++;
    }

    let message =
      "El ganador del partido fue " +
      winner.name +
      " con " +
      winner.rounds +
      " manos ganadas. ";

    if (Human.roundsTied > 0) {
      message = message + `\n Además, empataron ${Human.roundsTied} mano(s). `;
    } else {
      message = message + "\n No hubo manos empatadas. ";
    }

    if (winner === "Empate") {
      message = message + "No ganó nadie, perdieron los dos";
    }

    gameStatus.innerText = message;

    console.log(Human.matchesWon, Human.matchesTied, AI.matchesWon)

    humanMatchCounter.value = Human.matchesWon;
    pcMatchCounter.value = AI.matchesWon;
    tiedMatchCounter.value = Human.matchesTied;

    gameStatus.innertext = message;
    start.disabled = false;
  }
}

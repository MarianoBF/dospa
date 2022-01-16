async function getDecks() {
  if (debug) console.log("getting deck");
  let deck;
  //TODO: get several (n) decks
  try {
    let data = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=3"
    );
    deck = await data.json();
    let cards = await fetch(
      "https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=156"
    );
    cards = await cards.json();
    deck.cards = cards.cards;
  } catch {
    gameStatus.innerText =
      "No se pudo traer el mazo. Reiniciando partida y reintentando";
    setTimeout(() => window.location.reload(), 5000);
  }
  return deck;
}

function drawCards(cartas, container, type) {
  if (cartas.length) {
    if (debug) console.log("drawing", cartas);
    if (container == humanContainer) {
      cartas.sort((a, b) => (a.code > b.code ? 1 : -1));
    }
    cartas.forEach((carta) => {
      let img = document.createElement("IMG");
      img.src = carta.image;
      if (type === "human") {
        img.id = carta.code;
        img.addEventListener("click", () => {
          match.play(carta);
        });
      }
      container.append(img);
    });
  }
}

function checkCard(card, ref) {
  if (match.endedPickUp) {
    match.endedPickUp = false;
    return true;
  }
  let [numberref, suiteref] = ref.code.split("");
  let [number, suite] = card.code.split("");
  if (number === "4") {
    return true;
  }
  if (numberref === number || suiteref === suite) {
    return true;
  } else {
    return false;
  }
}

function showRulesModal() {
  let modal = document.getElementById("modal");
  let closeModal = document.getElementById("modalClose");

  modal.classList.add("openModal");

  closeModal.addEventListener("click", () => {
    modal.classList.remove("openModal");
  });
}

async function getDecks() {
  console.log("getting deck");
  let deck;
  //TODO: get several (n) decks
  try {
    let data = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=5"
    );
    deck = await data.json();
    let cards = await fetch(
      "https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=260"
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

function showRules() {
  alert(
    `Dos para el Lobo recauchutado. 
      Para ganar, debés quedarte sin cartas. 
      Sólo podés colocar una carta del mismo palo o número, o bien un 4.
      Si tirás un 10, ¡tirás otra carta! (del mismo palo)
      Si ninguna de tus cartas coincide, debés levantar una (click en el pozo!). 
      También podés levantar por gusto.
      La máquina va a tirar su carta si tiene o levantar una si no tiene.
      Si te equivocás, se te penalizará con cartas extra
      Si pasás de las 12 cartas en mano, perdés
      Se juega con 5 mazos, así que te podes encontrar con cartas repetidas`
  );
}

function checkCard(card, ref) {
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

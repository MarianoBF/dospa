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
    if (debug) console.log(cartas)
    if (container == humanContainer) {
      cartas.sort((a,b)=>a.code>b.code?1:-1)
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

function showRules() {
  alert(
    `Dos para el Lobo recauchutado. 
      Para ganar, debés quedarte sin cartas. 
      La carta inicial no influye en el juego, incluso si es una carta especial, es sólo para disparar la acción.
      Sólo podés colocar una carta del mismo palo o número que la que está en la pila de descarte, o bien un 4 que funciona como comodín (luego sigue el palo del 4).
      Si tirás un 10 o J, ¡tirás otra carta! (del mismo palo)
      Si alguna tira un 2, el otro debe tirar un 2, o levantar carta si no tiene ninguno. Después el oponente sigue tirando cualquier carta. Pero si tirás una carta que no corresponde, te penalizarán con 3 cartas, más una por cada ronda de 2 acumulada (o esta última cantidad si levantás del pozo cuando no tengas).
      Si ninguna de tus cartas coincide, debés levantar una (¡click en el pozo!). 
      También podés levantar por gusto.
      La máquina va a tirar su carta si tiene o levantar una si no tiene.
      Si te equivocás, se te penalizará con cartas extra.
      Si pasás de las 12 cartas en mano, perdés.
      Se juega con 3 mazos, así que te podes encontrar con cartas repetidas, cuando encuentres que la carta en el descarte coincide con alguna de las que vos tenés, podés apretar el botón !Dospa¡, lo que va a poner esa carta sobre la mesa, de manera paralela al flujo de juego. Pero si lo apretás y no está OK vas a levantar tres cartas. Cuidado que la PC puede utilizar cada tanto esta regla también.`
  );
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

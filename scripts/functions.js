async function getFullDeck() {
  let auxDeck;
  try {
    let data = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    auxDeck = await data.json();
  } catch {
    alert("No se puedo traer el mazo. Reiniciando partida y reintentando");
    window.location.reload();
  }
  return auxDeck;
}

async function auxGetCards(number) {
  let id = deck.getId();
  try {
    let data = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${number}`
    );
    cards = await data.json();
  } catch {
    if (match.errors >= 5) {
      alert(
        "El servidor está dando demasiados errores. Reiniciando la partida..."
      );
      window.location.reload();
    }
    alert(
      "No se pudieron traer las cartas, hubo un problema en el servidor. Reintentando..."
    );
    match.errors++;
    auxGetCards();
  }
  return cards.cards;
}

async function auxSendToPile(card) {
  console.log("card to pot", card)
  let id = deck.getId();
  try {
    let data = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/pile/pot/add/?cards=${card}`
    );
    let pot = await data.json();
    console.log(pot)
  } catch (error) {
    console.log(error) 
  }
  return pot.cards;
}

function drawCards(cartas, container) {
  cartas.forEach(carta => {
    let img = document.createElement("IMG");
    img.src = carta.image;
    container.append(img);
  });
}

function addScore(hand) {
  let sum = 0;
  hand.forEach(element => {
    element.value === "JACK" ||
    element.value === "QUEEN" ||
    element.value === "KING"
      ? (element.value = 10)
      : null;
    element.value === "ACE" ? (element.value = 15) : null;
    sum += +element.value;
  });
  return sum;
}

function showRules() {
  alert(
      `Dos para el Lobo old school. 
      Clickeá en el mazo para levantar otra!`
    );
}


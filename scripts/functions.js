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
  let retry = false;
  do {
  try {
    let data = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${number}`
    );
    cards = await data.json();
    errors = false;
  } catch {
    retry = prompt("No se pudieron traer las cartas, hubo un problema en el servidor ¿Reintentamos?")
  } } while (retry === true)
  return cards.cards;
}

async function auxSendToPile(card) {
  console.log("card to pot", card)
  let id = deck.getId();
  let discard;
  try {
    let data = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/pile/discard/add/?cards=${card}`
    );
    discard = await data.json();
  } catch (error) {
    console.log(error) 
  }
  return discard;
}

function drawCards(cartas, container, type) {
  cartas.forEach(carta => {
    let img = document.createElement("IMG");
    img.src = carta.image;
    if (type === "human") {
      img.id = carta.code;
      img.addEventListener("click", () => {
      Human.sendToDiscard(carta)
 });
    }
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
      `Dos para el Lobo recauchutado. 
      Para ganar, debés quedarte sin cartas. 
      Sólo podés colocar una carta del mismo palo o número, o bien un 4.
      Si ninguna de tus cartas coincide, debés levantar una (click en el pozo!). 
      También podés levantar por gusto.
      Si te equivocás, se te penalizará con cartas extra
      Podés tener hasta 12 cartas, si pasás de las 12, perdés`
    );
}

function checkCard(card, ref) {
  const [numberref, suiteref] = ref.code.split("")
  const [number, suite] = card.code.split("")
  number === "0" ? (number = 10) : null;
  numberref === "0" ? (numberref = 10) : null;
  if (number === "4") {
    return true }
  if (numberref === number || suiteref === suite) {
    return true
  } else {
    return false
  }

}
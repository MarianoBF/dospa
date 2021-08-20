class Deck {
  constructor() {
    this.id = 0;
    this.availableCards = 0;
    this.cards = [];
    this.pot = [];
    this.discard = [];
  }

  getId() {
    return this.id;
  }

  startMatch() {
    getFullDeck()
      .then(data => {
        this.id = data.deck_id;
        this.availableCards = data.remaining;
      })
      .catch(error => console.log(error));
  }

  getTopOfDiscardPile() {
  return this.discard[this.discard.length - 1];        
  }

  sendToDiscard(card) {
    this.discard.push(card)
    discardImage.src = card.image;
  }

  shufflePile(){

  }
}

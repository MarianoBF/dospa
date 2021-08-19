class Deck {
  constructor() {
    this.id = 0;
    this.availableCards = 0;
    this.cards = [];
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
}

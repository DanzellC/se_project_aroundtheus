export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Event Listeners

  _setEventListeners() {
    const likeButton = this.cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
    //
    const deleteButton = this.cardElement
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  // Handlers

  _handleDeleteCard() {
    this._cardElement.remove();
    this.cardElement = null;
  }

  _handleImageClick() {
    this.cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this.cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
  }
}

export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Event Listeners

  _setEventListeners() {
    const likeButton = this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
    //
    const deleteButton = this._cardElement
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  // Handlers

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}

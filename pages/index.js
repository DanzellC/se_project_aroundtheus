import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//  ELEMENTS //
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-modal-close"
);
const addCardModalCloseButton = profileAddModal.querySelector(
  "#profile-modal-close"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardFormElement = profileAddModal.querySelector("#add-card-form");
const cardTitleInput = addCardFormElement.querySelector("#add-card-title");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalImage = document.querySelector(".modal__preview-image");
const previewCloseModal = previewImageModal.querySelector(
  "#modal-close-button"
);
const previewCaption = document.querySelector(".modal__image-caption");

const editFormElement = document.querySelector(".modal__form");
const addFormElement = document.querySelector("#add-card-form");
const formValadationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// const addFormValidator = new FormValidator(validationSettings, addFormElement);
//
//---------FORM INFO--------------//
const cardUrlInput = addCardFormElement.querySelector("#add-card-url");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
};

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//const editFormValidator = new FormValidator(
//validationSettings,
// profileEditForm
// );

//const addFormValidator = new FormValidator(
//validationSettings,
//addCardFormElement
//);
//-------FUNCTION-------- //
// function createCard({ name, link }) {
//   const cardInstance = new Card(
//     {
//       name,
//       link,
//     },
//     "#card-template",
//     previewImageModal
//   ).getView();
//   return cardInstance;
// }
// function renderCard(cardData, wrapper) {
//   const cardElement = createCard(cardData);
//   wrapper.prepend(cardElement);
// }

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeModalOnEscape);
  modal.removeEventListener("click", closeModalOnMouseDown);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalOnEscape);
  modal.addEventListener("click", closeModalOnMouseDown);
}

function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function closeModalOnMouseDown(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

// // Need to remove//
// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButtons = cardElement.querySelector(".card__like-button");
//   const cardDeleteEl = cardElement.querySelector(".card__delete");

//   likeButtons.addEventListener("click", () => {
//     likeButtons.classList.toggle("card__like-button_active");
//   });

//   cardDeleteEl.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImageEl.addEventListener("click", () => {
//     openModal(previewImageModal);
//     previewModalImage.src = cardData.link;
//     previewModalImage.alt = cardData.name;
//     previewCaption.textContent = cardData.name;
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;
//   return cardElement;
// }

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.getView();
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function handleImageClick(card) {
  previewModalImage.src = card.link;
  previewModalImage.alt = card.name;
  previewCaption.textContent = card.name;
  openModal(previewImageModal);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  editFormValidator.disableButton(handleProfileEditSubmit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardFormElement.reset();
  closeModal(profileAddModal);
  addFormValidator.disableButton(handleAddCardFormSubmit);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(profileAddModal));

//--------------------------//
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//const editFormValidator = new FormValidator(formValadationConfig);
//const addFormValidator = new FormValidator(formValadationConfig);

const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// const editFormValidator = new FormValidator(
//validationSettings,
//editFormElement
//);

//
//editFormValidator.enableValidation();
//addFormValidator.enableValidation();

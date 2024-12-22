import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import popupWithImage from "../components/popupWithImage.js";
import popupWithForm from "../components/popupWithForm.js";
import Section from "../components/section.js";
import UserInfo from "../components/userInfo.js";
import { initialCards, config } from "../utils/constants.js";

//  ELEMENTS //
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardFormElement = profileAddModal.querySelector("#add-card-form");
const profileEditForm = profileEditModal.querySelector(".modal__form");

/*Imported Classes*/

const popupWithEditModal = new popupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  console.log(handleProfileEditSubmit)
);

const popupWithAddModal = new popupWithForm(
  "#profile-add-modal",
  handleAddCardFormSubmit
);

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  popupWithEditModal.open();
});

addNewCardButton.addEventListener("click", () => {
  popupWithAddModal.open();
});

const imagePopup = new popupWithImage("#preview-image-modal");

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

popupWithEditModal.setEventListeners();
popupWithAddModal.setEventListeners();
imagePopup.setEventListeners();
/*__________________________*/

/*Imported Classes Function*/

function handleImageClick(data) {
  imagePopup.open({ name: data.name, link: data.link });
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  console.log(cardData);
  const cardElement = getCardElement(cardData);
  section.addItem(cardElement);
}
/*__________________________*/

/*Imported Event Handlers*/

function handleProfileEditSubmit({ title, description }) {
  userInfo.setUserInfo({
    name: title,
    description: description,
  });
  popupWithEditModal.close();
}

function handleAddCardFormSubmit(inputValue) {
  const cardData = {
    name: inputValue.title,
    link: inputValue.url,
  };
  renderCard(cardData);
  addCardFormElement.reset();
  addFormValidator.disableButton();
  popupWithAddModal.close();
}

const addFormValidator = new FormValidator(config, addCardFormElement);

const editFormValidator = new FormValidator(config, profileEditForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//__________________________________________________________________//

/*__________________________*/

// const profileModalCloseButton = profileEditModal.querySelector(
//   "#profile-modal-close"
// );
// const addCardModalCloseButton = profileAddModal.querySelector(
//   "#profile-modal-close"
// );
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");

// const cardTitleInput = addCardFormElement.querySelector("#add-card-title");
// const previewImageModal = document.querySelector("#preview-image-modal");
// const previewModalImage = document.querySelector(".modal__preview-image");
// const previewCloseModal = previewImageModal.querySelector(
//   "#modal-close-button"
// );
// const previewCaption = document.querySelector(".modal__image-caption");

// //
// //---------FORM INFO--------------//
// const cardUrlInput = addCardFormElement.querySelector("#add-card-url");

// const cardListEl = document.querySelector(".cards__list");
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keyup", closeModalOnEscape);
//   modal.removeEventListener("click", closeModalOnMouseDown);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keyup", closeModalOnEscape);
//   modal.addEventListener("click", closeModalOnMouseDown);
// }

// function closeModalOnEscape(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".modal_opened");
//     if (openedPopup) {
//       closeModal(openedPopup);
//     }
//   }
// }

// function closeModalOnMouseDown(evt) {
//   if (
//     evt.target === evt.currentTarget ||
//     evt.target.classList.contains("modal__close")
//   ) {
//     closeModal(evt.currentTarget);
//   }
// }

// function getCardElement(cardData) {
//   const card = new Card(cardData, "#card-template", handleImageClick);
//   return card.getView();
// }

// function renderCard(cardData, cardListEl) {
//   const cardElement = getCardElement(cardData);
//   cardListEl.prepend(cardElement);
// }

// function handleImageClick(card) {
//   previewModalImage.src = card.link;
//   previewModalImage.alt = card.name;
//   previewCaption.textContent = card.name;
//   openModal(previewImageModal);
// }

// function handleProfileEditSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closeModal(profileEditModal);
// }

// function handleAddCardFormSubmit(evt) {
//   evt.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardListEl);
//   closeModal(profileAddModal);
// }

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openModal(profileEditModal);
// });

// addNewCardButton.addEventListener("click", () => openModal(profileAddModal));

// //--------------------------//
// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

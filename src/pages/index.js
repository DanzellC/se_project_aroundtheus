import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
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

const popupWithEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  console.log(handleProfileEditSubmit)
);

const popupWithAddModal = new PopupWithForm(
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

const imagePopup = new PopupWithImage("#preview-image-modal");

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

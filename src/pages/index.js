import "./index.css";
import Api from "../utils/Api.js";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import logoSrc from "../images/logo.svg";
import avatarSrc from "../images/avatar.jpg";
import whitepencilSrc from "../images/pencil-icon-white.png";
import pencilSrc from "../images/pencil.svg";
import plusSrc from "../images/plus.svg";
import closeBtnDarkSrc from "../images/close-btn-dark.svg";
import closeBtnWhiteSrc from "../images/close-btn-white.svg";

const closeDeleteBtnWhite = document.getElementById("close-delete-btn-white");
closeDeleteBtnWhite.src = closeBtnWhiteSrc;
const closePreviewBtnWhite = document.getElementById("close-preview-btn-white");
closePreviewBtnWhite.src = closeBtnWhiteSrc;
const editModalCloseDark = document.getElementById("edit-modal-close-dark");
editModalCloseDark.src = closeBtnDarkSrc;
const newPostCloseIcon = document.getElementById("new-post-close-dark");
newPostCloseIcon.src = closeBtnDarkSrc;
const editAvatarCloseBtn = document.getElementById(
  "edit-profile-avatar-close-dark"
);
editAvatarCloseBtn.src = closeBtnDarkSrc;
const plusIcon = document.getElementById("plus-icon");
plusIcon.src = plusSrc;
const pencilIcon = document.getElementById("pencil-icon");
pencilIcon.src = pencilSrc;
const avatarEditIcon = document.getElementById("avatar-edit-icon");
avatarEditIcon.src = whitepencilSrc;
const avatarImage = document.getElementById("profile-avatar");
const logoImage = document.getElementById("spot-logo");
logoImage.src = logoSrc;

// const initialCards = [
//   {
//     name: "Golden gate bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-profile-modal");
const nameInput = editModal.querySelector("#profile-name-input");
const descriptionInput = editModal.querySelector("#profile-description-input");
const editForm = document.forms["profile-form"];
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newSubmitBtn = newPostModal.querySelector(".modal__btn_save");
const newPostFormEl = document.forms["new-post-form"];
const newPostLink = newPostModal.querySelector("#image-link-input");
const newPostCaption = newPostModal.querySelector("#card-caption-input");
const editAvatarBtn = document.querySelector(".profile__edit-btn_avatar");
const newAvatarModal = document.querySelector("#edit-avatar-modal");
const newAvatarLink = newAvatarModal.querySelector("#avatar-link-input");
const newAvatarFormEl = document.forms["edit-profile-avatar-form"];

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.forms["delete-form"];
const deleteFormCancel = deleteModal.querySelector(".modal__btn_cancel");
let currentModal = "";
let selectedCard, selectedCardId;
const closeButtons = document.querySelectorAll(".modal__btn_close");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "448bc9ed-2ae3-4487-8217-350036072ca9",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach(function (item) {
      renderCard(item, "append");
    });
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    avatarImage.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_active");
  }
  cardImage.alt = data.name;
  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardLikeBtn.addEventListener("click", (evt) => {
    handleCardLike(evt, data);
  });
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data)
  );
  cardImage.addEventListener("click", () => {
    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewModal);
  });
  return cardElement;
}

function handleEditAvatar(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, "Saving...");

  setTimeout(() => {
    api
      .editAvatar({ avatar: newAvatarLink.value })
      .then((res) => {
        avatarImage.src = res.avatar;
        closeModal(newAvatarModal);
      })
      .catch(console.error)
      .finally(() => {
        setButtonText(evt.submitter, "Save");
      });
  }, 2000);
  // api.editAvatar({ avatar: newAvatarLink.value }).then((res) => {
  //   avatarImage.src = res.avatar;
  // });
}

newAvatarFormEl.addEventListener("submit", handleEditAvatar);

function handleCardLike(evt, data) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  console.log(isLiked);
  api
    .toggleLike(data._id, isLiked)
    .then((res) => {
      console.log(res);
      evt.target.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  currentModal = modal;
  document.addEventListener("keydown", handleEscapePress);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapePress);
  currentModal = "";
}

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

function handleEscapePress(evt) {
  if (evt.key === "Escape") {
    closeModal(currentModal);
  }
}

editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetValidation(editForm, [nameInput, descriptionInput], settings);
  openModal(editModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

editAvatarBtn.addEventListener("click", function () {
  openModal(newAvatarModal);
});

function setButtonText(btn, text) {
  btn.textContent = text;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, "Saving...");

  setTimeout(() => {
    api
      .editUserInfo({ name: nameInput.value, about: descriptionInput.value })
      .then((userInfo) => {
        profileName.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        closeModal(editModal);
      })
      .catch(console.error)
      .finally(() => {
        setButtonText(evt.submitter, "Save");
      });
  }, 2000);
}

editForm.addEventListener("submit", handleEditFormSubmit);

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, "Saving...");

  setTimeout(() => {
    api
      .addNewCard({
        name: newPostCaption.value,
        link: newPostLink.value,
      })
      .then((card) => {
        renderCard(card, "prepend");
        evt.target.reset();
        disableButton(newSubmitBtn, settings);
        closeModal(newPostModal);
      })
      .catch(console.error)
      .finally(setButtonText(evt.submitter, "Save"));
  }, 2000);
}

newPostFormEl.addEventListener("submit", handleNewPostFormSubmit);

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.submitter, "Deleting...");

  setTimeout(() => {
    api
      .removeCard(selectedCardId)
      .then(() => {
        selectedCard.remove();
        closeModal(deleteModal);
      })
      .catch(console.error)
      .finally(setButtonText(evt.submitter, "Delete"));
  }, 1500);
}

function handleDeleteCancel() {
  setButtonText(deleteFormCancel, "Canceling...");
  setTimeout(() => {
    closeModal(deleteModal);
    setButtonText(deleteFormCancel, "Cancel");
  }, 1500);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);
deleteFormCancel.addEventListener("click", handleDeleteCancel);

const onClickOff = () => {
  const modalList = document.querySelectorAll(".modal");
  modalList.forEach((formEl) => {
    formEl.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("modal")) {
        closeModal(formEl);
      }
    });
  });
};

onClickOff();

enableValidation(settings);

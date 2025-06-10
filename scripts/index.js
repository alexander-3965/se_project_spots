const initialCards = [
  {
    name: "Golden gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editModal.querySelector(".modal__close-btn");
const nameInput = editModal.querySelector("#profile-name-input");
const descriptionInput = editModal.querySelector("#profile-description-input");
const editForm = editModal.querySelector(".modal__form");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newSubmitBtn = newPostModal.querySelector(".modal__save-btn");
const newCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const newPostLink = newPostModal.querySelector("#image-link-input");
const newPostCaption = newPostModal.querySelector("#card-caption-input");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn_image");
let currentModal = "";

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.alt = data.name;
  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewModal);
  });
  return cardElement;
}

previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  currentModal = modal;
  document.addEventListener("keydown", escapePress);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", escapePress);
  currentModal = "";
}

function escapePress(evt) {
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

editCloseBtn.addEventListener("click", function () {
  closeModal(editModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editModal);
}

editForm.addEventListener("submit", handleEditFormSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: newPostCaption.value,
    link: newPostLink.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(newSubmitBtn, settings);
  closeModal(newPostModal);
}

newPostFormEl.addEventListener("submit", handleNewPostFormSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

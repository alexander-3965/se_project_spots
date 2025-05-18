const initialCards = [
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
const newCloseBtn = newPostModal.querySelector(".modal__close-btn");
const NewPostFormEl = newPostModal.querySelector(".modal__form");
const newPostLink = newPostModal.querySelector("#image-link-input");
const newPostCaption = newPostModal.querySelector("#card-caption-input");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
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
  console.log(newPostLink.value);
  console.log(newPostCaption.value);
  closeModal(newPostModal);
}

NewPostFormEl.addEventListener("submit", handleNewPostFormSubmit);

initialCards.forEach(function (card) {
  console.log(card.name);
});

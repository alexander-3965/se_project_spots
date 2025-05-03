const editProfileBtn = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-profile-modal");
const editCloseBtn = editModal.querySelector(".modal__close-btn");
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newCloseBtn = newPostModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editModal.classList.add("modal_is-opened");
});

editCloseBtn.addEventListener("click", function () {
  editModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

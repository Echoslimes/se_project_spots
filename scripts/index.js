const initialCards = [
    {
     name: "Golden Gate Bridge",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
    },
    {
     name: "Val Thorens",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
    },
    {
     name: "Restaurant terrace",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
    },
    {
     name: "An outdoor cafe",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
    },
    {
     name: "A very long bridge, over the forest and through the trees",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
    },
    {
     name: "Tunnel with morning light",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
    },
    {
     name: "Mountain house",
     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
    }
];


const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = document.forms["profile-form"];
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormEl = document.forms["new-post-form"];
const nameInput = newPostModal.querySelector("#card-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewCaptionElement = previewModal.querySelector(".modal__caption");

previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
});

function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitleElement = cardElement.querySelector(".card__title");
    const cardImageElement = cardElement.querySelector(".card__image");


    cardImageElement.src = data.link;
    cardImageElement.alt = data.name;
    cardTitleElement.textContent = data.name;

    const cardLikeBtnElement = cardElement.querySelector(".card__like-btn");
    cardLikeBtnElement.addEventListener("click", () => {
        cardLikeBtnElement.classList.toggle("card__like-btn_active");
    });
    
    const cardDeleteBtnElement = cardElement.querySelector(".card__delete-btn");
    cardDeleteBtnElement.addEventListener("click", () => {
        cardElement.remove();
    });

    cardImageElement.addEventListener("click", () => {
        previewCaptionElement.textContent = data.name;
        previewImageElement.src = data.link;
        previewImageElement.alt = data.name;
        openModal(previewModal);
    });

    return cardElement;
}



function openModal(modal){
    modal.classList.add("modal_is-opened");
}

function closeModal(modal){
    modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
    closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
    openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
    closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
    evt.preventDefault();

    const inputValues = {
      name: nameInput.value,
      link: linkInput.value,
    };

    const cardElement = getCardElement(inputValues);
    cardList.prepend(cardElement);
    closeModal(newPostModal);

    addCardFormEl.reset();
}

addCardFormEl.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
    const cardElement = getCardElement(item);
    cardList.append(cardElement);
});
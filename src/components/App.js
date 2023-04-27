import '../App.css';

import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'

function App() {
  // Переменные состояния
  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupAddOpen, setPopupAddOpen] = useState(false);
  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Обработчик клика для попап редактирования
  function handleEditProfileClick() {
    setIsPopupEditOpen(true);
  }
  // Обработчик клика для попап добавления карточки
  function handleAddPlaceClick() {
    setPopupAddOpen(true);
  }
  // Обработчик клика для попап редактирования аватара
  function handleEditAvatarClick() {
    setIsPopupEditAvatarOpen(true);
  }

  // обработчик клика по карточке
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обработчик клика по крестику (закрытия попапов)
  function closeAllPopups() {
    setIsPopupEditOpen(false);
    setPopupAddOpen(false);
    setIsPopupEditAvatarOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="root">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} />
      <Footer />

      {/* Попап редактирования имени и описания профиля */}
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isPopupEditOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить">
        
        <input
          type="text"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Ваше имя"
          required
          id="name-input"
          minLength="2"
          maxLength="20"/>
        <span
          className="form__input-error"
          id="name-input-error">
        </span>
        <input
          type="text"
          className="popup__input popup__input_type_description"
          name="info"
          placeholder="Расскажите о себе"
          required
          id="description-input"
          minLength="2"
          maxLength="200"/>
        <span
          className="form__input-error"
          id="description-input-error">
        </span>

      </PopupWithForm>

      {/* Попап добавления карточки */}
      <PopupWithForm
        name="add"
        title="Новое место"
        isOpen={isPopupAddOpen}
        onClose={closeAllPopups}
        buttonText="Создать">

        <input
          type="text"
          className="popup__input popup__input_type_place-name"
          name="place-name"
          placeholder="Название"
          required
          id="place-name-input"
          minLength="2"
          maxLength="30"/>
        <span
          className="form__input-error"
          id="place-name-input-error">
        </span>
        <input
          type="url"
          className="popup__input popup__input_type_place-link"
          name="place-link"
          placeholder="Cсылка на картинку"
          required
          id="place-link-input"/>
        <span
          className="form__input-error"
          id="place-link-input-error">
        </span>

      </PopupWithForm>

      {/* Попап удаления карточки */}
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        buttonText="Да"> 
      </PopupWithForm>

      {/* Попап редактирования аватара профиля */}
      <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        isOpen={isPopupEditAvatarOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить">

        <input
          type="url"
          className="popup__input popup__input_type_avatar-link"
          name="avatar-link"
          placeholder="Ссылка на фото"
          required
          id="avatar-link-input"/>
        <span
          className="form__input-error"
          id="avatar-link-input-error">
        </span>

      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;

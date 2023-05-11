import '../App.css';

import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {
  // Переменные состояния
  const [isPopupEditOpen, setIsPopupEditOpen] = React.useState(false);
  const [isPopupAddOpen, setPopupAddOpen] = React.useState(false);
  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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

  // Обработчик клика про лайку
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      });
  }

  // Обработчик клика по корзине
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log('Ошибка: ', err));
  }

  // Обновление данных пользователя
  function handleUpdateUser(data) {
    api.setUserInfo({
      name: data.name,
      about: data.about,
    })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err));
  }

  // Обновление аватара профиля
  function handleUpdateAvatar(data) {
    api.editAvatar({ avatar: data.avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err));
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard({
      name: data.name,
      link: data.link
    })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err));
  }

  // Эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения
  React.useEffect(() => {
    // Получение данных пользователя и начальных карточек с сервера вместе
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCardsData]) => {
        setCurrentUser(userData);
        setCards(initialCardsData);
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }, [])

  return (
    <div className="root">
      {/* «Внедряем» данные с помощью провайдера контекста */}
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />
        <Footer />

        {/* Попап редктирования профиля*/}
        <EditProfilePopup
          isOpen={isPopupEditOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Попап добавления карточки */}
        <AddPlacePopup
          isOpen={isPopupAddOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        {/* Попап удаления карточки */}
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да">
        </PopupWithForm>

        {/* Попап редактирования аватара профиля */}
        <EditAvatarPopup
          isOpen={isPopupEditAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  // Переменные состояния
  const [userInfo, setUserInfo] = useState('');
  const [cards, setCards] = useState([]);

    React.useEffect(() => {
      // Получение данных пользователя и начальных карточек с сервера вместе
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCardsData]) => {
          setUserInfo(userData);
          setCards(initialCardsData);

        })
        .catch((err) => {
          console.log('Ошибка при получении данных юзера и карточек: ', err);
        })      
    },[])

  return (
      <main className="main">
      <section className="profile">
        <button className="profile__btn-edit-avatar button" type="button" onClick={props.onEditAvatar}>
          <img className="profile__avatar" alt="Фото Жак-Ив Кусто" src={userInfo.avatar} />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userInfo.name}</h1>
          <button className="button profile__btn-edit" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__description">{userInfo.about}</p>
        </div>
        <button className="button profile__btn-add" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements" aria-label="Фотогалерея пользователя">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
        </section>
      </main>
  )
}

export default Main;
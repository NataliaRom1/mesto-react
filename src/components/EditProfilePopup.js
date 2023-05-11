import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// Попап «Редактировать профиль»
function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();     // Запрещаем браузеру переходить по адресу формы

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    < PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">

      <input
        value={name}
        onChange={handleNameChange}
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Ваше имя"
        required
        id="name-input"
        minLength="2"
        maxLength="20" />
      <span
        className="form__input-error"
        id="name-input-error">
      </span>
      <input
        value={description}
        onChange={handleDescriptionChange}
        type="text"
        className="popup__input popup__input_type_description"
        name="info"
        placeholder="Расскажите о себе"
        required
        id="description-input"
        minLength="2"
        maxLength="200" />
      <span
        className="form__input-error"
        id="description-input-error">
      </span>
    </PopupWithForm >
  )
}

export default EditProfilePopup;
import React from 'react';
import PopupWithForm from './PopupWithForm';

// Попап «Редактировать аватар профиля»
function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  // Очищение инпута
  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();   // Запрещаем браузеру переходить по адресу формы

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать">

      <input
        value={name}
        onChange={handleNameChange}
        type="text"
        className="popup__input popup__input_type_place-name"
        name="place-name"
        placeholder="Название"
        required
        id="place-name-input"
        minLength="2"
        maxLength="30" />
      <span
        className="form__input-error"
        id="place-name-input-error">
      </span>
      <input
        value={link}
        onChange={handleLinkChange}
        type="url"
        className="popup__input popup__input_type_place-link"
        name="place-link"
        placeholder="Cсылка на картинку"
        required
        id="place-link-input" />
      <span
        className="form__input-error"
        id="place-link-input-error">
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
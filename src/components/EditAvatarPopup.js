import React from 'react';
import PopupWithForm from './PopupWithForm';

// Попап «Редактировать аватар профиля»
function EditAvatarPopup(props) {
  const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();   // Запрещаем браузеру переходить по адресу формы

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  // Очищение инпута
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">

      <input
        ref={avatarRef}
        type="url"
        className="popup__input popup__input_type_avatar-link"
        name="avatar-link"
        placeholder="Ссылка на фото"
        required
        id="avatar-link-input" />
      <span
        className="form__input-error"
        id="avatar-link-input-error">
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
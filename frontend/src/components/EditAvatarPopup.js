import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import { AppContext } from '../contexts/AppContext.js';

export default function EditAvatarPopup({onUpdateAvatar, isOpen}) {

  const app = React.useContext(AppContext);
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return(
    <PopupWithForm onClose={app.closeAllPopups} isOpen={isOpen} onSubmit={handleSubmit} title="Обновить аватар" name="avatar" button={app.isLoading? 'Сохранение...' : 'Сохранить'}>
      <input ref={avatarRef} id="avatar-link-input" className="popup__input" type="url" name="avatar" placeholder="Ссылка на новый аватар" required/>
      <span className="avatar-link-input-error popup__error popup__error_visible"></span>
    </PopupWithForm>
  )
}

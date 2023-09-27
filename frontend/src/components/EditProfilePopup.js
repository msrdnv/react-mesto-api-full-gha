import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import { AppContext } from '../contexts/AppContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useForm } from '../hooks/useForm';

export default function EditProfilePopup ({onUpdateUser, isOpen}) {

  const app = React.useContext(AppContext);
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({name: currentUser.name, about: currentUser.about});

  React.useEffect(() => {
    setValues({name : currentUser.name, about : currentUser.about})
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm onClose={app.closeAllPopups} isOpen={isOpen} onSubmit={handleSubmit} title="Редактировать профиль" name="profile" button={app.isLoading? 'Сохранение...' : 'Сохранить'}>
      <input id="name-input" className="popup__input" type="text" name="name" value={values.name ?? 'Жак-Ив Кусто'} onChange={handleChange} minLength="2" maxLength="40" placeholder="Имя" required/>
      <span className="name-input-error popup__error popup__error_visible"></span>
      <input id="about-input" className="popup__input" type="text" name="about" value={values.about ?? 'Исследователь океана'} onChange={handleChange} minLength="2" maxLength="200" placeholder="О себе" required/>
      <span className="about-input-error popup__error popup__error_visible"></span>
    </PopupWithForm>
  )
}

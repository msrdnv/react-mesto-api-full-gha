import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import { AppContext } from '../contexts/AppContext.js';
import { useForm } from '../hooks/useForm';

export default function AddPlacePopup ({onAddPlace, isOpen, isAdd}) {

  const app = React.useContext(AppContext);
  const {values, handleChange, setValues} = useForm({name: '', link: ''});

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  React.useEffect(() => {
    setValues({name: '', link: ''});
  }, [isAdd, setValues])

  return (
    <PopupWithForm onClose={app.closeAllPopups} isOpen={isOpen} onSubmit={handleSubmit} title="Новое место" name="card" button={app.isLoading? 'Создание...' : 'Создать'}>
      <input id="card-name-input" className="popup__input" type="text" name="name" value={values.name} onChange={handleChange} minLength="2" maxLength="30" placeholder="Название" required/>
      <span className="card-name-input-error popup__error popup__error_visible"></span>
      <input id="link-input" className="popup__input" type="url" name="link" value={values.link} onChange={handleChange} placeholder="Ссылка на картинку" required/>
      <span className="link-input-error popup__error popup__error_visible"></span>
    </PopupWithForm>
  )
}

import React from 'react';
import { AppContext } from '../contexts/AppContext.js';
import usePopupClose from '../hooks/usePopupClose.js';

export default function PopupWithForm({name, button, title, children, isOpen, onSubmit}) {

  const app = React.useContext(AppContext);
  usePopupClose(isOpen, app.closeAllPopups);

  return (
    <div className={isOpen ? `popup ${name}-popup popup_opened` : `popup ${name}-popup`}>
      <div className={name === "confirmation" ? "popup__container popup__container_place-confirmation" : "popup__container" && name === "avatar" ? "popup__container popup__container_place-avatar" : "popup__container"}>
        <button className="popup__close-icon" type="button" onClick={app.closeAllPopups}></button>
        <h2 className={name === "confirmation" ? "popup__title popup__title_place-confirmation" : "popup__title"}>{title}</h2>
        <form onSubmit={onSubmit} className="popup__form" name={`${name}-form`}>
          {children}
          <button className="popup__submit-button" type="submit">{button}</button>
        </form>
      </div>
    </div>
  )
}

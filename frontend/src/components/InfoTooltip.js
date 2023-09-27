import React from 'react';
import { AppContext } from '../contexts/AppContext.js';
import usePopupClose from '../hooks/usePopupClose.js';

import imagePositive from '../images/info-image-positive.svg';
import imageNegative from '../images/info-image-negative.svg';

export default function InfoTooltip ({isSuccess, isOpen}) {

  const app = React.useContext(AppContext);
  usePopupClose(isOpen, app.closeAllPopups);

  return (
    <div className={isOpen ? "popup popup_opened" : "popup"}>
      <div className="popup__container popup__container_place-info">
        <button className="popup__close-icon" type="button" onClick={app.closeAllPopups}></button>
        <img className="popup__info-image" src={isSuccess ? imagePositive : imageNegative} alt="Изображение статуса регистрации"/>
        <h2 className="popup__info-text">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  )
}

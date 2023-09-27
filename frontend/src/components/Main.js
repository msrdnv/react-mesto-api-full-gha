import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import kusto from '../images/kusto.svg';

export default function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img className="profile__avatar" alt="Аватар профиля" src={currentUser.avatar ?? kusto}/>
            <button className="profile__avatar-update-button" type="button" onClick={onEditAvatar}><div className="profile__avatar-update-icon"></div></button>
          </div>
          <div className="profile__text-data">
            <h1 className="profile__name">{currentUser.name ?? 'Жак-Ив Кусто'}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <h2 className="profile__about">{currentUser.about ?? 'Исследователь океана'}</h2>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <div className="gallery">
        {cards.map((card) => (
          <div key={card._id} className="element">
            <Card onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} card={card}/>
          </div>
        ))}
      </div>
    </main>
  )
};



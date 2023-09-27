import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function Card ({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(item => item === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <>
      {isOwn && <button className="element__delete-button" type="button" onClick={handleDeleteClick}></button>}
      <img className="element__image" src={card.link} alt={`Фотография ${card.name}`} onClick={handleClick}/>
      <h2 className="element__name">{card.name}</h2>
      <div className="element__like-container">
        <button onClick={handleLikeClick} className={`element__like-button ${isLiked && 'element__like-button_activated'}`} type="button"></button>
        <h3 className="element__like-counter">{card.likes.length}</h3>
      </div>
    </>
  )
}

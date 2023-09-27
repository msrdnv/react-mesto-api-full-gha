import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js'
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import { api } from '../utils/api.js';
import { authApi } from '../utils/auth.js';
import { AppContext } from '../contexts/AppContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({src: "./", isOpen: false});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const [isSuccessRegister, setSuccessRegister] = React.useState(false);
  const [addPlaceInformer, toggleAddPlaceInformer] = React.useState(false);
  const [isMobNavMenuActive, setMobNavMenuActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('email@mail.com');

  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData)
      setCards(cards)
    })
    .catch(console.error);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    authApi.checkToken(token)
    .then(({data}) => {
      setEmail(data.email);
      setLoggedIn(true);
      navigate('/');
    })
    .catch(console.error)
  }, [loggedIn, navigate]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(true);
  }

  function toggleMobNavMenu() {
    setMobNavMenuActive(!isMobNavMenuActive);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({src: "./", isOpen: false});
  }

  function handleCardClick({link, name}) {
    setSelectedCard({link, name, isOpen: true});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => setCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
    .catch(console.error)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
    .catch(console.error)
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({name, about}) {
    function makeRequest() {
      return api.editUserData({name, about}).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({avatar}) {
    function makeRequest() {
      return api.editUserAvatar({avatar}).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit({name, link}) {
    function makeRequest() {
      return api.postNewCard({name, link}).then((newCard) => {
        setCards([newCard, ...cards]);
        toggleAddPlaceInformer(!addPlaceInformer);
      })
    }
    handleSubmit(makeRequest);
  }

  function handleLogin({password, email}) {
    authApi.signIn({password, email})
    .then((data) => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      navigate('/');
    })
    .catch(console.error)
  }

  function handleRegister({password, email}) {
    authApi.signUp({password, email})
    .then(() => setSuccessRegister(true))
    .catch(() => setSuccessRegister(false))
    .catch(console.error)
    .finally(() => handleInfoTooltipOpen())
  }

  function handleSignOut() {
    if (loggedIn) {
      setLoggedIn(false);
      setMobNavMenuActive(false);
      localStorage.removeItem('token');
    }
  }

  return (
    <AppContext.Provider value={{isLoading, closeAllPopups}}>
      <CurrentUserContext.Provider value={currentUser}>
        <ImagePopup card={selectedCard}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isAdd={addPlaceInformer} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit}/>
        <InfoTooltip isSuccess={isSuccessRegister} isOpen={isInfoTooltipOpen}/>
        <PopupWithForm title="Вы уверены?" name="confirmation" button="Да"/>
        <Header onClick={toggleMobNavMenu} isMenuActive={isMobNavMenuActive} loggedIn={loggedIn} email={email} onSignOut={handleSignOut}/>
        <Routes>
          <Route path="*" element={<ProtectedRoute element={Main} cards={cards} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} loggedIn={loggedIn}/>} />
          <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
          <Route path="/signup" element={<Register onRegister={handleRegister}/>} />
        </Routes>
        <Footer/>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}


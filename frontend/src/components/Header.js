import logoMestoWhite from '../images/logo-mesto-white.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({loggedIn, email, onSignOut, isMenuActive, onClick}) {

  const location = useLocation();

  return (
    <header className={isMenuActive ? "header header_mobile-menu-activated" : "header"}>
      <img className="header__logo" src={logoMestoWhite} alt="Логотип Mesto Russia"/>
      <div className={isMenuActive ? "header__nav-container header__nav-container_mobile-menu-activated" : "header__nav-container"}>
        <p className={loggedIn ? (isMenuActive ? "header__email-info header__email-info_mobile-menu-activated" : "header__email-info") : "header__email-info header__email-info_disabled"}>
          {email}
        </p>
        <Link to="/signin" onClick={onSignOut} className={loggedIn ? (isMenuActive ? "header__signout-link header__signout-link_mobile-menu-activated" : "header__signout-link") : "header__signout-link header__signout-link_disabled"}>
          Выйти
        </Link>
        <Link to={location.pathname === "/signin" ? "/signup" : "/signin"} className={loggedIn ? "header__nav-link header__nav-link_disabled" : "header__nav-link"}>
          {location.pathname === "/signin" ? "Регистрация" : "Войти"}
        </Link>
      </div>
      <button onClick={onClick} className={loggedIn ? (isMenuActive ? "header__nav-menu-icon header__nav-menu-icon_toggled" : "header__nav-menu-icon") : "header__nav-menu-icon header__nav-menu-icon_disabled"} type="button"/>
    </header>
  )
};



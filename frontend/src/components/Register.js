import React from 'react';
import { Link } from "react-router-dom"
import { useForm } from '../hooks/useForm';

export default function Register({onRegister}) {

  const {values, handleChange} = useForm({email: '', password: ''});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      password: values.password,
      email: values.email,
    });
  }

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <h2 className="auth-page__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="auth-page__form">
          <input id="email-signup-input" className="auth-page__input" type="email" value={values.email} onChange={handleChange} name="email" placeholder="Email" required/>
          <input id="password-signup-input" className="auth-page__input" type="password" value={values.password} onChange={handleChange} name="password" placeholder="Пароль" required/>
          <button className="auth-page__submit-button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="auth-page__caption">Уже зарегистрированы? <Link to="/signin" className="auth-page__caption-link">Войти</Link></p>
      </div>
    </div>
  )
}

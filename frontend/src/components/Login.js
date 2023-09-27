import React from 'react';
import { useForm } from '../hooks/useForm';

export default function Login({onLogin}) {

  const {values, handleChange} = useForm({email: '', password: ''});

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      password: values.password,
      email: values.email,
    });
  }

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <h2 className="auth-page__title">Вход</h2>
        <form onSubmit={handleSubmit} className="auth-page__form">
          <input id="email-login-input" className="auth-page__input" type="email" value={values.email} onChange={handleChange} name="email" placeholder="Email" required/>
          <input id="password-login-input" className="auth-page__input" type="password" value={values.password} onChange={handleChange} name="password" placeholder="Пароль" required/>
          <button className="auth-page__submit-button" type="submit">Войти</button>
        </form>
      </div>
    </div>
  )
}

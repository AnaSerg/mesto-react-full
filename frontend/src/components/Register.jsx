import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({email, password})
    resetForm();
  }

    return(
      <div className="auth">
        <div className="auth__container">
            <h2 className="auth__welcome">
            Регистрация
            </h2>
            <form onSubmit={handleSubmit} className="auth__form">
            <input className="auth__input" id="email" required name="email" type="email" value={email} placeholder="Email" onChange={({target}) => setEmail(target.value)} />
            <input className="auth__input" id="password" required name="password" type="password" value={password} placeholder="Пароль" onChange={({target}) => setPassword(target.value)} />
            <button type="submit" className="auth__button">Зарегистрироваться</button>
            </form>
            <div className="auth__login-area">
              <p className="auth__reg-question">Уже зарегистрированы?</p>
              <Link to="signin" className="auth__login-link">Войти</Link>
            </div>
        </div>
      </div>
    )
}

export default Register;
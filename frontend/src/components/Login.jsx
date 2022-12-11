import React, { useState }from 'react';

const Login = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email, password})
    }

    return(
      <div className="auth">
        <div className="auth__container">
            <h2 className="auth__welcome">
            Вход
            </h2>
            <form onSubmit={handleSubmit} className="auth__form">
            <input className="auth__input" id="email" required name="email" type="email" value={email} placeholder="Email" onChange={({target}) => setEmail(target.value)} />
            <input className="auth__input" id="password" required name="password" type="password" value={password} placeholder="Пароль" onChange={({target}) => setPassword(target.value)} />
            <button type="submit" className="auth__button">Войти</button>
            </form>
        </div>
      </div>
    )
}

export default Login;
import React from 'react';
import Logo from '../images/logo.svg';
import { Switch, Route, Link } from "react-router-dom";

const Header = ({onSignOut, email}) => {

    return (
            <header className="header">
                <img src={Logo} alt="логотип" className="header__logo"/>
                <Switch>
                    <Route exact path="/signin">
                    <Link to="/signup" className="header__button">
                        Регистрация
                    </Link>
                    </Route>
                    <Route exact path="/signup">
                    <Link to="/signin" className="header__button">
                        Войти
                    </Link>
                    </Route>
                    <Route exact path="/">
                        <div className="header__wrapper">
                            <p className="header__email">{email}</p>
                            <button className="header__button header__button_exit" onClick={onSignOut}>
                                Выйти
                            </button>
                        </div>
                    </Route>
                </Switch>
            </header>
    )
}

export default Header;
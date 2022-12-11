import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUser.Context';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Api from '../utils/api';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoToolTip from './InfoToolTip';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import * as apiAuth from '../utils/apiAuth';

const App = () => {

    const [currentUser, setCurrentUser] = useState({});

    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuccessReg, setSuccessfulReg] = useState(false);
    const [userData, setUserData] = useState({});
    const history = useHistory();
    const [email, setEmail] = useState('');

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [cards, setCards] = useState([]);

    const auth = (jwt) => {
        return apiAuth.getContent(jwt)
        .then((res) => {
            if (res) {
                setEmail(res.data.email);
                setLoggedIn(true);
                setUserData({
                    email: res.data.email,
                    password: res.data.password
                })
            }
        })
        .catch((err) => {
            if (err.status === 400) {
                console.log('400 - токен не передан или передан не в том формате');
            } else if (err.status === 401) {
                console.log('401 - переданный токен некорректен');
            }
        })
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth(jwt);
        }
    }, []);

    useEffect(() => {
        if (loggedIn)  {
          Promise.all([Api.getInitialCards(), Api.getUserInfo()])
          .then(([cards, user]) => {
            setCards(cards.data)
            setCurrentUser(user.data)
            history.push('/');
          })
          .catch((err) => console.log(err))
        }
      }, [loggedIn])

    const onLogin = ({email, password}) => {
        return apiAuth.authorize(email, password)
        .then((res) => {
            if (res.token) {
                setLoggedIn(true);
                setEmail(email);
                localStorage.setItem('jwt', res.token);
            }
        })
        .catch((err) => {
            console.log(err);
            setSuccessfulReg(false);
            setInfoToolTipOpen(true);
        })
    };

    const onRegister = ({email, password}) => {
        return apiAuth.register(email, password)
        .then((res) => {
            if (res && !res.error) {
                setSuccessfulReg(true);
                setInfoToolTipOpen(true);
                history.push('/signin');
            }
        })
        .catch((err) => {
            console.log(err);
            setSuccessfulReg(false);
            setInfoToolTipOpen(true);
        })
    };

    const onSignOut = () => {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/signin');
    }

    const handleLikeCard = (card) => {
        const isLiked = card.likes.some(i => i === currentUser._id);

        Api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleCardDelete = (card) => {
        Api.deleteCard(card._id)
        .then((delCard) => {
            setCards((state) => state.filter((c) => c._id === card._id ? !delCard.data : c));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const closeAllPopups = () => {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setInfoToolTipOpen(false);
    }

    const handleUpdateUser = (data) => {
        Api.sendUserInfo(data)
        .then((user) => {
            setCurrentUser(user.data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleUpdateAvatar = (data) => {
        Api.sendAvatarInfo(data)
        .then((user) => {
            setCurrentUser(user.data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleAddPlaceSubmit = (data) => {
        Api.sendNewCard(data)
        .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <div className="page__container">
                <Header onSignOut={onSignOut} email={email}/>
                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        cards={cards}
                        onEditAvatar = {handleEditAvatarClick}
                        onEditProfile = {handleEditProfileClick}
                        onAddPlace = {handleAddPlaceClick}
                        onCardClick = {handleCardClick}
                        onCardLike={handleLikeCard}
                        onCardDelete={handleCardDelete}
                    />
                    <Route path="/signup">
                        <Register onRegister={onRegister} />
                    </Route>
                    <Route path="/signin">
                        <Login onLogin={onLogin} isSuccess={isSuccessReg} />
                    </Route>
                    <Route path="*">
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                    </Route>
                </Switch>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
                <InfoToolTip isSuccess={isSuccessReg} isOpen={isInfoToolTipOpen} onClose={closeAllPopups}/>
                <ImagePopup card = {selectedCard} onClose = {closeAllPopups}/>

                {loggedIn && <Footer />}
            </div>
        </div>

        </CurrentUserContext.Provider>
    );
}

export default App;

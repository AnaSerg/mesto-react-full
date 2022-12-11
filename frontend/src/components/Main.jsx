import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUser.Context';
import Card from './Card';

const Main = ({cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete}) => {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-area">
                        {currentUser.avatar && (<img src={currentUser.avatar} alt="фотография пользователя" className="profile__avatar" />)}
                        <button onClick={onEditAvatar} className="profile__avatar-button" type="button" aria-label="Изменить аватар пользователя"></button>
                    </div>
                    <div className="profile__text-area">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="button button_type_edit" type="button" aria-label="Изменить информацию о пользователе"></button>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} className="button button_type_add" type="button" aria-label="Добавить новую карточку"></button>
            </section>

            <section className="elements">
                <ul className="elements-list">

                    {cards.map((card) => (
                        <Card key={card._id} likes={card.likes} link={card.link} name={card.name} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;
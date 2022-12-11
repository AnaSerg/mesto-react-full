import React, {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUser.Context';


const Card = ({card, link, likes, name, onCardClick, onCardLike, onCardDelete}) => {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id; // проверка пользователя, который добавил карточку
    const isLiked = likes.some(i => i === currentUser._id); // проверка, поставлен ли лайк текущим пользователем

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
        <li className="element">
            <img className="element__image" onClick={handleClick} src={link} alt={name}/>
            <button className={`element__delete-button ${!isOwn ? 'element__delete-button_hidden' : ""}`} onClick={handleDeleteClick} type="button"></button>
            <div className="element__description">
                <h2 className="element__text">{name}</h2>
                <div className="element__like-area">
                    <button className={`element__like ${isLiked ? 'element__like_active' : ""}`} onClick={handleLikeClick} type="button"></button>
                    <p className="element__like-count">{likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;
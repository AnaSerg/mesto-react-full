import React from 'react';

const ImagePopup = ({card, onClose}) => {

    return (
        <div className={`popup popup_type_big-image ${card ? 'popup_opened' : ""} `}>
            <div className="popup__container">
                <button onClick={onClose} className="button button_type_close" type="button" aria-label="Закрыть попап без сохранения изменений"></button>
                <figure className="popup__image-area">
                    <img src={card?.link} className="popup__image" alt="увеличенное изображение с карточки"/>
                    <figcaption className="popup__image-description">{card?.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;
import React from 'react';

const PopupWithForm = ({name, title, isOpen, onClose, buttonText, children, onSubmit}) => {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ""}`}>
            <div className="popup__container">
                <button onClick={onClose} className="button button_type_close" type="button" aria-label="Закрыть попап без сохранения изменений"></button>
                <form action="#" method="POST" className={`form form_type_${name}`} onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="button button_type_submit" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
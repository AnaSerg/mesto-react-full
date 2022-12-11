import React from 'react';
import SuccessIcon from '../images/SuccessReg.svg';
import FailIcon from '../images/FailReg.svg';

const InfoToolTip = ({ isSuccess, isOpen, onClose }) => {

    return (
        <div className={`popup popup_type_info ${isOpen ? 'popup_opened' : ""}`}>
            <div className="popup__container">
                <button onClick={onClose} className="button button_type_close" type="button" aria-label="Закрыть попап"></button>
                <div className="popup__inner-container">
                    <img src={isSuccess ? SuccessIcon : FailIcon} className="popup__info-image" alt="изображение успешной регистрации"/>
                    <h3 className="popup__info-description">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
                </div>
            </div>
        </div>
    )
}

export default InfoToolTip;
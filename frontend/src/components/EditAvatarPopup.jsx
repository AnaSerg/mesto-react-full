import React, {useState, useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUser.Context';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

    const avatarRef = useRef();
    
    
    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm name='edit-photo' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input className=" form__input form__input_type_profile-photo" ref={avatarRef} id="avatar" name="avatar" type="url" placeholder="Ссылка на фото пользователя" required/>
            <span className="error avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
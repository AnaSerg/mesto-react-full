import React, {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUser.Context';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
          });
    }

    return (
        <PopupWithForm name='edit' title='Редактировать профиль' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input name="name" id="nameUser" type="text" value={name || ''} className=" form__input form__input_type_name" placeholder="Имя" required minLength="2" maxLength="40" onChange={handleChangeName}/>
            <span className="nameUser-error error"></span>
            <input id="about" name="about" type="text" value={description || ''} className=" form__input form__input_type_job" placeholder="О себе" required minLength="2" maxLength="200" onChange={handleChangeDescription}/>
            <span className="about-error error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
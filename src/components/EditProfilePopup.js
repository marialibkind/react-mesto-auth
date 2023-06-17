import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        try {
            setName(currentUser.name)
            setDescription(currentUser.about)
        } catch (error) {
            console.error(error)
        }
    }, [props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({ name, about: description });
    }

    return (
        <PopupWithForm name="profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            buttonText="Сохранить"
            onClose={props.onClose}
            onSubmitButton={handleSubmit}
        >
            <input className="popup__text popup__text_type_name" name="enterName"
                type="text" minLength="2" maxLength="40" onChange={handleChangeName}
                placeholder="Имя" value={name || ''} />
            <span className="input-error-enterName popup__input-error"></span>
            <input className="popup__text popup__text_type_about" name="enterInfo"
                type="text" required="required" minLength="2" maxLength="200"
                onChange={handleChangeDescription} placeholder="Описание" value={description || ''} />
            <span className="input-error-enterInfo popup__input-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup;
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();

        props.onAddPlace({ name, link })
    }

    return (
        <PopupWithForm name="image"
            title="Новое место"
            isOpen={props.isOpen}
            buttonText="Сохранить"
            onClose={props.onClose}
            onSubmitButton={handleSubmit}
        >
            <input className="popup__text popup__text_type_image-name" name="enterName"
                type="text" minLength="4" maxLength="30" placeholder="Название"
                onChange={handleChangeName} value={name} />
            <span className="input-error-enterName popup__input-error"></span>
            <input className="popup__text popup__text_type_image-src" name="enterInfo"
                type="url" required="required" placeholder=" Ссылка на картинку"
                onChange={handleChangeLink} value={link} />
            <span className="input-error-enterInfo popup__input-error"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup;
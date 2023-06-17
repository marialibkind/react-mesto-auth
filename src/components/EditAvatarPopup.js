import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {

    const refInput = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: refInput.current.value,
        });
    }

    return (
        <PopupWithForm name="avatar"
            title="Обновить аватар?"
            isOpen={props.isOpen}
            buttonText="Сохранить"
            onClose={props.onClose}
            onSubmitButton={handleSubmit}
        >
            <input className="popup__text popup__text_type_avatar-link"
                name="avatar" required="required" type="url"
                placeholder="Название" ref={refInput} />
            <span className="input-error-avatar popup__input-error"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;
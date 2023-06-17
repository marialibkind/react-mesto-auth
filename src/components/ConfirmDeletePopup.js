import PopupWithForm from "./PopupWithForm";
import React from "react";

function ConfirmDeletePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.handleConfirmDelete(props.deleteCard);
    }

    return (
        <PopupWithForm name="delete"
            title="Вы уверены?"
            isOpen={props.isOpen}
            buttonText="Да"
            onClose={props.onClose}
            onSubmitButton={handleSubmit}
        />
    )
}
export default ConfirmDeletePopup;
function PopupWithForm({ name, title, isOpen, onClose, buttonText, children, onSubmitButton }) {
    return (
        <div className={`popup popup-${name}  ${isOpen ? 'popup_active' : ''}`}>
            <div className={`popup__container`}>
                <h2 className="popup__title">{title}</h2>
                <form action="#" className={`popup__form form-${name}`} id={name} onSubmit={onSubmitButton}>
                    {children}
                    <button type="submit" className="popup__submit-btn" >
                        {buttonText}
                    </button>
                </form>
                <button onClick={onClose} type="button" className="popup__cross-icon"></button>
            </div>
        </div>
    );

}
export default PopupWithForm;
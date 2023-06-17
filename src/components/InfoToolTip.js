import ok from "../images/ok.svg";
import error from "../images/error.svg";

function InfoToolTip(props) {

    return (
        <div className={`popup  ${props.isOpen ? 'popup_active' : ''}`}>
            <div className={`popup__container`}>
                <img src={props.isStatus ? ok : error} alt="сообщение" className="popup__logo"></img>
                <h2 className="popup__title">{props.message}</h2>
                <button onClick={props.onClose} type="button" className="popup__cross-icon"></button>
            </div>
        </div>

    )
}
export default InfoToolTip;
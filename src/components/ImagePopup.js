function ImagePopup(props) {
	return (
		<div className={`popup popup-fullscreen ${props.isOpen ? "popup_active" : ""}`}>
			<div className="popup__cont">
				<figure className="popup__container-full">
					<img className="popup__image" alt={props.card.name} src={props.card.link} />
					<figcaption className="popup__name">{props.card.name}</figcaption>
				</figure>
				<button className="popup__cross-icon cross-full" type="button" onClick={props.onClose}></button>
			</div>
		</div>
	)
}
export default ImagePopup;
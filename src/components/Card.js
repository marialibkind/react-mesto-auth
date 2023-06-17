import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {

	const currentUser = useContext(CurrentUserContext);
	const isOwn = props.card.owner._id === currentUser._id;
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`element__like ${isLiked && 'element__like_active'}`
	);;

	function openImagePopup() {
		props.onImagePopup(props.card)
	}
	function handleLikeClick() {
		props.onCardLike(props.card);
	}
	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}

	return (
		<div className="element">
			{isOwn && (<button className="element__bin" type="button" aria-label="мусорка" onClick={handleDeleteClick}></button>)}
			<img src={props.card.link} className="element__image" alt={props.card.name} onClick={openImagePopup} />
			<div className="element__line">
				<h2 className="element__name">{props.card.name}</h2>
				<div>
					<button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick}></button>
					<div className="element__like_count">{props.card.likes.length}</div>
				</div>
			</div>
		</div>
	)
}

export default Card;

import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCards } from "../contexts/CurrentCards";


function Main({ onEditAvatar, onEditProfile, onAddPlace, onImagePopup, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const cards = useContext(CurrentCards);

    return (
        <main>
            <section className="profile">
                <img src={currentUser.avatar} className="profile__avatar"
                    alt="профиль"
                />
                <button className="profile__avatar profile__avatar_button"
                    alt="профиль"
                    onClick={onEditAvatar}
                    onClose={onEditAvatar}>
                </button>
                <div className="profile__item">
                    <div className="profile__line">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-btn"
                            type="button"
                            name="edit"
                            aria-label="Close"
                            onClick={onEditProfile}
                            onClose={onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__info">{currentUser.about}</p>
                </div>
                <button className="profile__add-btn"
                    type="button"
                    aria-label="like"
                    onClick={onAddPlace}
                    onClose={onAddPlace}
                ></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => <Card card={card} key={card._id} onImagePopup={onImagePopup}
                        onCardLike={onCardLike} onCardDelete={onCardDelete} />)}
                </ul>
            </section>
        </main>
    )
}
export default Main;
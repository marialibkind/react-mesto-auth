import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/API";
import { CurrentCards } from "../contexts/CurrentCards";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { login, loginWithToken, register } from "../utils/apiAuth";
import InfoToolTip from "./InfoToolTip";


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [cardForDelete, setCardForDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');

  const checkToken = () => {
    if (localStorage.getItem("token")) {
      loginWithToken().then((res) => {
        if (res) {

          setLoggedIn(true);
          navigate("/", { replace: true });
          setUserEmail(res.data.email);
        }
      }).catch((error) => console.error(error))
    }
  }

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      try {
        api.getInitialCards().then((res) => {
          setCards(res)
        })
        api.getUserInfo().then((res) => {
          setCurrentUser(res);
        })
      } catch (error) {
        console.error(error)
      }
    }
  }, [loggedIn])




  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImageClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardDelete(card) {
    setCardForDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((error) => console.error(error))
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo(name, about).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((error) => console.error(error))
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link).then((res) => {
      setCards([res, ...cards]);
      closeAllPopups()
    }).catch((error) => console.error(error))
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar(avatar).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((error) => console.error(error))

  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false)
    setIsToolTipOpen(false);
  }

  function handleConfirmDelete(card) {

    api.deleteCard(card._id).then((res) => {
      setCards((state) => state.filter((item) => (item._id === card._id ? '' : res)));
      closeAllPopups();
    }).catch((error) => console.error(error))
  }

  const navigate = useNavigate();

  function handleLogin({ email, password }) {
    login(email, password).then((res) => {
      if (res != false) {
        setLoggedIn(true);
        navigate("/", { replace: true });
        localStorage.setItem("token", res.token);
        setUserEmail(email);
      }
    }).catch((error) => {
      console.error(error);
      setIsSuccessInfoTooltipStatus(false);
      setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз");
      setIsToolTipOpen(true);
    })
  }

  function handleRegister({ email, password }) {

    register(email, password).then((res) => {
      if (res != false) {
        navigate("/sign-in", { replace: true })
        setIsSuccessInfoTooltipStatus(true);
        setInfoTooltipMessage("Вы успешно зарегистрировались!")
      }

    }).catch((error) => {
      setIsSuccessInfoTooltipStatus(false);
      setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз")
      console.error(error)
    }).finally(() => {
      setIsToolTipOpen(true);
    })

  }

  function logOut() {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
    setIsSuccessInfoTooltipStatus(true);
    setInfoTooltipMessage("Вы успешно вышли!");
    setIsToolTipOpen(true);
    setUserEmail('');
    setLoggedIn(false);
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} onLogout={logOut} />

        <CurrentCards.Provider value={cards}>
          <Routes>
            <Route path="/sign-up" element={<Register registerUser={handleRegister} />} />
            <Route path="/"
              element={<ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onImagePopup={handleImageClick}
                onEditAvatarClose={closeAllPopups}
                onEditProfileClose={closeAllPopups}
                onAddPlaceClose={closeAllPopups}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />} />
            <Route path="/sign-in" element={<Login loginUser={handleLogin} />} />
            <Route path="*"
              element={loggedIn ? (<Navigate to="/" replace />) : (<Navigate to="/sign-in" replace />)} />

          </Routes>

        </CurrentCards.Provider>

        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard} />

        <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          deleteCard={cardForDelete}
          handleConfirmDelete={handleConfirmDelete} />

        <InfoToolTip isOpen={isToolTipOpen}
          onClose={closeAllPopups}
          message={infoTooltipMessage}
          isStatus={isSuccessInfoTooltipStatus} />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

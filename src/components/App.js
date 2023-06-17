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
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginWithToken().then((res) => {
        if (res && typeof res.data === "object") {
          setLoggedIn(true)
          navigate("/", { replace: true })
          setUserEmail(res.data.email)
        }
      }).catch((error) => console.error(error))
    }
  }, [loggedIn])

  useEffect(() => {
    try {
      api.getInitialCards().then((res) => {
        setCards(res)
      })
    } catch (error) {
      console.error(error)
    }
  }, [loggedIn])

  useEffect(() => {
    try {
      api.getUserInfo().then((res) => {
        setCurrentUser(res);
      })
    } catch (error) {
      console.error(error)
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleImageClick(card) {
    setSelectedCard(card)
  }

  function handleCardDelete(card) {
    setDeleteCard(card)
    setIsConfirmDeletePopupOpen(true)
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
    setSelectedCard(false)
    setIsConfirmDeletePopupOpen(false)
    setIsToolTipOpen(false);
  }

  function handleConfirmDelete(card) {
    api.deleteCard(card._id).then((res) => {
      const newCards = cards.filter((item) => (item._id === card._id ? '' : res))
      setCards(newCards)
      closeAllPopups()
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
      setIsStatus(false);
      setMessage("Что-то пошло не так! Попробуйте ещё раз");
      setIsToolTipOpen(true);
    })
  }

  function handleRegister({ email, password }) {

    register(email, password).then((res) => {
      if (res != false) {
        navigate("/sigh-in", { replace: true })
        setIsStatus(true);
        setMessage("Вы успешно зарегистрировались!")
      }

    }).catch((error) => {
      setIsStatus(false);
      setMessage("Что-то пошло не так! Попробуйте ещё раз")
      console.error(error)
    }).finally(() => {
      setIsToolTipOpen(true);
    })

  }

  function LogOut() {
    localStorage.removeItem("token");
    navigate("/sigh-in", { replace: true });
    setIsStatus(true);
    setMessage("Вы успешно вышли!");
    setIsToolTipOpen(true);
    setUserEmail('');
    setLoggedIn(false);
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} onLogout={LogOut}/>

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

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={selectedCard} />

        <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} deleteCard={deleteCard}

          handleConfirmDelete={handleConfirmDelete} />

        <InfoToolTip isOpen={isToolTipOpen} onClose={closeAllPopups} message={message} isStatus={isStatus} />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

import { useContext, useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.loginUser({ email, password });
    }

    return (
        <div className="register__container">
            <h3 className="register__title">Вход</h3>
            <form
                //     title="Редактировать профиль"
                //     isOpen={props.isOpen}
                buttonText="Сохранить"
                //     onClose={props.onClose}
                onSubmit={handleSubmit}
            >
                <input className="register__input" name="enterName" type="text" minLength="2"
                    maxLength="40" onChange={handleChangeEmail} placeholder="Email" />
                <span className="input-error-enterName popup__input-error"></span>
                <input className="register__input" name="enterInfo" type="password" required="required" autoComplete="true"
                    minLength="2" maxLength="200" onChange={handleChangePassword} placeholder="Пароль" 
                    />
                <span className="input-error-enterInfo popup__input-error"></span>
                <button type="submit" className="register__submit-btn">Войти</button>
            </form>
            <div>
                <Routes>
                    <Route path="/sign-up" element={<NavLink to="/sign-in"
                        className="registered__in" >Уже зарегистрированы? Войти</NavLink>} />
                </Routes>
            </div>
        </div>
    )

}
export default Login;
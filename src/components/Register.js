import { useContext, useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.registerUser({ email, password });
    }
    return (
        <div className="register__container">
            <h3 className="register__title">Регистрация</h3>
            <form
                //     title="Регист"
                //     isOpen={props.isOpen}
                className="register__form"
                buttonText="Зарегистрироваться"
                //     onClose={props.onClose}
                onSubmit={handleSubmit}
            >
                <input className="register__input" name="enterName" type="text" minLength="2"
                    maxLength="40" onChange={handleChangeEmail} placeholder="Email" value={email} />
                <span className="input-error-enterName popup__input-error"></span>

                <input className="register__input" name="enterInfo" type="password" required="required"
                    autoComplete="true" minLength="2" maxLength="200" onChange={handleChangePassword}
                    placeholder="Пароль" value={password}
                />
                <span className="input-error-enterInfo popup__input-error"></span>

                <button type="submit" className="register__submit-btn" >Зарегистрироваться</button>
                <div>
                    <NavLink to="/sign-in"
                        className="registered__in" >Уже зарегистрированы? Войти</NavLink>

                </div>
            </form>
        </div>

    )
}
export default Register;
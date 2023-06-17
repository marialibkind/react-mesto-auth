import { useState } from "react";

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
                //     onClose={props.onClose}
                onSubmit={handleSubmit}
            >
                <input className="register__input" name="enterName" type="text" minLength="2"
                    maxLength="40" onChange={handleChangeEmail} placeholder="Email" value={email} />
                <span className="input-error-enterName popup__input-error"></span>

                <input className="register__input" name="enterInfo" type="password" required="required"
                    autoComplete="true" minLength="2" maxLength="200" value={password}
                    onChange={handleChangePassword} placeholder="Пароль"
                />
                <span className="input-error-enterInfo popup__input-error"></span>

                <button type="submit" className="register__submit-btn">Войти</button>
            </form>
            <div>
            </div>
        </div>
    )

}
export default Login;
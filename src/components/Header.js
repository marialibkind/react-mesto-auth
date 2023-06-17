import logo from "../images/header__logo.svg";
import { NavLink, Routes, Route } from "react-router-dom";

function Header(props) {

    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="место" />
            
            <div className="header__data"> 
                <div className="header__email">{props.email}</div>
                <Routes>
                    <Route path="/sign-in"  
                    element ={<NavLink to="/sign-up" className="register">Регистрация</NavLink>}/>
                    <Route path="/sign-up" element ={<NavLink to="/sign-in"
                    className="in" >Войти</NavLink>}/>
                    <Route path="/" 
                    element ={<NavLink to="/sign-in" className="out" onClick={props.onLogout}>Выйти</NavLink>}/>
                </Routes>
            </div>
        </header>
    )
}

export default Header;
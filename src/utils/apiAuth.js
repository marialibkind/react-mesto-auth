export const BASE_URL = "https://auth.nomoreparties.co";

export function login(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email })
    }).then(checkResponse)
}

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email })
    }).then(checkResponse)
}
export function loginWithToken() {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${localStorage.getItem("token")}`
        },
    }).then(checkResponse)
}


function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

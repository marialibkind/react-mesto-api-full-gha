export const BASE_URL = "https://api.mesto-maria.nomoredomains.sbs";
// export const BASE_URL = "http://localhost:3000";

export function login(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        body: JSON.stringify({ password, email })
    }).then(checkResponse)
}

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email })
    }).then(checkResponse)
}
export function loginWithToken() {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }).then(checkResponse)
}

export function logOut() {
    return fetch(`${BASE_URL}/signout`, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }).then(checkResponse)
}


function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

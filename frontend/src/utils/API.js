class API {
    constructor(config) {
        this._baseUrl = config.url;
        this._headers = config.headers;
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            credentials: "include",
        })
            .then((res) => {
                return this._checkResponse(res);
            })
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            credentials: "include",
        })
            .then((res) => {
                return this._checkResponse(res);
            })
    }

    setUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            credentials: "include",
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then((res) => {
                return this._checkResponse(res);
            })
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            credentials: "include",
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link,
            })

        })
            .then((res) => {
                return this._checkResponse(res);
            })
    }

    changeLikeCardStatus(cardId, status) {
        console.log(cardId, status)
        if (status) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                headers: this._headers,
                credentials: "include",
                method: 'DELETE',

            })
                .then((res) => {
                    return this._checkResponse(res);
                })
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                headers: this._headers,
                credentials: "include",
                method: 'PUT',
    
            })
                .then((res) => {
                    return this._checkResponse(res);
                })
        }
    }

    setAvatar(urlAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            credentials: "include",
            method: 'PATCH',
            body: JSON.stringify(
               {avatar: urlAvatar}
            )

        })
            .then((res) => {
                return this._checkResponse(res);
            })

    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            credentials: "include",
            method: 'DELETE',

        })
            .then((res) => {
                return this._checkResponse(res);
            })
    }


}
export const api = new API({
    url: 'https://api.mesto-maria.nomoredomains.sbs', 
    // url: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

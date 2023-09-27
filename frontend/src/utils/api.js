class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  };

  getUserData() {
    return this._request(`${this._baseUrl}/users/me`, { method: 'GET', headers: this._headers });
  };

  editUserData (data) {
    return this._request(`${this._baseUrl}/users/me`, { method: 'PATCH', headers: this._headers, body: JSON.stringify(data) });
  };

  getCards () {
    return this._request(`${this._baseUrl}/cards`, { method: 'GET', headers: this._headers });
  };

  postNewCard (data) {
    return this._request(`${this._baseUrl}/cards`, { method: 'POST', headers: this._headers, body: JSON.stringify(data) });
  };

  changeLikeCardStatus (cardId, isLiked) {
    if (!isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, { method: 'PUT', headers: this._headers });
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, { method: 'DELETE', headers: this._headers });
    }
  }

  deleteCard (cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, { method: 'DELETE', headers: this._headers });
  };

  editUserAvatar (data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, { method: 'PATCH', headers: this._headers, body: JSON.stringify(data) });
  };
};

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '8b924108-8ca1-4711-b126-8a96bbad8ecc',
    'Content-Type': 'application/json'
  }
});

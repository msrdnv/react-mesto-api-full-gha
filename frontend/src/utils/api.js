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

  getUserData(token) {
    return this._request(`${this._baseUrl}/users/me`, { method: 'GET', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
  };

  editUserData (data, token) {
    return this._request(`${this._baseUrl}/users/me`, { method: 'PATCH', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }, body: JSON.stringify(data)});
  };

  getCards (token) {
    return this._request(`${this._baseUrl}/cards`, { method: 'GET', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
  };

  postNewCard (data, token) {
    return this._request(`${this._baseUrl}/cards`, { method: 'POST', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }, body: JSON.stringify(data)});
  };

  changeLikeCardStatus (cardId, isLiked, token) {
    if (!isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, { method: 'PUT', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, { method: 'DELETE', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
    }
  }

  deleteCard (cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, { method: 'DELETE', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
  };

  editUserAvatar (data, token) {
    return this._request(`${this._baseUrl}/users/me/avatar`, { method: 'PATCH', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }, body: JSON.stringify(data)});
  };
};

export const api = new Api({
  baseUrl: 'https://api.mesto.msrdnv.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json',
  }
});

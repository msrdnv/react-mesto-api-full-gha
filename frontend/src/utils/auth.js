class AuthApi {
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

  signUp(data) {
    return this._request(`${this._baseUrl}/signup`, { method: 'POST', headers: this._headers, body: JSON.stringify(data) });
  };

  signIn(data) {
    return this._request(`${this._baseUrl}/signin`, { method: 'POST', headers: this._headers, body: JSON.stringify(data) });
  };

  checkToken(token) {
    return this._request(`${this._baseUrl}/users/me`, { method: 'GET', headers: {'Authorization' : `Bearer ${token}`, ...this._headers }});
  };
};

  export const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  });

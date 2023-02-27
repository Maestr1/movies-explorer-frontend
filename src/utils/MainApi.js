import { mainApiConfig } from './configs';

class MainApi {
  constructor(options) {
    this._options = options;
  }

  _onResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка запроса. Код ошибки: ${res.status}`);
    }
  }

  register(name, password, email) {
    return fetch(`${mainApiConfig.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name, password, email)
    })
      .then(res => this._onResponse(res));
  }

  login(password, email) {
    return fetch(`${mainApiConfig.baseUrl}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(password, email)
    })
      .then(res => this._onResponse(res));
  }

  logout() {
    return fetch(`${mainApiConfig.baseUrl}/signout`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._onResponse(res));
  }

  auth() {
    // debugger
    return fetch(`${mainApiConfig.baseUrl}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._onResponse(res));
  }

  saveMovie(movie, id) {
    return fetch(`${mainApiConfig.baseUrl}/movies`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie, id)
    })
      .then(res => this._onResponse(res));
  }

  getMovies() {
    return fetch(`${mainApiConfig.baseUrl}/movies`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._onResponse(res));
  }

  deleteMovie(movieId) {
    return fetch(`${mainApiConfig.baseUrl}/movies/${movieId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._onResponse(res));
  }
}

const mainApi = new MainApi(mainApiConfig);

export default mainApi;

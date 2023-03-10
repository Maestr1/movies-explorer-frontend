import { mainApiConfig } from './configs';

class MainApi {
  _onResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then(err => {throw err;});
    }
  }

  register(values) {
    return fetch(`${mainApiConfig.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: values.name, password: values.password, email: values.email })
    })
      .then(res => this._onResponse(res));
  }

  login(values) {
    return fetch(`${mainApiConfig.baseUrl}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: values.password, email: values.email })
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
    return fetch(`${mainApiConfig.baseUrl}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._onResponse(res));
  }

  changeProfile(name, email)  {
      return fetch(`${mainApiConfig.baseUrl}/users/me`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(name, email)
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
      body: JSON.stringify({
        ...movie,
        owner: id,
      })
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

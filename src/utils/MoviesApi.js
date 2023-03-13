import { moviesApiConfig } from './configs';

class MoviesApi {
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

  getMovies() {
    return fetch(`${this._options.baseUrl}/beatfilm-movies`)
      .then(res => this._onResponse(res));
  }
}

const moviesApi = new MoviesApi(moviesApiConfig)

export default moviesApi

import {kinopoiskApiConfig} from './configs';
import axios from 'axios';

class KinopoiskApi {
  constructor(options) {
    this._options = options;
    this._requester = axios.create({
      withCredentials: true,
      baseURL: this._options.baseUrl
    })
  }

  _onResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка запроса. Код ошибки: ${res.status}`);
    }
  }

  getPopularMovies() {
    return this._requester.get(`/films/popular`)
      .then(res => res.data)
      .catch(err => `Ошибка запроса. Код ошибки: ${err.status}`)
  }

  getMovies() {
    return fetch(`${this._options.baseUrl}/beatfilm-movies`)
      .then(res => this._onResponse(res));
  }
}

const kinopoiskApi = new KinopoiskApi(kinopoiskApiConfig);

export default kinopoiskApi;

export const moviesApiConfig = {
  baseUrl: 'https://api.nomoreparties.co'
};

export const mainApiConfig = {
  baseUrl: (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.movie.nomoredomainsclub.ru')
};


export const kinopoiskApiConfig = {
  baseUrl: 'http://localhost:3000',
  config: {
    withCredentials: true,
  }
};

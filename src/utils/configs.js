export const moviesApiConfig = {
  baseUrl: 'https://api.nomoreparties.co'
};

export const mainApiConfig = {
  baseUrl: (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.xn-----nlcbqkiqehcmxg.xn--p1ai'),
};


export const kinopoiskApiConfig = {
  baseUrl: (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.xn-----nlcbqkiqehcmxg.xn--p1ai'),
  config: {
    withCredentials: true,
  }
};

import { createContext, useState } from 'react';

export const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
  const [user, setUser] = useState(null);

  function signin(newUser) {
    setUser(newUser);
  }

  function signout() {
    setUser(null);
  }

  const value = { user, signin, signout };

  return (
    <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
  );
}


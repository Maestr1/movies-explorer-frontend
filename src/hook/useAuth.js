import { useContext } from 'react';
import { CurrentUserContext } from '../hoc/CurrentUserContext';

export function useAuth() {
  return useContext(CurrentUserContext);
}

import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);
export const AuthData = () => useContext(AuthContext);

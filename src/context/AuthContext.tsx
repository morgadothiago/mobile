import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import type { AuthContextType } from '../types/AuthContextType';
import { IUser } from '../types/User.type';
import storageService from '../services/storageService';



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}




const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState<IUser>(null);

  // Logicia de guardar o access token e o user no contexto
  useEffect(() => {
    const loadStorageData = async () => {
      const accessToken = await storageService.getItem('access_token');
      const user = await storageService.getItem('user');
      if (accessToken && user) {
        setAccessToken(accessToken);
        setUser(JSON.parse(user));
      }
    }
    loadStorageData();
  }, []);

  const setData = async (accessToken: string, user: IUser, refressToken: string) => {
    setAccessToken(accessToken);

    setUser(user);


    await storageService.setItem('access_token', accessToken);
    await storageService.setItem('refress_token', refressToken);
    await storageService.setItem('user', JSON.stringify(user))

  }
  const logout = async (accessToken: string, user: IUser, refressToken: string) => {
    setAccessToken('');
    setUser(null);
    await storageService.removeItem('access_token');
    await storageService.removeItem('refress_token');
    await storageService.removeItem('user');
    await storageService.clear();
  }

  const isAuthenticated = () => {

    return !!accessToken;
  }




  return (
    <AuthContext.Provider value={{
      isAuthenticated, logout, setData, user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};




export const useAuth = () => {
  return useContext(AuthContext);
}


export default AuthProvider;

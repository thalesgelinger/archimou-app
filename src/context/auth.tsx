import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {api} from '../services/api';

interface AuthContextData {
  idToken: string | null;
  user: string | null;
  googleSignIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [idToken, setIdToken] = useState<string | null>('a');
  const [user, setUser] = useState<string | null>('');

  const googleSignIn = async () => {
    try {
      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const response = await auth().signInWithCredential(googleCredential);
      await handleUserToken(idToken as string);
    } catch (e) {
      console.error(e);
    }
  };

  async function handleUserToken(token: string) {
    try {
      const {data: user} = await getUserByToken(token);
      setUser(user);
    } catch (error) {
      setIdToken(token);
    }
  }

  function getUserByToken(token: string) {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          birthDate: '01-01-1992',
          genre: 'M',
          name: 'Kevin Lima',
          photoUrl:
            'https://i.pinimg.com/originals/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg',
        },
      });
    });
  }

  const signOut = () => {
    auth().signOut();
  };

  return (
    <AuthContext.Provider value={{idToken, user, googleSignIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

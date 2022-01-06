import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {api} from '../services/api';
interface AuthContextData {
  user: any;
  googleSignIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState({});

  const googleSignIn = async () => {
    try {
      const {idToken, user} = await GoogleSignin.signIn();
      console.log({user});
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const response = await auth().signInWithCredential(googleCredential);
      console.log({response});
    } catch (e) {
      console.error(e);
    }
  };

  const signOut = () => {
    auth().signOut();
  };

  return (
    <AuthContext.Provider value={{user, googleSignIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

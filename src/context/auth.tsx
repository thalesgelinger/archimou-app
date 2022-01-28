import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface AuthContextData {
  idToken: string | null;
  googleSignIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [idToken, setIdToken] = useState<string | null>('');

  const googleSignIn = async () => {
    try {
      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const response = await auth().signInWithCredential(googleCredential);
      setIdToken(idToken);
      //TODO :: call another page to register new user
    } catch (e) {
      console.error(e);
    }
  };

  const signOut = () => {
    auth().signOut();
  };

  return (
    <AuthContext.Provider value={{idToken, googleSignIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

import React, {useEffect} from 'react';
import {Background, Container} from './styles';
import backgroundImage from '../../assets/background.png';
import {Button} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Storage} from '../../services/Storage';
import {api} from '../../services/api';
import auth from '@react-native-firebase/auth';
import {useUserActions} from '../../hooks/useUserActions';
import {useTreeActions} from '../../hooks/useTreeActions';

export const Login = () => {
  const {saveUser, saveIdToken} = useUserActions();

  const {setIsLoading} = useTreeActions();

  useEffect(() => {
    reAuth();
  }, []);

  const reAuth = async () => {
    try {
      setIsLoading(true);
      const {idToken, provider} = await Storage.getStorageItem(
        'TOKEN_AND_PROVIDER',
      );

      const mapProvidersCalls = {
        google,
      };

      console.log({idToken, provider});

      if (!!idToken) {
        mapProvidersCalls[provider](idToken);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  };

  const google = async (idToken: string) => {
    try {
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const response = await auth().signInWithCredential(googleCredential);
      const token = await response.user.getIdToken(true);
      console.log({token});
      await handleUserToken(token);
    } catch (e) {
      console.warn(e);
    }
  };

  const googleSignIn = async () => {
    try {
      setIsLoading(true);
      const {idToken} = await GoogleSignin.signIn();

      await Storage.setStorageItem('TOKEN_AND_PROVIDER', {
        idToken,
        provider: 'google',
      });
      await google(idToken);
      setIsLoading(false);
    } catch (e) {
      console.warn({...e});
    }
  };

  async function handleUserToken(token: string) {
    try {
      const {data: user} = await api.get('/findMe', {
        headers: {Authorization: 'Bearer ' + token},
      });
      saveIdToken(token);
      saveUser(user);
    } catch ({response: error}) {
      if (error.status === 404) {
        saveIdToken(token);
        setIsLoading(false);
      }
      console.warn({error});
    }
  }

  return (
    <Background source={backgroundImage}>
      <Container>
        <Button label="Entrar com Google" onPress={googleSignIn} />
      </Container>
    </Background>
  );
};

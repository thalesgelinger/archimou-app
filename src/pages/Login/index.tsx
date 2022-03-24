import React from 'react';
import {Background, Container} from './styles';
import backgroundImage from '../../assets/background.png';
import {Button} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Storage} from '../../services/Storage';
import {api} from '../../services/api';
import auth from '@react-native-firebase/auth';
import {useUserActions} from '../../hooks/useUserActions';

export const Login = () => {
  const {saveUser, saveIdToken} = useUserActions();

  const googleSignIn = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const response = await auth().signInWithCredential(googleCredential);
      const token = await response.user.getIdToken();
      await Storage.setStorageItem('token', token);
      await handleUserToken(token);
    } catch (e) {
      console.error(e);
    }
  };

  async function handleUserToken(token: string) {
    try {
      const {data: user} = await api.get('/findMe', {
        headers: {Authorization: 'Bearer ' + token},
      });
      saveUser(user);
      saveIdToken(token);
    } catch ({response: error}) {
      if (error.status === 404) {
        saveIdToken(token);
      }
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

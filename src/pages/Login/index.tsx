import React, {useEffect} from 'react';
import {Background, Container} from './styles';
import backgroundImage from '../../assets/background.png';
import {Button} from '../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Storage} from '../../services/Storage';
import {api} from '../../services/api';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useUserActions} from '../../hooks/useUserActions';
import {useTreeActions} from '../../hooks/useTreeActions';

export const Login = () => {
  const {saveUser, saveIdToken} = useUserActions();

  const {setIsLoading} = useTreeActions();

  useEffect(() => {
    console.log('REAUTH');
    reAuth();
  }, []);

  const reAuth = async () => {
    try {
      setIsLoading(true);
      const credential = await Storage.getStorageItem('credential');
      if (!!credential) {
        await authorize(JSON.parse(credential));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const authorize = async (credential: FirebaseAuthTypes.AuthCredential) => {
    const response = await auth().signInWithCredential(credential);
    const token = await response.user.getIdToken(true);
    console.log({token});
    await Storage.setStorageItem('token', token);
    await handleUserToken(token);
  };

  const googleSignIn = async () => {
    try {
      setIsLoading(true);
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await Storage.setStorageItem(
        'credential',
        JSON.stringify(googleCredential),
      );
      const response = await auth().signInWithCredential(googleCredential);
      const token = await response.user.getIdToken(true);
      await Storage.setStorageItem('token', token);
      await handleUserToken(token);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  async function handleUserToken(token: string) {
    try {
      const {data: user} = await api.get('/findMe', {
        headers: {Authorization: 'Bearer ' + token},
      });
      await Storage.setStorageItem('user', user);
      saveIdToken(token);
      saveUser(user);
    } catch ({response: error}) {
      if (error.status === 404) {
        saveIdToken(token);
        setIsLoading(false);
      }
      console.log('AQUI');
      console.error({error});
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

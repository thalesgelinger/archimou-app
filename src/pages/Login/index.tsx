import React from 'react';
import {
  ImageBackground,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../../hooks/useAuth';
import {Background, Container} from './styles';
import backgroundImage from '../../assets/background.png';
import {Button} from '../../components';

export const Login = () => {
  const {googleSignIn} = useAuth();

  return (
    <Background source={backgroundImage}>
      <Container>
        <Button label="Entrar com Google" onPress={googleSignIn} />
      </Container>
    </Background>
  );
};

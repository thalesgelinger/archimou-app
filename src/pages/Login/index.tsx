import React from 'react';
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

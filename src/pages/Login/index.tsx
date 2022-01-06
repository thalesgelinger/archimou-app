import React from 'react';
import {Text, Touchable, TouchableOpacity, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

export const Login = () => {
  const {googleSignIn} = useAuth();

  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={googleSignIn}>
        <Text>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
};

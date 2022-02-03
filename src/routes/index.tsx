import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login, Register} from '../pages';
import {useAuth} from '../hooks/useAuth';
import {Stacks} from './Stacks';

export const Routes = () => {
  const {idToken, user} = useAuth();

  if (!idToken && !user) {
    return <Login />;
  }
  if (!user) {
    return <Register />;
  }

  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

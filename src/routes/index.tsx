import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '../pages';
import {useAuth} from '../hooks/useAuth';
import {Stacks} from './Stacks';
import {Graph} from '../components/Graph';

export const Routes = () => {
  const {idToken} = useAuth();
  return (
    <NavigationContainer>
      {!!idToken ? <Login /> : <Stacks />}
    </NavigationContainer>
  );
};

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '../pages';
import {useAuth} from '../hooks/useAuth';
import {Stacks} from './Stacks';

export const Routes = () => {
  const {user} = useAuth();
  return (
    <NavigationContainer>{!!user ? <Login /> : <Stacks />}</NavigationContainer>
  );
};

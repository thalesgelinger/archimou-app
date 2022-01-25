import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from '../pages';
import {useAuth} from '../hooks/useAuth';
import {Stacks} from './Stacks';
import {Graph} from '../pages/Graph';
import Svg from 'react-native-svg';

export const Routes = () => {
  const {user} = useAuth();
  return (
    // <NavigationContainer>{!!user ? <Login /> : <Stacks />}</NavigationContainer>

    <Graph />
  );
};

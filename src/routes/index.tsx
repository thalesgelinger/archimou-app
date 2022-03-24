import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Stacks} from './Stacks';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Text, View} from 'react-native';
import {Login} from '../pages/Login';

export const Routes = () => {
  const {idToken, user} = useSelector((state: RootState) => state.user);

  if (!idToken && !user?.idHash) {
    return <Login />;
  }

  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

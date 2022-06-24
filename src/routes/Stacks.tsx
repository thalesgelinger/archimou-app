import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {useSelector} from 'react-redux';
import {Home} from '../pages';
import {KinshipSelection} from '../pages/KinshipSelection';
import {Register} from '../pages/Register';
import {RootState} from '../store/store';

const Stack = createNativeStackNavigator();

export const Stacks = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Stack.Navigator
      initialRouteName={!!user?.idHash ? 'Home' : 'Register'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Kinship" component={KinshipSelection} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

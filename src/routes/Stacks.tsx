import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Home} from '../pages';

const Stack = createNativeStackNavigator();

export const Stacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Graph" component={Home} />
    </Stack.Navigator>
  );
};

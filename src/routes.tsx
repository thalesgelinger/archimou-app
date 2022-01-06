import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login} from './pages';
import {useAuth} from './hooks/useAuth';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  const {user} = useAuth();

  const renderStacks = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {!!user ? <Login /> : renderStacks()}
    </NavigationContainer>
  );
};

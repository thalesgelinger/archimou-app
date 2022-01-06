/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import AuthProvider from './src/context/auth';
import {Routes} from './src/routes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '437644277626-de2r7g1jttpmls7mc2481ghobt3iq0eb.apps.googleusercontent.com',
});

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);

export default App;

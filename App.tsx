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
import {Routes} from './src/routes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import 'react-native-reanimated';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

GoogleSignin.configure({
  webClientId:
    '437644277626-de2r7g1jttpmls7mc2481ghobt3iq0eb.apps.googleusercontent.com',
});

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;

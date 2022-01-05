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

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);

export default App;

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Stacks} from './Stacks';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Login} from '../pages/Login';
import {Storage} from '../services/Storage';
import {useUserActions} from '../hooks/useUserActions';

export const Routes = () => {
  const {idToken, user} = useSelector((state: RootState) => state.user);

  const {saveUser, saveIdToken} = useUserActions();

  useEffect(() => {
    setInStateUserIfExists();
  }, []);

  const setInStateUserIfExists = async () => {
    const user = await Storage.getStorageItem('user');
    const token = await Storage.getStorageItem('token');

    if (user) {
      saveUser(user);
      saveIdToken(token);
    }
  };

  if (!idToken || !user?.idHash) {
    return <Login />;
  }

  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

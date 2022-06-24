import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Stacks} from './Stacks';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Login} from '../pages/Login';
import {Storage} from '../services/Storage';
import {useUserActions} from '../hooks/useUserActions';
import {Register} from '../pages';
import {Modal, View, ActivityIndicator} from 'react-native';

export const LoadingModal = () => {
  const isLoading = useSelector((state: RootState) => state.tree.isLoading);
  return (
    <Modal visible={isLoading}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={'#000000'} />
      </View>
    </Modal>
  );
};

export const Routes = () => {
  const [isFetchingFromStorage, setIsFetchingFromStorage] = useState(true);

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
    setIsFetchingFromStorage(false);
  };

  useEffect(() => {
    console.log('STARTANDO TUDOO', {
      user,
      idToken,
    });
  }, [user, idToken]);

  if (!idToken && !user?.idHash) {
    return <Login />;
  }

  if (!!idToken && !user?.idHash) {
    return <Register />;
  }

  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

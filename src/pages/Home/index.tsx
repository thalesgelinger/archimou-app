import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Dock} from '../../components';
import {Graph} from '../../components/Graph';
import {RootState} from '../../store/store';

export const Home = () => {
  return (
    <>
      <Graph />
      <Dock />
    </>
  );
};

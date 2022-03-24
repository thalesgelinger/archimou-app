import React from 'react';
import {Text, View} from 'react-native';
import {Dock} from '../../components';
import {Graph} from '../../components/Graph';

export const Home = () => {
  return (
    <>
      <Graph />
      <Dock />
    </>
  );
};

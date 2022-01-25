import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ITEM_SIZE = 100;

export function Node({name, x, y}) {
  return (
    <View
      style={
        {
          height: ITEM_SIZE,
          width: ITEM_SIZE,
          backgroundColor: 'rgba(255,255,255, 0.5)',
          position: 'absolute',
          translateX: x,
          translateY: y,
          borderRadius: ITEM_SIZE / 2,
          zIndex: 5,
          justifyContent: 'center',
          alignItems: 'center',
        } as StyleSheet.NamedStyles<{}>
      }>
      <Text>{name}</Text>
    </View>
  );
}

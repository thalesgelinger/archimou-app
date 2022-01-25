import {MotiView} from 'moti';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, PressableProps} from 'react-native';

const ITEM_SIZE = 100;

interface Props extends PressableProps {
  name: string;
  x: number;
  y: number;
  gender: string;
}

export function Node({name, x, y, gender, ...rest}: Props) {
  const backgroundColor = gender === 'M' ? '#0400ff' : '#ff00d4';

  return (
    <Pressable style={{zIndex: 5}} {...rest}>
      <MotiView
        style={{
          height: ITEM_SIZE,
          width: ITEM_SIZE,
          backgroundColor,
          position: 'absolute',
          borderRadius: ITEM_SIZE / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        from={{
          transform: [{translateX: x}, {translateY: y}, {scale: 1}],
          // opacity: 0,
        }}
        animate={{
          transform: [{translateX: x}, {translateY: y}, {scale: 1.05}],
          opacity: 1,
        }}
        transition={{
          type: 'timing',
          duration: 1000,
          loop: true,
        }}>
        <Text>{name}</Text>
      </MotiView>
    </Pressable>
  );
}

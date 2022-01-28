import {MotiView, useAnimationState} from 'moti';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, PressableProps} from 'react-native';

const ITEM_SIZE = 100;

interface Props extends PressableProps {
  name: string;
  x: number;
  y: number;
  originX: number;
  originY: number;
  gender: string;
}

export function Node({name, x, y, gender, originX, originY, ...rest}: Props) {
  const backgroundColor = gender === 'M' ? '#657AE8' : '#E865E3';

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
          transform: [{translateX: originX ?? x}, {translateY: originY ?? y}],
          scale: 1,
          opacity: 0,
        }}
        animate={{
          transform: [{translateX: x}, {translateY: y}],
          scale: 1.05,
          opacity: 1,
        }}
        transition={{
          type: 'timing',
          duration: 1500,
          scale: {loop: true},
          opacity: {
            type: 'timing',
            delay: 200,
          },
        }}>
        <Text style={{color: 'white'}}>{name}</Text>
      </MotiView>
    </Pressable>
  );
}

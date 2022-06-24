import {MotiView} from 'moti';
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {ColorValue, TouchableOpacity} from 'react-native';

const ITEM_SIZE = 100;

interface Props extends TouchableOpacityProps {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: ColorValue;
}

export function GraphButton({
  x,
  y,
  originX,
  originY,
  color,
  children,
  ...rest
}: Props) {
  return (
    <TouchableOpacity style={{zIndex: 5}} {...rest}>
      <MotiView
        style={{
          height: ITEM_SIZE,
          width: ITEM_SIZE,
          backgroundColor: color,
          position: 'absolute',
          borderRadius: ITEM_SIZE / 2,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
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
        {children}
      </MotiView>
    </TouchableOpacity>
  );
}

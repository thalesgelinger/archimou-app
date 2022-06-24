import {MotiView} from 'moti';
import React, {useEffect, useMemo} from 'react';
import {
  Text,
  PressableProps,
  Animated,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Container} from '../Graph/styles';
import {Icon} from '../Icon';

const ITEM_SIZE = 100;

interface Props extends PressableProps {
  name: string;
  x: number;
  y: number;
  originX: number | undefined;
  originY: number | undefined;
  gender: string;
}

export function Node({name, x, y, gender, originX, originY, ...rest}: Props) {
  const backgroundColor = gender === 'M' ? '#657AE8' : '#E865E3';

  useEffect(() => {
    console.log({
      name: typeof name,
      x: typeof x,
      y: typeof y,
      gender: typeof gender,
      originX: typeof originX,
      originY: typeof originY,
      rest: JSON.stringify(rest),
    });
  }, []);

  const isLoading = !originX && !x && !originY && !y;

  if (isLoading) {
    return null;
  }

  return (
    <Pressable style={{zIndex: 5}} {...rest}>
      <MotiView
        style={{
          height: ITEM_SIZE,
          width: ITEM_SIZE,
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
        <Icon name="user" color={backgroundColor} size={ITEM_SIZE} />
        <Text style={{color: backgroundColor, fontWeight: 'bold'}}>{name}</Text>
      </MotiView>
    </Pressable>
  );
}

import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {Line} from 'react-native-svg';

const ITEM_SIZE = 100;

const AnimatedLine = Animated.createAnimatedComponent(Line);

export function ConnectionLine({from, to}) {
  const x1 = from.x + ITEM_SIZE / 2;
  const y1 = from.y + ITEM_SIZE / 2;
  const xEnd = to.x + ITEM_SIZE / 2;
  const yEnd = to.y + ITEM_SIZE / 2;

  const x2 = useRef(new Animated.Value(x1)).current;
  const y2 = useRef(new Animated.Value(y1)).current;

  useEffect(() => {
    activeAnimation(x2, xEnd);
    activeAnimation(y2, yEnd);
  }, [x2, y2]);

  useEffect(() => {
    console.log('ENTROU');
    return () => {
      console.log('SAIU');
    };
  }, []);

  function activeAnimation(animatedRef: Animated.Value, toValue: any) {
    Animated.timing(animatedRef, {
      toValue,
      duration: 1000,
      delay: 1000,
      useNativeDriver: false,
    }).start();
  }

  return (
    <AnimatedLine
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#7E7A82"
      strokeWidth="2"
    />
  );
}

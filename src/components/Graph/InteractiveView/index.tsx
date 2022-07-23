import {View} from 'moti';
import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface InteractiveViewProps {
  children: ReactNode;
  size: number;
  onMove: (isMoving: boolean) => void;
}

interface InteractiveViewHandler {
  pan: any;
}

export const InteractiveView = forwardRef<
  InteractiveViewHandler,
  InteractiveViewProps
>(({children, size, onMove}, ref) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const initialValue = useSharedValue({x: 0, y: 0});

  const panGesture = Gesture.Pan()
    .onStart(e => {
      initialValue.value = {
        x: x.value,
        y: y.value,
      };
    })
    .onUpdate(e => {
      x.value = e.translationX + initialValue.value.x;
      y.value = e.translationY + initialValue.value.y;
    });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const gesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: x.value},
      {translateY: y.value},
      {scale: scale.value},
    ],
  }));

  const derivated = useDerivedValue(() => {
    return x.value !== initialValue.value.x;
  });

  console.log({derivated});

  useImperativeHandle(ref, () => ({
    pan: {
      x: {
        set(value: number) {
          x.value = withTiming(value, {duration: 300});
        },
      },
      y: {
        set(value: number) {
          y.value = withTiming(value, {duration: 300});
        },
      },
    },
  }));

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                backgroundColor: 'white',
                width: size,
                height: size,
              } as StyleSheet.NamedStyles<{}>,
              animatedStyle,
            ]}>
            {children}
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
});

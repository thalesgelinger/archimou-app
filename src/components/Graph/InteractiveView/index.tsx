import {View} from 'moti';
import React, {forwardRef, ReactNode, useImperativeHandle} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface InteractiveViewProps {
  children: ReactNode;
  size: number;
  onMoving: (isMoving: boolean) => void;
}

interface InteractiveViewHandler {
  pan: any;
}

export const InteractiveView = forwardRef<
  InteractiveViewHandler,
  InteractiveViewProps
>(({children, size, onMoving}, ref) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const initialValue = useSharedValue({x: 0, y: 0});

  const panGesture = Gesture.Pan()
    .onStart(e => {
      console.log('START PAN', initialValue.value);
      initialValue.value = {
        x: x.value,
        y: y.value,
      };
      onMoving(true);
    })
    .onUpdate(e => {
      console.log('UPDATE PAN', initialValue.value);
      x.value = e.translationX + initialValue.value.x;
      y.value = e.translationY + initialValue.value.y;
    })
    .onEnd(e => {
      console.log('END PAN');
      onMoving(false);
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

  useImperativeHandle(ref, () => ({
    pan: {
      x: {
        set(value: number) {
          x.value = value;
          panGesture.config = {};
        },
      },
      y: {
        set(value: number) {
          y.value = value;
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
